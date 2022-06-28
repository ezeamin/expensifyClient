import React from "react";
import EnConstruccion from "../../temp/EnConstruccion";
import Navegation from "../../navegation/Navegation";
import './old.css'
import BackButton from "../../backButton/BackButton";

const Old = () => {
  return (
    <div>
      <Navegation />
      <div className="container inConstruction--old">
        <BackButton />
        <EnConstruccion />
      </div>
    </div>
  );
};

export default Old;
