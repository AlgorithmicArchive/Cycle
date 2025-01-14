import React from "react";
import { container } from "../assets/styles";
import InputField from "../components/Form/InputField";
import FormButton from "../components/Form/FormButton";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

export default function LoginScreen() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const API_URL = import.meta.env.VITE_API_URL;
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // setIsLoading(true);
    try {
      // Send login request
      const response = await axios.post(`${API_URL}/login`, {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        const { token, username, isCycle } = response.data;

        // Save token securely
        await login(token, username, isCycle); // Call AuthContext's login method

        navigate("/user");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Invalid username or password");
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div style={container}>
      <Box
        sx={{
          backgroundColor: "#2B2A38",
          borderRadius: 5,
          width: { xs: "90vw", lg: "20vw" },
          padding: { xs: 3, lg: 5 },
        }}
      >
        <Typography variant="h6" style={{ marginBottom: 10 }}>
          Log In
        </Typography>
        <InputField
          label="Username"
          name="username"
          control={control}
          rules={{
            required: "Username is required",
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Username can only contain letters, numbers, and underscores",
            },
          }}
          placeholder="Username"
        />
        <InputField
          label="Password"
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character",
            },
          }}
          placeholder="Password"
          isPassword={true}
        />
        <FormButton label={"Login"} buttonPress={handleSubmit(onSubmit)} />
      </Box>
    </div>
  );
}
