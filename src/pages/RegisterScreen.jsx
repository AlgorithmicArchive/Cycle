import React from "react";
import { container } from "../assets/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../components/Form/InputField";
import FormButton from "../components/Form/FormButton";

export default function RegisterScreen() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const API_URL = import.meta.env.VITE_API_URL;
  const onSubmit = async (data) => {
    try {
      console.log(data);
      // Replace with your backend URL
      const response = await axios.post(`${API_URL}/add-user`, {
        username: data.username,
        email: data.email,
        password: data.password,
        isCycle: false, // or false based on your logic
      });

      if (response.status === 201) {
        alert("User Added Succesffully.");
      } else {
        alert("Failded to add user.");
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
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
          Create Account
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
          label="Email"
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          placeholder="Email"
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
        <InputField
          label="Confirm Password"
          name="confirmpassword"
          control={control}
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          placeholder="Confirm Password"
          isPassword={true}
        />
        <FormButton label={"Submit"} buttonPress={handleSubmit(onSubmit)} />
      </Box>
    </div>
  );
}
