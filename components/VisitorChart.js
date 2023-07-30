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

const VisitorChart = ({ code }) => {
  const [uniqueVisitors, setUniqueVisitors] = useState([])
  const [newVisitor, setNewVisitor] = useState([])

  useEffect(() => {
    const fetchVisitors = async () => {
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

        findOcc(res, 'cookie')
      } catch (error) {
        console.log(error)
      }
    }
    fetchVisitors()
  }, [code])

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

  if (uniqueVisitors.length === 0 && newVisitor.length === 0) {
    return null
  }

  return (
    <div className="md:w-80 md:h-80 sm:w-9/12 sm:h-9/12 m-auto px-3">
      <Pie data={data} options={options} />
    </div>
  )
}

export default VisitorChart
