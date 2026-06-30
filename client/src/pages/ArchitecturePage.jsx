import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

import "reactflow/dist/style.css";

import { ArrowLeft } from "lucide-react";

import { getLayoutedElements } from "../utils/graphLayout";

const ArchitecturePage = () => {
  const { repositoryId } = useParams();

  const navigate = useNavigate();

  const [architecture, setArchitecture] = useState(null);

  const [repository, setRepository] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const analyzeAgain = async () => {
    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/architecture/analyze/${repositoryId}`,
      );

      const response = await axios.get(
        `http://localhost:5000/api/architecture/${repositoryId}`,
      );

      setArchitecture(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchArchitecture = async () => {
      try {
        const architectureResponse = await axios.get(
          `http://localhost:5000/api/architecture/${repositoryId}`,
        );

        setArchitecture(architectureResponse.data.data);

        const repositoriesResponse = await axios.get(
          "http://localhost:5000/api/repositories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const repositories = repositoriesResponse.data.repositories || [];

        const repo = repositories.find(
          (repo) => String(repo.id) === repositoryId,
        );

        setRepository(repo);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArchitecture();
  }, [repositoryId]);

  const flowData = useMemo(() => {
    if (!architecture) {
      return {
        nodes: [],
        edges: [],
      };
    }

    const nodes = architecture.graph.nodes.map((node) => ({
      id: node.id,

      data: {
        label: node.id,
      },

      position: {
        x: 0,
        y: 0,
      },

      style: {
        background: "#eff6ff",
        border: "1px solid #3b82f6",
        borderRadius: 10,
        padding: 10,
        width: 180,
        fontWeight: 500,
      },
    }));

    const edges = architecture.graph.edges.map((edge, index) => ({
      id: `${edge.source}-${edge.target}-${index}`,

      source: edge.source,

      target: edge.target,
    }));

    return getLayoutedElements(nodes, edges);
  }, [architecture]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading Architecture...</h2>
      </div>
    );
  }

  if (error.includes("Architecture analysis not found")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">
          No Architecture Analysis Found
        </h2>

        <p className="text-gray-500 mb-6">Analyze this repository first.</p>

        <button
          onClick={analyzeAgain}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Analyze Repository
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-red-500 text-xl">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <button
        onClick={() => navigate(`/repository/${repositoryId}`)}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            {repository?.name || "Repository"}
          </h1>

          <p className="text-gray-500 mt-1">Architecture Analysis</p>
        </div>

        <div className="text-right">
          <button
            onClick={analyzeAgain}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Analyze Again
          </button>

          {architecture && (
            <p className="text-xs text-gray-500 mt-2">
              Last analyzed: {new Date(architecture.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Nodes</h3>

          <p className="text-3xl font-bold mt-2">{architecture.nodeCount}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Edges</h3>

          <p className="text-3xl font-bold mt-2">{architecture.edgeCount}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Complexity Score
          </h3>

          <p className="text-3xl font-bold mt-2">
            {architecture.complexityScore}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Circular Dependency
          </h3>

          <p
            className={`text-3xl font-bold mt-2 ${
              architecture.hasCircularDependency
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {architecture.hasCircularDependency ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Architecture Summary</h2>

        <p>
          This repository contains <strong>{architecture.nodeCount}</strong>{" "}
          modules and <strong>{architecture.edgeCount}</strong> dependencies.
        </p>

        <p className="mt-2">
          Complexity Score: <strong>{architecture.complexityScore}</strong>
        </p>

        <p className="mt-2">
          Circular Dependency:{" "}
          <strong>
            {architecture.hasCircularDependency ? "Detected" : "Not Found"}
          </strong>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 h-[750px]">
        <ReactFlow nodes={flowData.nodes} edges={flowData.edges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ArchitecturePage;
