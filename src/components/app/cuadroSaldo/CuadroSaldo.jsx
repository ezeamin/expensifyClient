import React from "react";

const CuadroSaldo = ({ isSuccess, data }) => {
  const cuadroSaldo = React.useRef();
  const user = data.data;

  React.useEffect(() => {
    //MODIFICAR VALORES SEGUN LIMITE MENSUAL
    if (isSuccess && data.status === 200) {
      if (user.saldo >= 15000) {
        cuadroSaldo.current.className = "expense__priceBox successBox";
      } else if (user.saldo >= 5000) {
        cuadroSaldo.current.className = "expense__priceBox warningBox";
      } else {
        cuadroSaldo.current.className = "expense__priceBox dangerBox";
      }
    }
  }, [user, isSuccess, data]);

  return (
    <div className="expense__priceBox" ref={cuadroSaldo}>
      <p className="expense__priceBox__dollarSign">Saldo: ${user.saldo}</p>
      {user.saldo < 5000 ? (
        <div className="profile__totalBox__meme">
          <img src="/img/profile/this-is-fine.png" alt="this is fine" />
        </div>
      ) : null}
    </div>
  );
};

export default CuadroSaldo;
