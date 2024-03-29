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

const CountryNameChart = ({ code }) => {
  const [countryNames, setCountryNames] = useState([])

  useEffect(() => {
    const fetchCountryNames = async () => {
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
          return setCountryNames(arr2)
        }
        findOcc(res, 'countryName')
      } catch (error) {
        console.log(error)
      }
    }
    fetchCountryNames()
  }, [code])

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

  if (countryNames.length === 0) {
    return null
  }

  return (
    <div className="md:w-80 md:h-80 sm:w-9/12 sm:h-9/12 m-auto px-3">
      <Bar options={options} data={data} />
    </div>
  )
}

export default CountryNameChart
