import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboardOverview = async () => {
  const response = await axios.get(
    `${API_URL}/overview`,
    getAuthHeaders()
  );

  return response.data;
};

export const getRepositoriesNeedingAttention =
  async () => {
    const response = await axios.get(
      `${API_URL}/attention`,
      getAuthHeaders()
    );

    return response.data;
  };