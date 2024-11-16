import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.message || "Something went wrong, please try again later."}</p>
    </div>
  );
};

export default ErrorPage;
