import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState(null); // null = loading, [] = empty array

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
        setData([]); // fail gracefully
      });
  }, []);

  if (data === null) {
    return <Spin tip="Loading table…" />;
  }

  const columns = [
    { title: "Trade Code", dataIndex: "trade_code", key: "trade_code" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Close", dataIndex: "close", key: "close" },
    { title: "Volume", dataIndex: "volume", key: "volume" },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default DataTable;
