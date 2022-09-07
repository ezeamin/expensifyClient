import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteData } from "../../../../api/fetchingFunctions";
import "./debtItem.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DebtItem = (props) => {
  const { type, personId, debtId, title, account, price, description, date, name, total } = props;

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation(
    (info) => deleteData(`/api/debt/${type}/${personId}/${debtId}/${info.action}`),
    {
      onSuccess: (data) => {
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al eliminar la deuda",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Deuda eliminada, por fin...",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          }).then(() => {
            navigate("/accounts");
          });
        }
      },
      onError: (data) => {
        let msg = data.text();
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
      },
    }
  );

  const handleInfo = () => {
    setShowModal(true);
  };

  const handlePay = () => {
    Swal.fire({
      title: "Saldar deuda",
      html: `<p class="mb-0">Esta acción sumara <span class="fw-bold">$ ${price}</span> a tu cuenta <span class="fw-bold">${account}</span></p>`,
      icon: "warning",
      confirmButtonText: "Si, saldar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((action) => {
      if (!action.isConfirmed) return;

      mutate({
        action: "saldar"
      })
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Eliminar deuda",
      html: `<p class="mb-0">Esta acción eliminará la deuda <span class="fw-bold">SIN</span> sumar el valor en la cuenta de origen (${account})</p>`,
      icon: "warning",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#F66",
    }).then((action) => {
      if (!action.isConfirmed) return;

      mutate({
        action: "delete"
      })
    });
  };

  const handleEdit = () => {
    Swal.fire({
      title: "Proximamente",
      text: "Esta funcionalidad estará disponible próximamente",
      icon: "info",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  if (total)
    return (
      <div className="debtItem-container text-center">
        <p className="mb-0">
          Debe en total <span className="fw-bold">$ {total}</span>
        </p>
      </div>
    );

  return (
    <div className="debtItem-container">
      <div className="debtItem-text">
        <p className="mb-0">{title}</p>
        <p className="mb-0">
          desde <span className="fw-bold">{account}</span>
        </p>
        <p className="mb-0 fw-bold">$ {price}</p>
      </div>
      <div className="d-flex">
        <div className="debtItem-button" onClick={handleInfo}>
          <i className="fa-solid fa-info text-info"></i>
        </div>
        <div className="debtItem-button" onClick={handlePay}>
          <i className="fa-solid fa-dollar-sign text-success"></i>
        </div>
        <div className="debtItem-button" onClick={handleDelete}>
          <i className="fa-solid fa-trash text-danger"></i>
        </div>
      </div>
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        onClose={() => setShowModal(false)}
      >
        <DialogTitle>Deuda de {name}</DialogTitle>
        <DialogContent className="fw-bold">
          <p className="mb-0">{`Importe: $ ${price}`}</p>
          <p className="mb-0">{`Desde cuenta: ${account}`}</p>
          <hr />
          <p className="mb-0">{`Registro: ${date?.day} - ${date?.time}`}</p>
          <p className="mb-0">{`Notas: ${description || "N / A"}`}</p>
          <div className="text-end mt-2 me-0">
            <div className="debtItem-button ms-auto" onClick={handleEdit}>
              <i className="fa-solid fa-pencil text-warning"></i>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DebtItem;
