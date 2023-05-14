import { useEffect, useState } from 'react'

const RefererDomains = ({ code }) => {
  const [referers, setReferers] = useState([])

  useEffect(() => {
    const fetchReferers = async () => {
      try {
        const response = await fetch('/api/urlAnalytic')
        const result = await response.json()

        const res = await result.filter((value) => value.urlCode === code)

        function findOcc(res, key) {
          let arr2 = []

          res.forEach((x) => {
            if (
              arr2.some((val) => {
                return val[key] == x[key]
              })
            ) {
              arr2.forEach((k) => {
                if (k[key] === x[key]) {
                  k['occurrence']++
                }
              })
            } else {
              let a = {}
              a[key] = x[key]
              a['occurrence'] = 1
              arr2.push(a)
            }
          })
          return setReferers(arr2)
        }
        findOcc(res, 'referer')
      } catch (error) {
        console.log(error)
      }
    }
    fetchReferers()
  }, [code])

  let refererData
  
  if (referers.length === 0) {
    return null
  } else {
    refererData = (
      <div className="md:w-80 md:h-80 sm:w-9/12 sm:h-9/12 m-auto px-3">
        <h6 className="font-medium text-gray-600 text-sm text-center">Referer Doimans</h6>
        <ul className="list-disc pt-3 font-thin pl-10" role="list">
          {referers.map((value, index) => (
            <li className="text-xs text-gray-800" key={index}>
              {value.referer}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return <>{refererData}</>
}

export default RefererDomains
