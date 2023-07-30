import { useRouter } from 'next/router'

import { useState, useRef } from 'react'

import AlertMessage from './AlertMessage'

const ShortUrlForm = () => {
  const [showAlert, setShowAlert] = useState(false)

  const inputUrlRef = useRef()

  const router = useRouter()

  const { code } = router.query

  const handleCopyUrl = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(inputUrlRef.current.value)
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }

  return (
    <>
      <div className="h-2/3 lg:w-2/5 md:w-1/2 sm:w-96 mx-auto mt-28 border-4 box-border rounded-xl shadow-2xl">
        <h1 className="p-4 font-medium text-center lg:text-4xl md:text-3xl sm:text-base text-gray-900 leading-none tracking-tight dark:text-white">
          URL SHORTENER
        </h1>
        <form className="flex mt-10 p-5">
          <input
            readOnly
            value={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/${code}`}
            ref={inputUrlRef}
            className="py-2.5 w-full text-gray-900 text-base rounded-lg border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1 "
          />
          <button
            onClick={handleCopyUrl}
            className="mx-3 w-24 lg:text-base  md:text-sm sm:text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Copy URL
          </button>
        </form>
      </div>
      {showAlert ? <AlertMessage onClose={handleClose} /> : null}
    </>
  )
}

export default ShortUrlForm
