import { useRouter } from 'next/router'

import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { urlSchema } from '../validations/OriginalUrlValidation'

import Header from './Header'
import LoadingSpinner from './LoadingSpinner'

async function createShortUrl(originalUrl) {
  try {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    })

    if (!res.ok) {
      throw new Error('Oh no, something went wrong!')
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const OriginalUrlForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(urlSchema),
  })

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data, e) => {
    e.preventDefault()
    setIsLoading(true)

    const newUrl = await createShortUrl(data.originalUrl)

    router.push({ pathname: '/shortUrl', query: { code: newUrl.code } }, '/shortUrl')
  }

  return (
    <>
      <div className="h-2/3 lg:w-2/5 md:w-1/2 sm:w-96 mx-auto mt-28 border-4 box-border rounded-xl shadow-2xl">
        <Header />
        <form className="flex mt-10 p-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('originalUrl')}
            type="text"
            className="py-2.5 w-full text-gray-900 text-base rounded-lg border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1 "
          />
          <button
            type="submit"
            className="mx-3 w-24 lg:text-base  md:text-sm sm:text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {errors.originalUrl && <p className="mx-6 text-sm text-red-500">This field is required!</p>}
      </div>
      {!isLoading ? null : <LoadingSpinner />}
    </>
  )
}
export default OriginalUrlForm
