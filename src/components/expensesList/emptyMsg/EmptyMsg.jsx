import React from "react";

const EmptyMsg = (props) => {
  switch (props.type) {
    case "expense":
      return (
        <div className="w-100 text-center mt-4">
          <h3 className="mb-1 fw-bold">Sin datos :(</h3>
          <p>✨ ¡Cargá tu primer gasto! ✨</p>
        </div>
      );
    case "income":
      return (
        <div className="w-100 text-center mt-4">
          <h3 className="mb-1 fw-bold">Sin datos :(</h3>
          <p>✨ ¡Cargá tu primer ingreso! ✨</p>
        </div>
      );
    case "transfer":
      return (
        <div className="w-100 text-center mt-4">
          <h3 className="mb-1 fw-bold">Sin datos :(</h3>
          <p>✨ ¡Cargá tu primera transferencia! ✨</p>
        </div>
      );
    default:
      return null;
  }
};

export default EmptyMsg;
