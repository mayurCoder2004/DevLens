import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getDeploymentReport = (repositoryId) => {
  return axios.get(`${API_URL}/deployment/${repositoryId}`, {
    headers: getAuthHeaders(),
  });
};

export const analyzeDeployment = (repositoryId) => {
  return axios.post(
    `${API_URL}/deployment/${repositoryId}/analyze`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
};