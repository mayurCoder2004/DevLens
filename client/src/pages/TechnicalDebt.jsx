import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTechnicalDebt } from "../services/technicalDebt";

export default function TechnicalDebt() {
  const { repositoryId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnicalDebt();
  }, []);

  const fetchTechnicalDebt = async () => {
    try {
      const response = await getTechnicalDebt(repositoryId);

      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading technical debt analysis...</div>;
  }

  if (!data) {
    return <div className="p-6">Technical debt analysis not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Technical Debt Analysis</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500 mb-2">Technical Debt Score</h2>

          <p className="text-5xl font-bold">{data.technicalDebtScore}</p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500 mb-2">Maintainability Score</h2>

          <p className="text-5xl font-bold">{data.maintainabilityScore}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500">Large Files</h3>

          <p className="text-3xl font-bold">{data.largeFileCount}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500">Dead Files</h3>

          <p className="text-3xl font-bold">{data.deadFileCount}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500">Deep Chains</h3>

          <p className="text-3xl font-bold">{data.deepDependencyChainCount}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500">Circular Dependencies</h3>

          <p className="text-3xl font-bold">{data.circularDependencyCount}</p>
        </div>
      </div>

      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Large Files</h2>

        {data.largeFiles.length === 0 ? (
          <p>No large files detected.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">File</th>
                <th className="text-left py-2">Lines</th>
              </tr>
            </thead>

            <tbody>
              {data.largeFiles.map((file) => (
                <tr key={file.file} className="border-b">
                  <td className="py-2">{file.file}</td>

                  <td className="py-2">{file.lines}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Dead Files</h2>

        {data.deadFiles.length === 0 ? (
          <p>No dead files detected.</p>
        ) : (
          <ul className="space-y-2">
            {data.deadFiles.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Deep Dependency Chains</h2>

        {data.deepDependencyChains.length === 0 ? (
          <p>No deep chains detected.</p>
        ) : (
          <div className="space-y-6">
            {data.deepDependencyChains.map((chain, index) => (
              <div key={index} className="border rounded p-4">
                <p className="font-semibold mb-2">Depth: {chain.depth}</p>

                <div className="flex flex-wrap gap-2">
                  {chain.chain.map((file, fileIndex) => (
                    <span key={fileIndex}>
                      {file}
                      {fileIndex < chain.chain.length - 1 && " → "}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>

        <ul className="space-y-2">
          {data.recommendations.map((recommendation, index) => (
            <li key={index} className="list-disc ml-5">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
