import React from "react";

const ErrorMessage = ({ error }) => {
  return <p>Error: {error.message}</p>;
};

export default ErrorMessage;
