import React from "react";

const AuthTitle = (props) => {
  return (
    <div>
      <h1 className="mb-0 auth__welcomeText fw-bold">{props.title}</h1>
      {props.showDescription && <p className="my-0">Por favor, ingresa tus datos</p>}
      <hr className="mt-1 text-dark" />
    </div>
  );
};

export default AuthTitle;
