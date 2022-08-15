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

  const dt = new Date();
  const currentDay = dt.getDate();
  const currentMonth = dt.getMonth();
  const currentYear = dt.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  React.useEffect(() => {
    if (isSuccess && data.status === 200) {
      if (user.shouldSeeStatus) {
        setEyeClass("fa-regular fa-eye eye");
      } else {
        setEyeClass("fa-regular fa-eye-slash eye");
      }
      setShowStatus(user.shouldSeeStatus);

      const dayMeanSpent = Math.round(user.spent / daysInMonth || user.spent);
      const remainingDays = daysInMonth - currentDay + 1;
      const left = Math.round(user.saldo - remainingDays * dayMeanSpent);

      let status;

      if (left <= 0) {
        status = "danger";
      } else {
        const remaining = Math.round(user.saldo - left);
        const remainingPerc = Math.round((remaining / user.saldo) * 100);

        if (remainingPerc <= 20) {
          status = "warning";
        } else {
          status = "ok";
        }
      }

      if (status === "ok") {
        cuadroSaldo.current.className = "expense__priceBox successBox";
      } else if (status === "warning") {
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
