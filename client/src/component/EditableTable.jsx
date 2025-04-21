import React, { useEffect, useState } from "react";
import { Table, Input, Spin } from "antd";
import axios from "axios";

const EditableTable = () => {
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

  if (data === null) {
    return <Spin tip="Loading editable table…" />;
  }

  const handleEdit = (value, record, column) => {
    const newData = data.map((item) =>
      item.id === record.id ? { ...item, [column]: value } : item
    );
    setData(newData);
    axios
      .put(`https://5a8e-34-16-159-105.ngrok-free.app/${record.id}`, {
        [column]: value,
      })
      .catch((err) => console.error("Update error:", err));
  };

  const columns = [
    { title: "Trade Code", dataIndex: "trade_code", key: "trade_code" },
    {
      title: "Close",
      dataIndex: "close",
      key: "close",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleEdit(e.target.value, record, "close")}
        />
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default EditableTable;
