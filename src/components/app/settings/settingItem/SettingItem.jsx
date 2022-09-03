import React from "react";

const SettingItem = (props) => {
  let name = "profile__resumen__detalle profile__settingGroup py-3";

  if (props.danger) name += " profile__settingGroup--danger";
  return (
    <button onClick={() => props.onclick(props.index)} className={name}>
      <p className="mb-0">{props.title}</p>
      <i className="fa-solid fa-angle-right"></i>
    </button>
  );
};

export default SettingItem;
