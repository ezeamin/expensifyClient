import React from "react";
import { useMutation } from "react-query";
import { putData } from "../../../api/fetchingFunctions";
import "./cuadroSaldo.css";

const CuadroSaldo = ({ isSuccess, data }) => {
  const cuadroSaldo = React.useRef();
  const user = data.data;

  const [showImg, setShow] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [eyeClass, setEyeClass] = React.useState("fa-regular fa-eye eye");

  React.useEffect(() => {
    if (isSuccess && data.status === 200) {
      if (user.shouldSeeStatus) {
        setEyeClass("fa-regular fa-eye eye");
      } else {
        setEyeClass("fa-regular fa-eye-slash eye");
      }
      setShowStatus(user.shouldSeeStatus);

      const available = user.generalLimit - user.spent;
      const status = Math.round((user.saldo * 100) / available || 0);

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

  const { mutate } = useMutation((info) => putData("/api/user/", info));

  const handleEye = () => {
    if (!showStatus) {
      setEyeClass("fa-regular fa-eye-slash eye");
    } else {
      setEyeClass("fa-regular fa-eye eye");
    }

    mutate({ shouldSeeStatus: !showStatus });
    setShowStatus(!showStatus);
  };

  return (
    <div className="expense__priceBox" ref={cuadroSaldo}>
      <i className={eyeClass} onClick={handleEye}></i>
      <p className="expense__priceBox__dollarSign">
        Saldo: ${showStatus ? user.saldo : " ***"}
      </p>
      {showImg && (
        <div className="profile__totalBox__meme">
          <img src="/img/profile/this-is-fine.png" alt="this is fine" />
        </div>
      )}
    </div>
  );
};

export default CuadroSaldo;
