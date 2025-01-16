import { Box, Typography } from "@mui/material";
export const Navigation = () => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          backgroundColor: "#1E1E2A",
          padding: "10px 0",
          display: "flex",
          justifyContent: "space-around",
          zIndex: 1000,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: 24, lg: 36 },
            fontWeight: "bold",
          }}
        >
          Cycle
        </Typography>
      </Box>
    </>
  );
};
