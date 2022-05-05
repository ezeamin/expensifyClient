import React from "react";
import EnConstruccion from "../../temp/EnConstruccion";
import Navegation from "../../navegation/Navegation";
import './old.css'

const Old = () => {
  return (
    <div>
      <Navegation />
      <div className="container inConstruction--old">
        <EnConstruccion />
      </div>
    </div>
  );
};

export default Old;
