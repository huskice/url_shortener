import { useEffect, useState } from 'react'

const TotalNumOfVisits = ({ code }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api')
        const result = await response.json()

        const res = await result.filter((value) => value.code === code)

        setData(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [code])

  const visits = data[0]?._count['urlAnalytic']

  let message
  
  if (visits === 0) {
    message = <p className="justify-center flex pt-20 text-xl">Data analytics is not available!</p>
  }

  return (
    <>
      <div className="justify-center flex pt-9 text-xl">
        Number of visits: {visits}
      </div>
      {message}
    </>
  )
}
export default TotalNumOfVisits
