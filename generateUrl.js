import { customAlphabet } from 'nanoid'

const generateUrl = () => {
  const nanoid = customAlphabet('ABCDEFGHIjklmnoprstvuzxy', 10)
  const code = nanoid()

  return {
    code,
  }
}

export default generateUrl
