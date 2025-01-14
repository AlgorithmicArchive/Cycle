import { Box } from "@mui/system";
import React from "react";
import { buttonStyles } from "../../assets/styles";

export default function FormButton({ label, buttonPress }) {
  return (
    <Box component="button" style={buttonStyles.button} onClick={buttonPress}>
      {label}
    </Box>
  );
}
