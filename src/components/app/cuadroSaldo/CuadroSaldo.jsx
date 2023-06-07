import React from 'react';
import { useMutation } from 'react-query';
import { putData } from '../../../api/fetchingFunctions';
import { formatNumber } from '../../../helpers/formatNumber';
import './cuadroSaldo.css';

const CuadroSaldo = ({ isSuccess, data, dataDollar, isErrorDollar }) => {
  const cuadroSaldo = React.useRef();
  const user = data.data;
  const dollarValue = dataDollar?.data?.blue?.value_buy || 0;
  const dollarValueSell = dataDollar?.data?.blue?.value_sell || 0;

  const [showImg, setShow] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [eyeClass, setEyeClass] = React.useState('fa-regular fa-eye eye');
  const [totalBalance, setTotalBalance] = React.useState(0);

  const dt = new Date();
  const currentDay = dt.getDate();
  const currentMonth = dt.getMonth();
  const currentYear = dt.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  React.useEffect(() => {
    if (isSuccess && data.status === 200) {
      if (user.shouldSeeStatus) {
        setEyeClass('fa-regular fa-eye eye');
      } else {
        setEyeClass('fa-regular fa-eye-slash eye');
      }
      setShowStatus(user.shouldSeeStatus);

      const dayMeanSpent = Math.round(user.spent / daysInMonth || user.spent);
      const remainingDays = daysInMonth - currentDay + 1;
      const left = Math.round(user.saldo - remainingDays * dayMeanSpent);

      if (dollarValue) {
        setTotalBalance(formatNumber(Math.round(user.dollars * dollarValue)));
      }

      let status;

      if (left <= 0) {
        status = 'danger';
      } else {
        // const remaining = Math.round(user.saldo - left);
        const remainingPerc = Math.round((left / user.saldo) * 100);

        if (remainingPerc <= 20) {
          status = 'warning';
        } else {
          status = 'ok';
        }
      }

      if (status === 'ok') {
        cuadroSaldo.current.className = 'expense__priceBox successBox';
      } else if (status === 'warning') {
        cuadroSaldo.current.className = 'expense__priceBox warningBox';
      } else {
        cuadroSaldo.current.className = 'expense__priceBox dangerBox';
        setShow(true);
      }
    }
  }, [user, isSuccess, data, dollarValue]);

  const { mutate } = useMutation((info) =>
    putData('/api/user/seeStatus', info)
  );

  const handleEye = () => {
    if (!showStatus) {
      setEyeClass('fa-regular fa-eye-slash eye');
    } else {
      setEyeClass('fa-regular fa-eye eye');
    }

    mutate({ shouldSeeStatus: !showStatus });
    setShowStatus(!showStatus);
  };

  return (
    <div className='expense__priceBox' ref={cuadroSaldo}>
      <i className={eyeClass} onClick={handleEye}></i>
      <div style={{ textAlign: 'center' }}>
        <p
          className={`expense__priceBox__dollarSign ${
            totalBalance === 0 ? 'expense__priceBox__dollarSign__unique' : ''
          }`}
        >
          Saldo: ${showStatus ? formatNumber(user.saldo) : ' ***'}
        </p>
        {totalBalance !== 0 && !isErrorDollar && (
          <p className='mb-0' style={{ lineHeight: '0.75rem', color: 'white' }}>
            Ahorro: U$S{' '}
            <span style={{ fontWeight: 'bold' }}>
              ${showStatus ? formatNumber(user.dollars) : ' ***'}
            </span>{' '}
            -{'>'} ARS{' '}
            <span style={{ fontWeight: 'bold' }}>
              ${showStatus ? totalBalance : ' ***'}
            </span>
          </p>
        )}
        {totalBalance !== 0 && !isErrorDollar && (
          <p
            className='mb-0'
            style={{
              lineHeight: '0.75rem',
              color: 'white',
              marginTop: '0.65rem',
            }}
          >
            Dolar B hoy (C-V): ${dollarValue} - ${dollarValueSell}
          </p>
        )}
      </div>
      {showImg && (
        <div className='profile__totalBox__meme'>
          <img src='/img/profile/this-is-fine.png' alt='this is fine' />
        </div>
      )}
    </div>
  );
};

export default CuadroSaldo;
