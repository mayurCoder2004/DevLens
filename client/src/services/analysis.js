import api from "./api";

const POLL_INTERVAL = 1000;

const waitForAnalysis = async (jobId) => {
  while (true) {
    const response = await api.get(`/jobs/${jobId}`);
    const { state } = response.data.data;

    if (state === "completed") {
      return;
    }

    if (state === "failed") {
      throw new Error("Repository analysis failed.");
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }
};

export const analyzeRepository = async (repositoryId) => {
  const response = await api.post(`/analysis/${repositoryId}`);

  if (response.status === 202) {
    await waitForAnalysis(response.data.jobId);
  }

  return response.data;
};
