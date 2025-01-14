import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios"; // Axios for API requests
import { container } from "../../assets/styles";
import FormButton from "../../components/Form/FormButton";
import TextArea from "../../components/Form/TextArea";
import { Box } from "@mui/system";

const AddPrevious = () => {
  const { control, handleSubmit, reset } = useForm();
  const API_URL = import.meta.env.VITE_API_URL;
  const parseMultipleDateRanges = async (data) => {
    const token = localStorage.getItem("authToken"); // Use localStorage for web
    console.log(data);
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    const parsed = data.cycle.split("\n"); // Split input by lines
    const array = [];

    parsed.forEach((item) => {
      if (item.trim() !== "") {
        const [
          startDayRaw,
          StartMonth,
          startYearRaw,
          ,
          endDayRaw,
          EndMonth,
          endYearRaw,
        ] = item.split(" ");

        const startDay = parseInt(startDayRaw, 10);
        const startYear = parseInt(startYearRaw, 10);
        const endDay = parseInt(endDayRaw, 10);
        const endYear = parseInt(endYearRaw, 10);

        const startMonth = monthMap[StartMonth];
        const endMonth = monthMap[EndMonth];

        array.push({
          startDay,
          startMonth,
          startYear,
          endDay,
          endMonth,
          endYear,
        });
      }
    });

    try {
      console.log(array);
      const response = await axios.post(
        `${API_URL}/users/add-multiple`,
        { cycles: array },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Success: Cycles added successfully!");
        reset({ input: "" });
      } else {
        throw new Error(response.data.error || "Failed to add cycles");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message || "Failed to add cycles"}`);
    }
  };

  return (
    <div style={container}>
      <Box sx={{ width: { lg: "20%" } }}>
        <TextArea
          control={control}
          name={"cycle"}
          label="Previous Records"
          placeholder={`Eg.\n29 November 2024 to 3 December 2024\n15 January 2025 to 20 January 2025`}
        />
        <FormButton
          label={"Add"}
          buttonPress={handleSubmit(parseMultipleDateRanges)}
        />
      </Box>
    </div>
  );
};

export default AddPrevious;
