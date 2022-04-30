import React from "react";
import Box from "../../../components/app/resumen/box/Box";
import "./error404.css";

const Error404 = () => {
  return (
    <div className="container error404">
      <Box className="w-100">
        <h1 className="text-center fw-bold">404</h1>
        <p className="text-center">Page not found</p>
        <a href="/" className="btn btn-secondary">
          Back
        </a>
      </Box>
    </div>
  );
};

export default Error404;
