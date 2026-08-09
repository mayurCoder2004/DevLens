import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getRepositories = () => {
  return axios.get(`${API_URL}/repositories`, getAuthConfig());
};

export const syncRepositories = () => {
  return axios.post(`${API_URL}/repositories/sync`, {}, getAuthConfig());
};

export const getRepositoryById = (repositoryId) => {
  return axios.get(`${API_URL}/repositories/${repositoryId}`, getAuthConfig());
};
