import React from "react";

const Title = (props) => {
  if (props.type === "profile")
    return (
      <div>
        <h1 className="profile__heading">Hola, <span className="fw-bold">{props.name}</span></h1>
        <hr className="text-light" />
      </div>
    );

  return (
    <div>
      <h1 className="profile__heading fw-bold">{props.text}</h1>
      <hr className="text-light" />
    </div>
  );
};

export default Title;
