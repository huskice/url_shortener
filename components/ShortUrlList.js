import { useEffect, useState } from 'react'

import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'

const ShortUrlLists = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch('/api')
        const result = await response.json()

        if (!response.ok) {
          throw new Error('Something went wrong')
        }

        setData(result)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  let lists

  if (data.length === 0) {
    lists = (
      <div className="justify-center flex pt-20">
        <p>Start shortening URLs</p>
      </div>
    )
  } else {
    lists = (
      <ul className="list-disc font-thin" role="list">
        {data.map((value, index) => (
          <li key={index}>
            <Link href={`/analytics/${value.code}`}>{value.shortUrl} </Link>
          </li>
        ))}
      </ul>
    )
  }

  return <div className="pt-20 flex items-center justify-center">{!isLoading ? lists : <LoadingSpinner />}</div>
}

export default ShortUrlLists
