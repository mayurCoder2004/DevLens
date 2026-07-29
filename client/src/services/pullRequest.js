import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getPullRequestAnalysis = (repositoryId) => {
  return axios.get(
    `${API_URL}/pull-request/${repositoryId}`,
    {
      headers: getAuthHeaders(),
    }
  );
};