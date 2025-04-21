import React, { useEffect, useState } from "react";
import axios from "axios";
import TableComponent from "../component/DataTable";
import LineChartComponent from "../component/LineChart";
import BarChartComponent from "../component/BarChart";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/data")
      .then(response => setData(response.data.length ? response.data : []))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Stock Market Dashboard</h1>
      <LineChartComponent data={data} />
      <BarChartComponent data={data} />
      <TableComponent />
    </div>
  );
};

export default Home;
