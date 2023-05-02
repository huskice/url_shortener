import { useEffect, useState } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: true,
      text: 'Country Name',
    },
  },
}

const CountryNameChart = () => {
  const [countryNames, setCountryNames] = useState([])

  useEffect(() => {
    const fetchCountryNames = async () => {
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
          return setCountryNames(arr2)
        }
        findOcc(result, 'countryName')
      } catch (error) {
        console.log(error)
      }
    }
    fetchCountryNames()
  }, [])

  const data = {
    labels: countryNames.map((x) => x.countryName),
    datasets: [
      {
        data: countryNames.map((x) => x.occurrence),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,      
        maxBarThickness: 8,
        minBarLength: 2,
      },
    ],
  }

  return (
    <div className="md:w-80 md:h-80 sm:w-9/12 sm:h-9/12 m-auto px-3">
      <Bar options={options} data={data} />
    </div>
  )
}

export default CountryNameChart
