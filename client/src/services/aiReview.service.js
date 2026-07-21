import api from "./api";

export const getRepositoryAIReview = async (repositoryId) => {
  const response = await api.get(
    `/repositories/${repositoryId}/ai-review`,
  );

  return response.data.data;
};

export const refreshRepositoryAIReview = async (repositoryId) => {
  const response = await api.post(
    `/repositories/${repositoryId}/ai-review/refresh`,
  );

  return response.data.data;
};