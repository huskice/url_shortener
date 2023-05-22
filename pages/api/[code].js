import prisma from '@/lib/prisma'

export default async function getUrlHandler (req, res) {
  if (req.method == 'GET') {
    const { code } = req.query
    try {
      const response = await prisma.url.findUnique({ where: { code: code } })
      res.status(200).redirect(response.originalUrl)
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed!' })
  }
}
