import prisma from '@/lib/prisma'

import generateUrl from '../../generateUrl'

import { apiUrlSchema } from '@/validations/ApiUrlValidation'

import { parse } from 'next-useragent'

import nextSession from 'next-session'

import { promisifyStore, expressSession } from 'next-session/lib/compat'

const pgSession = require('connect-pg-simple')(expressSession)
const connectStore = new pgSession({
  conObject: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
  createTableIfMissing: true,
})

const getSession = nextSession({
  store: promisifyStore(connectStore),
  saveUninitialized: true,
  resave: true,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'Method not allowed!' })
  } else {
    const { error, value } = apiUrlSchema.validate(req.body)

    const session = await getSession(req, res)

    res.setHeader('Set-Cookie', req.headers.cookie)

    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

    const response = await fetch(`http://ipwho.is/${ip}`)
    const result = await response.json()
    const countryName = await result.country

    const { code } = generateUrl()

    const uaString = req.headers['user-agent']

    let ua
    if (uaString) {
      ua = parse(uaString)
    }

    const referer = req.headers.referer || 'undefined'

    try {
      if (error) {
        res.status(400).json({ error: 'Field must be filled out' })
      } else {
        const response = await prisma.$transaction(async (val) => {
          const url = await val.url.findFirst({
            where: {
              originalUrl: value.originalUrl,
            },
          })

          if (url) return url

          const newUrl = await val.url.create({
            data: {
              originalUrl: value.originalUrl,
              code: code,
            },
          })

          await val.urlAnalytic.create({
            data: {
              browserName: ua.browser,
              countryName: countryName,
              cookie: req.headers.cookie,
              referer: referer,
              url: {
                connect: {
                  id: newUrl.id,
                },
              },
            },
          })

          return newUrl
        })
        res.status(200).json(response)
      }
    } catch (error) {
      res.status(500).json({ error: 'Error' })
    }
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
