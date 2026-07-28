import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export const getDashboardOverview = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/overview`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};