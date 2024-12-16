import { useRouteError } from "react-router-dom";
import React from "react";

const ErrorPage = () => {
  const error = useRouteError();

  console.log(error.data.message);
  const errorMessage = error
    ? error.data.message
    : "Something went wrong, please try again.";

  return (
    <div className="h-screen flex justify-center items-center bg-red-100 text-center">
      <div className="bg-white p-6 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-red-600">Error Occurred</h1>
        <p className="text-lg text-gray-800 mt-2">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
