import React from "react";

const ErrorMsg = (props) => {
  return (
    <div className="w-100 text-center mt-4">
      <h3 className="mb-1 fw-bold">Error :(</h3>
      <p>✨ {props.errorMsg} ✨</p>
    </div>
  );
};

export default ErrorMsg;
