import React, { createContext, useState, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isCycle, setIsCycle] = useState(false);

  // Save token to state
  const login = (token, username, isCycle) => {
    setAuthToken(token);
    setIsCycle(isCycle);
    localStorage.setItem("authToken", token); // Save to localStorage for persistence
  };

  // Remove token
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

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
