import {
  AreaChart,
  LineChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from 'react'
import axios from 'axios'

const Chart = () => {

  const [data, setData] = useState(null)
  const [isFetch, setIsFetch] = useState(true);

  const fetchDataChart = async () => {
    await axios.get(`http://localhost:3000/user/chart`, {
      withCredentials: true
    }).then(data => {
      console.log(data)
      setData(data.data)
      setIsFetch(false);
    }).catch(err => {
      console.log(err);
    })

  }

  useEffect(() => {
    fetchDataChart()
  }, [])

  return (
    <div className="chart">
      <div className="title">Portfolio Chart</div>
      {
        !isFetch && (
          <AreaChart
            width={1000}
            height={400}
            data={data}
            margin={{ top: 15, right: 0, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis dataKey="value" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fillOpacity={0.1}
              fill="#0000FF"
              />
          </AreaChart>
        )
      }

    </div>
  );
};

export default Chart