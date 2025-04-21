import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";

const ChartComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://5a8e-34-16-159-105.ngrok-free.app")
      .then((res) => {
        const payload = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setData(payload);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setData([]);
      });
  }, []);

  if (!Array.isArray(data)) {
    return <Spin tip="Loading chart…" />;
  }

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="close" stroke="#8884d8" />
    </LineChart>
  );
};

export default ChartComponent;
