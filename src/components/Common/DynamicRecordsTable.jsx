import React, { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { container } from "../../assets/styles";
import { CircularProgress } from "@mui/material";

const DynamicRecordsTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch records from the API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/users/get-records`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setRecords(response.data);
      } catch (err) {
        console.error("Error fetching records:", err);
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Specify the fields to display
  const displayFields = [
    { key: "startDay", header: "Start Day" },
    { key: "startMonth", header: "Start Month" },
    { key: "startYear", header: "Start Year" },
    { key: "endDay", header: "End Day" },
    { key: "endMonth", header: "End Month" },
    { key: "endYear", header: "End Year" },
    { key: "afterDays", header: "After Days" },
  ];

  // Generate columns based on the displayFields
  const columns = useMemo(() => {
    return displayFields.map((field) => ({
      accessorKey: field.key,
      header: field.header,
    }));
  }, [displayFields]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <MaterialReactTable
      columns={columns}
      data={records}
      enableSorting
      enableFiltering
      enablePagination
      muiTableBodyProps={{
        sx: {
          "& tr": {
            backgroundColor: "#2B2A38 !important", // Background color for table rows
            "&:hover": {
              backgroundColor: "#383747", // Slightly darker on hover
            },
          },
          "& td": {
            color: "#fff", // Text color for table cells
            borderColor: "#444", // Border color for cells
          },
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: "#2B2A38", // Background for header cells
          color: "#ffffff", // Text color for headers
          fontWeight: "bold", // Bold font for headers
          fontSize: "14px", // Larger font size for headers
          borderColor: "#444", // Border color for header cells
          "& .MuiTableSortLabel-icon": {
            color: "#ffffff !important", // Color for sort buttons in default state
            "&:hover": {
              color: "#ffffff", // Color for sort buttons on hover
            },
            "&.Mui-active": {
              color: "#ffffff", // Color for active sort buttons
            },
          },
          "& .MuiSvgIcon-fontSizeMedium": {
            color: "#ffffff !important", // Color for sort buttons in default state
            "&:hover": {
              color: "#ffffff", // Color for sort buttons on hover
            },
            "&.Mui-active": {
              color: "#ffffff", // Color for active sort buttons
            },
          },
          "& .MuiInputBase-inputAdornedEnd": {
            color: "#ffffff !important", // Color for sort buttons in default state
            "&:hover": {
              color: "#ffffff", // Color for sort buttons on hover
            },
            "&.Mui-active": {
              color: "#ffffff", // Color for active sort buttons
            },
          },
        },
      }}
      muiTableCellProps={{
        sx: {
          borderColor: "#444", // Consistent border color for all cells
        },
      }}
      muiTableContainerProps={{
        sx: {
          backgroundColor: "#1E1E2A", // Background for the table container
        },
      }}
    />
  );
};

export default DynamicRecordsTable;
