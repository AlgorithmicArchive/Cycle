const API_URL = import.meta.env.VITE_API_URL;

// Fetch user details
export const getUserDetails = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/users/userdetails`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return await response.json();
};

// Fetch the latest cycle data
export const getLatestCycle = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No token found");
  const response = await fetch(`${API_URL}/users/latest-cycle`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
