import Head from 'next/head'

import OriginalUrlForm from '../components/OriginalUrlForm'
import BrowserNameChart from '@/components/BrowserNameChart'
import CountryNameChart from '@/components/CountryNameChart'
import VisitorChart from '@/components/VisitorChart'
import RefererDomains from '@/components/RefererDomains'

const Home = () => {
  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <main>
        <OriginalUrlForm />
      </main>
      <div className="grid m-auto mt-40 md:grid-cols-2 sm:grid-rows-4 sm:place-items-center gap-4 content-center lg:w-2/3 md:w-full sm:w-96">
        <BrowserNameChart />
        <VisitorChart />
        <CountryNameChart />
        <RefererDomains />
      </div>
    </>
  )
}

export default Home
