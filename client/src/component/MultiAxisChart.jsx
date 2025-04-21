import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import axios from "axios";

const MultiAxisChart = () => {
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
    return <Spin tip="Loading multi‑axis charts…" />;
  }

  return (
    <div>
      <h3>Close over Time (Left Axis)</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="close" stroke="#8884d8" />
      </LineChart>

      <h3>Volume over Time</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="volume" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default MultiAxisChart;
