import React from "react";
import { container } from "../assets/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
export default function HomePage() {
  return (
    <div style={container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Box
          component="img"
          src="/images/Cycle_logo.png"
          alt="Cycle"
          sx={{
            width: {
              xs: "50vw", // Small screens
              sm: "10vw", // Medium screens
              lg: "20vw", // Large screens
            },
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "24px", // Small screens
              sm: "32px", // Medium screens
              md: "40px", // Large screens
              lg: "48px", // Extra large screens
            },
            textAlign: "center",
          }}
        >
          Welcome to Cycle!
        </Typography>
      </div>
    </div>
  );
}
