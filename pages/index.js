import Head from 'next/head'

import OriginalUrlForm from '../components/OriginalUrlForm'
import ShortUrlList from '../components/ShortUrlList'

const Home = () => {
  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <main>
        <OriginalUrlForm />
        <ShortUrlList />
      </main>
    </>
  )
}

export default Home
