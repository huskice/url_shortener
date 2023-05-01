import prisma from '@/lib/prisma'

export default async function (req, res) {
  if (req.method == 'GET') {
    const { code } = req.query

    try {
      const response = await prisma.$transaction(async (val) => {
        const url = await val.url.findUnique({ where: { code: code } })

        if (!url) return null

        return url
      })

      if (!response) {
        return res.status(500).json({ message: 'Problem!' })
      }

      res.status(200).redirect(response.originalUrl)
    } catch (e) {
      res.status(500).json({ e: 'Oh no, something went wrong!' })
    }
  } else {
    res.status(500).json({ message: 'Method not allowed!' })
  }
}
