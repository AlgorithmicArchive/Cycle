import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@mui/system";
import { AddCircleOutline, ListAltOutlined } from "@mui/icons-material";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const [selectedPath, setSelectedPath] = useState(location.pathname);

  const handleNavigation = (path) => {
    setSelectedPath(path); // Update selected path
    if (path === "logout") {
      logout();
      navigate("/");
      setSelectedPath("/"); // Reset to home on logout
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <Outlet />
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          backgroundColor: "#1E1E2A",
          padding: "10px 0",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          display: "flex",
          justifyContent: "space-around",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2B2A38",
            width: {
              xs: "100%",
              lg: "80%",
            },
            display: "flex",
            justifyContent: "space-around",
            padding: 0.5,
            borderRadius: 30,
          }}
        >
          {!isAuthenticated ? (
            // Unauthenticated Navigation
            <>
              <button
                onClick={() => handleNavigation("/")}
                style={buttonStyle(location.pathname === "/")}
              >
                <HomeIcon style={iconStyle(location.pathname === "/")} />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigation("/register")}
                style={buttonStyle(location.pathname === "/register")}
              >
                <AppRegistrationIcon
                  style={iconStyle(location.pathname === "/register")}
                />
                <span>Register</span>
              </button>
              <button
                onClick={() => handleNavigation("/login")}
                style={buttonStyle(location.pathname === "/login")}
              >
                <LoginIcon style={iconStyle(location.pathname === "/login")} />
                <span>Login</span>
              </button>
            </>
          ) : (
            // Authenticated Navigation
            <>
              <button
                onClick={() => handleNavigation("/user")}
                style={buttonStyle(location.pathname === "/user")}
              >
                <HomeIcon style={iconStyle(location.pathname === "/user")} />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigation("/user/addprevious")}
                style={buttonStyle(location.pathname === "/user/addprevious")}
              >
                <AddCircleOutline
                  style={iconStyle(location.pathname === "/user/addprevious")}
                />
                <span>Add Previous</span>
              </button>
              <button
                onClick={() => handleNavigation("/user/showrecords")}
                style={buttonStyle(location.pathname === "/user/showrecords")}
              >
                <ListAltOutlined
                  style={iconStyle(location.pathname === "/user/showrecords")}
                />
                <span>Show Records</span>
              </button>
              <button
                onClick={() => handleNavigation("logout")}
                style={buttonStyle(location.pathname === "logout")}
              >
                <LogoutIcon style={iconStyle(location.pathname === "logout")} />
                <span>Logout</span>
              </button>
            </>
          )}
        </Box>
      </nav>
    </>
  );
}

const buttonStyle = (isSelected) => ({
  background: "none",
  border: "none",
  color: isSelected ? "#ED3902" : "white",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const iconStyle = (isSelected) => ({
  fontSize: "1.5rem",
  color: isSelected ? "#ED3902" : "white",
});
