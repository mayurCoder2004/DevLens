import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboardOverview = async () => {
  const response = await axios.get(
    `${API_URL}/dashboard/overview`,
    getAuthHeaders()
  );

  return response.data;
};

export const getRepositoriesNeedingAttention =
  async () => {
    const response = await axios.get(
      `${API_URL}/dashboard/attention`,
      getAuthHeaders()
    );

    return response.data;
  };
