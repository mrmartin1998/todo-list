"use client";

const ErrorPage = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-black">Error</h1>
        <p className="text-black">{error}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
