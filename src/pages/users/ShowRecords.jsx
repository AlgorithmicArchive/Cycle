import React from "react";
import { container } from "../../assets/styles";
import DynamicRecordsTable from "../../components/Common/DynamicRecordsTable";
import { Box } from "@mui/material";

export default function ShowRecords() {
  return (
    <div style={container}>
      <Box
        component={"div"}
        sx={{
          display: { lg: "flex" },
          width: "100%", // Ensure full-width scaling
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "80vh", lg: "100vh" }, // Handle height dynamically for smaller screens
          overflowY: { xs: "auto", lg: "auto" }, // Enable scrolling only when content overflows
          padding: { xs: 2, lg: 4 }, // Add padding for better spacing
          boxSizing: "border-box", // Ensure padding is included in dimensions
        }}
      >
        <DynamicRecordsTable />
      </Box>
    </div>
  );
}
