import React from "react";

const BackLink = (props) => {
  return (
    <div className="text-center">
      <button
        onClick={() => props.action(null)}
        className="profile__backButton"
      >
        Volver
      </button>
    </div>
  );
};

export default BackLink;
