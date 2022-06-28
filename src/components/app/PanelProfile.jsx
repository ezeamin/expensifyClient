import React from "react";
import { getData } from "../../api/fetchingFunctions";
import Title from "../titles/Title";
import TabsSection from "./TabsSection";
import { useQuery } from "react-query";
import Loading from "../error and loading/Loading";
import Error from "../error and loading/Error";

const PanelProfile = () => {
  const cuadroSaldo = React.useRef();
  const [user, setUser] = React.useState({});

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(
    ["profile"],
    () => getData("/api/user"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setUser(data.data);
        }
      },
    }
  );

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

  if (isLoading || (isFetching && !user.name)) return <Loading />;
  if (isError || data.status !== 200) return <Error data={{data: {message: "Error de servidor"}}}/>;
  return (
    <>
      <div className="container">
        <Title type="profile" name={user.name} />
        <div className="expense__priceBox" ref={cuadroSaldo}>
          <p className="expense__priceBox__dollarSign">Saldo: ${user.saldo}</p>
          {user.saldo < 5000 ? (
            <div className="profile__totalBox__meme">
              <img src="/img/profile/this-is-fine.png" alt="this is fine" />
            </div>
          ) : null}
        </div>
      </div>
      <TabsSection page="profile" />
    </>
  );
};

export default PanelProfile;
