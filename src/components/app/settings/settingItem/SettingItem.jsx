import React from "react";

const SettingItem = (props) => {
  return (
    <button
      onClick={()=>props.onclick(props.index)}
      className="profile__resumen__detalle profile__settingGroup py-3"
    >
      <p className="mb-0">{props.title}</p>
      <i className="fa-solid fa-angle-right"></i>
    </button>
  );
};

export default SettingItem;
