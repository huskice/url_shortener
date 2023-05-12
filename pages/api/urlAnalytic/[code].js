import prisma from '../../../lib/prisma'

import { parse } from 'next-useragent'

import nextSession from 'next-session'

import { promisifyStore, expressSession } from 'next-session/lib/compat'

const pgSession = require('connect-pg-simple')(expressSession)
const connectStore = new pgSession({
  conObject: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  createTableIfMissing: true,
})

const getSession = nextSession({
  store: promisifyStore(connectStore),
  saveUninitialized: true,
  resave: true,
})

export default async function (req, res) {
  if (req.method === 'GET') {
    const { code } = req.query
   
    const session = await getSession(req, res)
    session.views = session.views ? session.views + 1 : 1

    res.setHeader('Set-Cookie', req.headers.cookie, { httpOnly: true })

    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

    const response = await fetch(`http://ipwho.is/${ip}`)
    const result = await response.json()
    const countryName = await result.country

    const uaString = req.headers['user-agent']

    let ua
    if (uaString) {
      ua = parse(uaString)
    }

    const referer = req.headers.referer || 'undefined'

    try {
      const result = await prisma.$transaction(async (val) => {
        const url = await val.url.findUnique({ where: { code: code } })

        await val.urlAnalytic.create({
          data: {
            browserName: ua.browser,
            countryName: countryName,
            cookie: req.headers.cookie,
            referer: referer,
            url: {
              connect: {
                code: code,
              },
            },
          },
        })

        return url
      })

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error!' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
