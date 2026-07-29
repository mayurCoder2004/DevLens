import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getRepositoryAIReview = (
  repositoryId
) => {
  return axios.get(
    `${API}/repositories/${repositoryId}/ai-review`,
    getHeaders()
  );
};

export const refreshRepositoryAIReview = (
  repositoryId
) => {
  return axios.put(
    `${API}/repositories/${repositoryId}/ai-review`,
    {},
    getHeaders()
  );
};