import prisma from '../../../lib/prisma'

export default async function (req, res) {
  if (req.method === 'GET') {
    try {
      const analytic = await prisma.urlAnalytic.findMany()
      res.status(200).json(analytic)
    } catch (error) {
      res.status(500).json({ message: 'Error' })
    }
  } else {
    res.status(500).json({ message: 'Method Not Allowed!' })
  }
}
