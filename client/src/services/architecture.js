import api from "./api";

export const analyzeArchitecture = async (repositoryId) => {
  const response = await api.post(`/architecture/analyze/${repositoryId}`);

  return response.data;
};

export const getArchitecture = async (repositoryId) => {
  const response = await api.get(`/repositories/${repositoryId}/architecture`);

  return response.data;
};
