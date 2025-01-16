import React, { useEffect, useState } from "react";
import { container } from "../../assets/styles";
import { getLatestCycle, getUserDetails } from "../../api";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import FloatingLabelBox from "../../components/Common/FloatingLabelBox";
import { useForm } from "react-hook-form";
import DatePicker from "../../components/Common/DatePicker";

export default function HomePage() {
  const {
    control,
    formState: { errors },
  } = useForm();
  function getMonthAbbreviation(monthNumber) {
    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthAbbreviations[monthNumber - 1]; // Subtract 1 to account for zero-based index
  }
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cycleData, setCycleData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const userdata = await getUserDetails();
      const cycledata = await getLatestCycle();
      setUserDetails(userdata);
      setCycleData(cycledata);
      setLoading(false);
      console.log(userdata, cycledata);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={container}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={container}>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "100%", // Ensure full-width scaling
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, lg: 10 },
          height: { xs: "80vh", lg: "100vh" }, // Handle height dynamically for smaller screens
          overflowY: { xs: "auto", lg: "auto" }, // Enable scrolling only when content overflows
          padding: { xs: 2, lg: 4 }, // Add padding for better spacing
          boxSizing: "border-box", // Ensure padding is included in dimensions
        }}
      >
        {cycleData && cycleData != null ? (
          <Box
            sx={{
              width: { xs: "90%", lg: "40%" },
              backgroundColor: "#2B2A38",
              display: "flex",
              flexDirection: "column",
              padding: 2,
              borderRadius: 5,
              marginTop: { xs: "15vh", lg: "0" },
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 3 }}>
              Last Cycle
            </Typography>
            <FloatingLabelBox
              label={"Start Date"}
              text={
                cycleData.startDay +
                " " +
                getMonthAbbreviation(cycleData.startMonth) +
                " " +
                cycleData.startYear
              }
            />
            <FloatingLabelBox
              label={"End Date"}
              text={
                cycleData.endDay +
                " " +
                getMonthAbbreviation(cycleData.endMonth) +
                " " +
                cycleData.endYear
              }
            />
            <FloatingLabelBox
              label={"Started  After"}
              text={cycleData.afterDays + " days"}
            />
          </Box>
        ) : (
          <Typography variant="h3">No cycle data present yet.</Typography>
        )}

        <DatePicker />
      </Box>
    </div>
  );
}
