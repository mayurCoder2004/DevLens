import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const analyzeTechnicalDebt = async (
  repositoryId
) => {
  const response = await axios.post(
    `${API_URL}/technical-debt/analyze/${repositoryId}`
  );

  return response.data;
};

export const getTechnicalDebt = async (
  repositoryId
) => {
  const response = await axios.get(
    `${API_URL}/technical-debt/${repositoryId}`
  );

  return response.data;
};