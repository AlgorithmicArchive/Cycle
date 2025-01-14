import React, { useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";

const InputField = ({
  label,
  name,
  control,
  rules,
  isPassword = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
            type={isPassword && !isPasswordVisible ? "password" : "text"}
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
                  borderRadius: 10,
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color on focus
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Label color on focus
              },
              "& .MuiFormHelperText-root": {
                color: "white", // Helper text color
              },
            }}
            slotProps={{
              inputLabel: {
                style: { color: "#ffff" },
              },
              input: {
                endAdornment: isPassword && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            {...props}
          />
        </Box>
      )}
    />
  );
};

export default InputField;
