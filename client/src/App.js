import React, { useState } from "react";
import DataTable from "./component/DataTable";
import EditableTable from "./component/EditableTable";
import ChartComponent from "./component/LineChart";
import MultiAxisChart from "./component/MultiAxisChart";
import DropdownFilter from "./component/DropdownFilter";

const App = () => {
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div>
      <h1>Janata Wifi Dashboard</h1>
      <DropdownFilter setFilteredData={setFilteredData} />
      <ChartComponent />
      <MultiAxisChart />
      <EditableTable />
    </div>
  );
};

export default App;
