import prisma from '@/lib/prisma'

import generateUrl from '../../generateUrl'

import { apiUrlSchema } from '@/validations/ApiUrlValidation'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await prisma.url.findMany({
      include: {
        _count: {
          select: {
            urlAnalytic: true,
          },
        },
      },
    })

    res.status(200).json(response)
  } else if (req.method === 'POST') {
    const { error, value } = apiUrlSchema.validate(req.body)

    const { code, shortUrl } = generateUrl()

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
              code,
              shortUrl,
            },
          })

          return newUrl
        })
        res.status(200).json(response)
      }
    } catch (error) {
      res.status(500).json({ message: 'Error!' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' })
  }
}
