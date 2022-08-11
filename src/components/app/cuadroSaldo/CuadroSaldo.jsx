import React from "react";
import "./cuadroSaldo.css"

const CuadroSaldo = ({ isSuccess, data }) => {
  const cuadroSaldo = React.useRef();
  const user = data.data;
  const [showImg,setShow] = React.useState(false);
  const [showStatus,setShowStatus] = React.useState(true)
  const [eyeClass,setEyeClass] = React.useState("fa-regular fa-eye-slash eye")

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

  const handleEye = ()=>{
    if(!showStatus){
      setEyeClass("fa-regular fa-eye-slash eye")
    } else{
      setEyeClass("fa-regular fa-eye eye")
    }

    setShowStatus(!showStatus);
  }

  return (
    <div className="expense__priceBox" ref={cuadroSaldo}>
      <i className={eyeClass} onClick={handleEye}></i>
      <p className="expense__priceBox__dollarSign">Saldo: ${showStatus ? user.saldo : " ***"}</p>
      {showImg && (
        <div className="profile__totalBox__meme">
          <img src="/img/profile/this-is-fine.png" alt="this is fine" />
        </div>
      )}
    </div>
  );
};

export default CuadroSaldo;
