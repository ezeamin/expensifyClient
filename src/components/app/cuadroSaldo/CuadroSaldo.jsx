import React from "react";

const CuadroSaldo = ({ isSuccess, data }) => {
  const cuadroSaldo = React.useRef();
  const user = data.data;
  const [show,setShow] = React.useState(false)

  React.useEffect(() => {
    if (isSuccess && data.status === 200) {

      const available = data.data.generalLimit - data.data.spent;
      const status = Math.round((data.data.saldo*100)/available || 0);

      if (status >= 50) {
        cuadroSaldo.current.className = "expense__priceBox successBox";
      } else if (status >= 25) {
        cuadroSaldo.current.className = "expense__priceBox warningBox";
      } else {
        cuadroSaldo.current.className = "expense__priceBox dangerBox";
        setShow(true);
      }
    }
  }, [user, isSuccess, data]);

  return (
    <div className="expense__priceBox" ref={cuadroSaldo}>
      <p className="expense__priceBox__dollarSign">Saldo: ${user.saldo}</p>
      {show && (
        <div className="profile__totalBox__meme">
          <img src="/img/profile/this-is-fine.png" alt="this is fine" />
        </div>
      )}
    </div>
  );
};

export default CuadroSaldo;
