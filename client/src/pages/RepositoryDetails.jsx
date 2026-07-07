import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PullRequestAnalysisCard from "../components/pullRequest/PullRequestAnalysisCard";

const RepositoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobStatus, setJobStatus] = useState(null);

  const handleAnalyze = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5000/api/analysis/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const jobId = response.data.jobId;

      setJobStatus({
        jobId,
        state: "waiting",
      });

      const interval = setInterval(async () => {
        const statusResponse = await axios.get(
          `http://localhost:5000/api/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const status = statusResponse.data.data;

        setJobStatus(status);

        if (status.state === "completed") {
          clearInterval(interval);
        }

        if (status.state === "failed") {
          clearInterval(interval);
        }
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Repository Details</h1>

      <p className="mb-6">Repository ID: {id}</p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleAnalyze}
          disabled={
            jobStatus?.state === "waiting" || jobStatus?.state === "active"
          }
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {jobStatus?.state === "waiting"
            ? "Queued..."
            : jobStatus?.state === "active"
              ? "Analyzing..."
              : jobStatus?.state === "completed"
                ? "Analysis Complete"
                : "Analyze Repository"}
        </button>
        <button
          onClick={() => navigate(`/architecture/${id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View Architecture
        </button>

        <button
          onClick={() => navigate(`/technical-debt/${id}`)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          View Technical Debt
        </button>

        <button
          onClick={() => navigate(`/repositories/${id}/deployment`)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Deployment Intelligence
        </button>

        <button
          onClick={() => navigate(`/repositories/${id}/engineering-health`)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Engineering Health
        </button>

        <button
          onClick={() => navigate(`/repositories/${id}/ai-review`)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          🤖 AI Review
        </button>
      </div>
      <div className="mt-8">
        <PullRequestAnalysisCard repositoryId={id} />
      </div>
    </div>
  );
};

export default RepositoryDetails;
