import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isCycle, setIsCycle] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get the current route

  // Restore authToken from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedPath = localStorage.getItem("currentPath");

    if (token) {
      setAuthToken(token);

      // Redirect only if the current location is "/login" or the root path
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate(savedPath || "/user", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  // Save token to state and navigate to default path on login
  const login = (token, username, isCycle) => {
    setAuthToken(token);
    setIsCycle(isCycle);
    localStorage.setItem("authToken", token); // Save token to localStorage
    localStorage.setItem("currentPath", "/user"); // Default path after login
    navigate("/user"); // Redirect to user homepage
  };

  // Remove token and redirect to login
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentPath");
    navigate("/login"); // Redirect to login page
  };

  // Save the user's current path to localStorage whenever it changes
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("currentPath", location.pathname);
    }
  }, [location.pathname, authToken]);

  // Check if user is authenticated
  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider
      value={{ authToken, isCycle, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access Auth Context
export const useAuth = () => useContext(AuthContext);
