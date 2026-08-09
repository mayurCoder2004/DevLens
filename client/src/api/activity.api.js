import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getRecentActivities = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/activity`, {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
