import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "../../../components/app/resumen/box/Box";
import "./error404.css";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="container error404">
      <Box className="w-100">
        <h1 className="text-center fw-bold">404</h1>
        <p className="text-center">Página no encontrada</p>
        <div onClick={()=>navigate(-1)} className="btn btn-secondary">
          Volver
        </div>
      </Box>
    </div>
  );
};

export default Error404;
