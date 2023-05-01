import { useEffect, useState } from 'react'

const RefererDomains = () => {
  const [referers, setReferers] = useState([])

  useEffect(() => {
    const fetchReferer = async () => {
      try {
        const response = await fetch('/api/urlAnalytic')
        const result = await response.json()

        function findOcc(result, key) {
          let arr2 = []

          result.forEach((x) => {
            // Checking if there is any object in arr2
            // which contains the key value
            if (
              arr2.some((val) => {
                return val[key] == x[key]
              })
            ) {
              // If yes! then increase the occurrence by 1
              arr2.forEach((k) => {
                if (k[key] === x[key]) {
                  k['occurrence']++
                }
              })
            } else {
              // If not! Then create a new object initialize
              // it with the present iteration key's value and
              // set the occurrence to 1
              let a = {}
              a[key] = x[key]
              a['occurrence'] = 1
              arr2.push(a)
            }
          })
          return setReferers(arr2)
        }
        findOcc(result, 'referer')
      } catch (error) {
        console.log(error)
      }
    }
    fetchReferer()
  }, [])

  return (
    <div className="md:w-80 md:h-80 sm:w-9/12 sm:h-9/12 m-auto px-3">
      <h6 className="font-medium text-gray-600 text-sm text-center">Referer Doimans</h6>
      <ul className="list-disc pt-3 font-thin pl-10" role="list">
        {referers.map((val, index) => (
          <li className="text-xs text-gray-800" key={index}>{val.referer}</li>
        ))}
      </ul>
    </div>
  )
}

export default RefererDomains
