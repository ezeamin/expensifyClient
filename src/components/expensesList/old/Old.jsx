import React from "react";
import Navegation from "../../navegation/Navegation";
import "./old.css";
import Title from "../../titles/Title";
import OldAccordions from "./oldAccordions/OldAccordion";
import BackButton from "../../backButton/BackButton";
import { useQuery } from "react-query";
import { getData } from "../../../api/fetchingFunctions";
import Loading from "../../error and loading/Loading";

const Old = () => {
  const [list, setList] = React.useState([]);

  const { isLoading, isError } = useQuery(
    ["categoriesChart"],
    () => getData("/api/periods"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          console.log(data.data);
          setList(data.data.periods);
        }
      },
    }
  );

  return (
    <>
      <div className="container position-relative">
        <Navegation />
        <BackButton rightSmall />
        <Title text="Periodos" />
        {isLoading ? (
          <Loading little />
        ) : (
          <div className="listContainer--long">
            {list.map((item, index) => (
              <OldAccordions key={index} index={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Old;
