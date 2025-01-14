import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";

const SelectField = ({
  label,
  name,
  control,
  options,
  rules,
  defaultValue = "",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box sx={{ mb: 3, width: "100%" }}>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(error)}
            sx={{
              "& .MuiInputLabel-root": {
                backgroundColor: "#2B2A38",
                color: "#fff",
                padding: "0 4px",
                transform: "translate(14px, -10px) scale(0.75)",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                color: "#fff",
                borderColor: "#fff",
                "& fieldset": {
                  borderColor: "#fff",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "#fff",
              },
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
            }}
          >
            {label && <InputLabel>{label}</InputLabel>}
            <Select
              value={value || ""}
              onChange={onChange}
              displayEmpty
              inputProps={{ "aria-label": label || "Select an option" }}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        </Box>
      )}
    />
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SelectField;
