import axios from "axios";

const API_URL = "http://localhost:5000/api/activity";

export const getRecentActivities = async (
  page = 1,
  limit = 10
) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
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