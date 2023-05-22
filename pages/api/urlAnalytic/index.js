import prisma from '@/lib/prisma'

export default async function getUrlAnalyticHandler (req, res) {
  if (req.method === 'GET') {
    try {
      const response = await prisma.urlAnalytic.findMany()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: 'Error!' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed!' })
  }
}
