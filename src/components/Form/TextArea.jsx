import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const TextArea = ({ label, name, control, rules, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value = "" },
        fieldState: { error },
      }) => (
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label={label}
            multiline
            rows={4} // Default rows, can be overridden via props
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : ""}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white", // Text color
                "& fieldset": {
                  borderColor: "white", // Default border color
                  borderRadius: 5,
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color on focus
                },
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label default color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Label color on focus
              },
              "& .MuiFormHelperText-root": {
                color: "white", // Helper text color
              },
            }}
            {...props}
          />
        </Box>
      )}
    />
  );
};

export default TextArea;
