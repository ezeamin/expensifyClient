import React from 'react';
import { deleteDirectLogout, getData } from '../../api/fetchingFunctions';
import Title from '../titles/Title';
import TabsSection from './TabsSection';
import { useQuery } from 'react-query';
import Loading from '../error and loading/Loading';
import Error from '../error and loading/Error';
import CuadroSaldo from './cuadroSaldo/CuadroSaldo';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Alert } from '@mui/material';

const PanelProfile = () => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  const auth = useAuth();

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(
    ['profile'],
    () => getData('/api/user'),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setUser(data.data);
        } else if (data.status === 403) {
          deleteDirectLogout(auth.setAuth, navigate);
        }
      },
    }
  );

  const { data: dataDollar, isError: isErrorDollar } = useQuery(
    ['dollar'],
    () => getData('https://api.bluelytics.com.ar/v2/latest')
  );

  if (isLoading || (isFetching && !user.name)) return <Loading />;
  if (isError || data.status !== 200)
    return <Error data={{ data: { message: 'Error de servidor' } }} />;
  return (
    <>
      <div className='container'>
        <Title type='profile' name={user.name} />
        <CuadroSaldo
          isSuccess={isSuccess}
          data={data}
          dataDollar={dataDollar}
          isErrorDollar={isErrorDollar}
        />
        {data?.data?.totalOtherDebt ? (
          <Alert severity='error' className='fw-bold'>
            Te deben $ {data.data.totalOtherDebt}
          </Alert>
        ) : null}
      </div>
      <TabsSection
        page='profile'
        balance={data.data.saldo}
        hasDebts={data?.data?.totalOtherDebt}
      />
    </>
  );
};

export default PanelProfile;
