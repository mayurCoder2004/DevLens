import api from "./api";

export const analyzeTechnicalDebt = async (repositoryId) => {
  const response = await api.post(`/technical-debt/analyze/${repositoryId}`);

  return response.data;
};

export const getTechnicalDebt = async (repositoryId) => {
  const response = await api.get(`/technical-debt/${repositoryId}`);

  return response.data;
};
