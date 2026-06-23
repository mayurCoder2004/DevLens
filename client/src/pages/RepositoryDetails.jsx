import { useNavigate, useParams } from "react-router-dom";

const RepositoryDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Repository Details</h1>

      <p className="mb-6">Repository ID: {id}</p>

      <button
        onClick={() => navigate(`/architecture/${id}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        View Architecture
      </button>
    </div>
  );
};

export default RepositoryDetails;
