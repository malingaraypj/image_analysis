import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const errorMessage = location.state?.message || "An unknown error occurred";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-lg text-gray-700">{errorMessage}</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
}
