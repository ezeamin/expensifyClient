import React from "react";
import Title from "../titles/Title";
import TabsSection from "./TabsSection";

const PanelProfile = (props) => {
  const cuadroSaldo = React.useRef();

  React.useEffect(() => {
    //MODIFICAR VALORES SEGUN LIMITE MENSUAL
    if (props.info.saldo >= 25000) {
      cuadroSaldo.current.className = "expense__priceBox successBox";
    } else if (props.info.saldo >= 10000) {
      cuadroSaldo.current.className = "expense__priceBox warningBox";
    } else {
      cuadroSaldo.current.className = "expense__priceBox dangerBox";
    }
  }, [props.info.saldo]);

  return (
    <>
      <div className="container">
        <Title type="profile" name={props.user.name}/>
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
      </div>
      <TabsSection page="profile"/>
    </>
  );
};

export default PanelProfile;
