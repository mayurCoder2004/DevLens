const ChangedFilesCard = ({ files }) => {
  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">
        Changed Files
      </h3>

      {files.length === 0 ? (
        <p className="text-gray-500">
          No changed files found.
        </p>
      ) : (
        <div className="space-y-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800 break-all">
                  📄 {file.filename}
                </p>

                <p className="mt-1 text-sm text-gray-500 capitalize">
                  {file.status}
                </p>
              </div>

              <div className="flex gap-6 text-sm">
                <span className="font-semibold text-green-600">
                  +{file.additions}
                </span>

                <span className="font-semibold text-red-600">
                  -{file.deletions}
                </span>

                <span className="text-gray-500">
                  {file.changes} changes
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangedFilesCard;