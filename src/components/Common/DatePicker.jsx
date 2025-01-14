import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import SelectField from "../Form/SelectField.jsx";
import FormButton from "../Form/FormButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const DatePicker = () => {
  const { control, handleSubmit, reset } = useForm();
  const { isCycle } = useAuth();
  const [token, setToken] = useState(null);
  const [IsCycle, setIsCycle] = useState(isCycle);
  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch token from localStorage
  useEffect(() => {
    const fetchToken = () => {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  // Options for days (1 to 31)
  const dateOptions = Array.from({ length: 31 }, (_, i) => ({
    label: (i + 1).toString(),
    value: i + 1,
  }));

  // Options for months
  const monthOptions = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  // Options for years
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 12 }, (_, i) => ({
    label: (currentYear - i).toString(),
    value: currentYear - i,
  }));

  const onsubmit = async (action, data) => {
    try {
      const payload =
        action === "start"
          ? {
              startDay: data.Date,
              startMonth: data.Month,
              startYear: data.Year,
            }
          : {
              endDay: data.Date,
              endMonth: data.Month,
              endYear: data.Year,
            };

      const url =
        action === "start"
          ? `${API_URL}/users/start-cycle`
          : `${API_URL}/users/end-cycle`;

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response from server:", response.data.message);

      reset({
        Date: null,
        Month: null,
        Year: null,
      });

      setIsCycle(action === "start");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  if (!token) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        width: { xs: "90%", lg: "40%" },
        backgroundColor: "#2B2A38",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        borderRadius: 5,
      }}
    >
      <Typography sx={{ color: "#fff", fontSize: 24, mb: 2, mt: 3 }}>
        New Cycle
      </Typography>

      <SelectField
        control={control}
        name="Date"
        label="Date"
        options={dateOptions}
        defaultValue={1}
        rules={{ required: "This field is required." }}
      />
      <SelectField
        control={control}
        name="Month"
        label="Month"
        options={monthOptions}
        defaultValue={1}
        rules={{ required: "This field is required." }}
      />
      <SelectField
        control={control}
        name="Year"
        label="Year"
        options={yearOptions}
        defaultValue={currentYear}
        rules={{ required: "This field is required." }}
      />

      {!IsCycle ? (
        <FormButton
          label={"Start Cycle"}
          buttonPress={handleSubmit((data) => onsubmit("start", data))}
        />
      ) : (
        <FormButton
          label={"End Cycle"}
          buttonPress={handleSubmit((data) => onsubmit("end", data))}
        />
      )}
    </Box>
  );
};

export default DatePicker;
