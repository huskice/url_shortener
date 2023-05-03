import { useEffect, useState } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Visitors',
    },
  },
}

const VisitorChart = () => {
  const [uniqueVisitors, setUniqueVisitors] = useState()
  const [newVisitor, setNewVisitor] = useState()

  useEffect(() => {
    const fetchUniqueVisitors = async () => {
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

          let uniqueV = 0
          let newV = 0
          const number = arr2.map((val) => val.occurrence)
         
          number.forEach((num) => {
            if (num === 1) {
              newV = newV + 1
              setNewVisitor(newV)
            } else {
              uniqueV = uniqueV + 1
              setUniqueVisitors(uniqueV)
            }
          })
        }

        findOcc(result, 'cookie')
      } catch (error) {}
    }
    fetchUniqueVisitors()
  }, [])

  const data = {
    labels: ['New Visitor', 'Unique Visitor'],
    datasets: [
      {
        data: [newVisitor, uniqueVisitors],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="md:w-80 md:h-80 sm:w-9/12 sm:h-9/12 m-auto px-3">
      <Pie data={data} options={options} />
    </div>
  )
}

export default VisitorChart
