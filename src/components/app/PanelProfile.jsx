import React from "react";
import TabsSection from "./TabsSection";

const PanelProfile = (props) => {
  const cuadroSaldo = React.useRef();

  React.useEffect(() => {
    //MODIFICAR VALORES SEGUN LIMITE MENSUAL
    if (props.info.saldo >= 25000) {
      cuadroSaldo.current.className =
        "expense__priceBox profile__totalBox--success";
    } else if (props.info.saldo >= 10000) {
      cuadroSaldo.current.className =
        "expense__priceBox profile__totalBox--warning";
    } else {
      cuadroSaldo.current.className = "expense__priceBox";
    }
  }, [props.info.saldo]);

  return (
    <div className="container">
      <h1 className="profile__heading">
        Hola, <span className="fw-bold">{props.user.name}</span>
      </h1>
      <hr className="text-light" />
      <div className="expense__priceBox" ref={cuadroSaldo}>
        <p className="expense__priceBox__dollarSign">
          Saldo: ${props.info.saldo}
        </p>
        {props.info.saldo < 10000 ? (
          <div className="profile__totalBox__meme">
            <img src="/img/profile/this-is-fine.png" alt="this is fine" />
          </div>
        ) : null}
      </div>
      <TabsSection />
    </div>
  );
};

export default PanelProfile;
