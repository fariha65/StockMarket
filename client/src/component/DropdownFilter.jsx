import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import axios from "axios";

const DropdownFilter = ({ setFilteredData }) => {
  const [data, setData] = useState(null);
  const [tradeCodes, setTradeCodes] = useState([]);

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
        setTradeCodes([...new Set(payload.map((item) => item.trade_code))]);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setData([]);
      });
  }, []);

  if (data === null) {
    return <Spin tip="Loading filter…" />;
  }

  const handleChange = (value) => {
    setFilteredData(data.filter((item) => item.trade_code === value));
  };

  return (
    <Select onChange={handleChange} placeholder="Select Trade Code" style={{ width: 200 }}>
      {tradeCodes.map((code) => (
        <Select.Option key={code} value={code}>
          {code}
        </Select.Option>
      ))}
    </Select>
  );
};

export default DropdownFilter;
