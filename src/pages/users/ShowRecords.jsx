import React from "react";
import { container } from "../../assets/styles";
import DynamicRecordsTable from "../../components/Common/DynamicRecordsTable";

export default function ShowRecords() {
  return (
    <div style={container}>
      <DynamicRecordsTable />
    </div>
  );
}
