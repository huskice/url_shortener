import { customAlphabet } from 'nanoid'

const generateUrl = () => {
  const nanoid = customAlphabet('ABCDEFGHIjklmnoprstvuzxy', 5)
  const code = nanoid()

  return {
    code,
    shortUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/${code}`,
  }
}

export default generateUrl
