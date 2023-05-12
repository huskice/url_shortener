import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import BrowserNameChart from '@/components/BrowserNameChart'
import CountryNameChart from '@/components/CountryNameChart'
import VisitorChart from '@/components/VisitorChart'
import RefererDomains from '@/components/RefererDomains'
import TotalNumOfVisits from '@/components/TotalNumOfVisits'

const Analytics = () => {
  const [data, setData] = useState()

  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/urlAnalytic/${code}`)

        if (!response.ok) {
          throw new Error('Something went wrong! Try again.')
        }

        const result = await response.json()
        setData(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAnalytics()
  }, [])

  if (data === 'undefined') return null

  return (
    <>
      <TotalNumOfVisits code={code} />
      <div className="grid m-auto mt-40 md:grid-cols-2 sm:grid-rows-4 sm:place-items-center gap-4 content-center lg:w-2/3 md:w-full sm:w-96">
        <BrowserNameChart code={code} />
        <VisitorChart code={code} />
        <CountryNameChart code={code} />
        <RefererDomains code={code} />
      </div>
    </>
  )
}

export default Analytics
