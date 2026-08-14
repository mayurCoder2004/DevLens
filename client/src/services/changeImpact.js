import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getChangeImpactAnalysis = (repositoryId, prNumber) => {
  return axios.get(
    `${API}/change-impact/${repositoryId}/${prNumber}`,
    getAuthHeaders(),
  );
};
