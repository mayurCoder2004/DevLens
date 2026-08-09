import api from "./api";

export const analyzeRepository = async (repositoryId) => {
  const response = await api.post(`/analysis/${repositoryId}`);

  return response.data;
};
