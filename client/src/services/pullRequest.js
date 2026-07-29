import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getRepositoryPullRequests = (repositoryId) => {
  return axios.get(
    `${API}/pull-requests/${repositoryId}`,
    getAuthHeaders()
  );
};

export const getPullRequestAnalysis = (repositoryId, prNumber) => {
  return axios.get(
    `${API}/pull-requests/${repositoryId}/${prNumber}`,
    getAuthHeaders()
  );
};

export const analyzePullRequest = (repositoryId, prNumber) => {
  return axios.post(
    `${API}/pull-requests/analyze/${repositoryId}/${prNumber}`,
    {},
    getAuthHeaders()
  );
};