import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid } from "@mui/material";
import Swal from "sweetalert2";
import getMonth from "../../../../helpers/getMonth";

const OldAccordion = ({ item, index }) => {
  const handleClick = () => {
    Swal.fire({
      title: "Proximamente",
      text: "Esta funcionalidad estará disponible próximamente",
      icon: "info",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  const perc = Math.round((item.spent / item.limit) * 100 || 0);
  const promDiario = Math.round(item.spent / item.days);

  const dt = new Date(item.start);
  const currentMonth = dt.getMonth();
  const month = getMonth(false,currentMonth);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${index}-header`}
        id={`panel-${index}-header`}
      >
        <Typography variant="h6">
          Periodo <span className="fw-bold">{month}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="paragraph" component="p">
          Dias totales: {item.days}
          <hr />
          Gastado: $ {item.spent}
          <br />
          Ingresos totales: $ {item.income}
          <br />
          Saldo restante: $ {item.balance}
          <br />
          Limite mensual: $ {item.limit} ({perc}%)
          <hr />
          Promedio diario: $ {promDiario}
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="paragraph" component="p" fontWeight={600}>
              Cuenta
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography variant="paragraph" component="p" fontWeight={600}>
              Gastado
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography variant="paragraph" component="p" fontWeight={600}>
              Saldo final
            </Typography>
          </Grid>
        </Grid>
        {item.accounts.length > 0 ? (
          item.accounts.map((acc, indexInner) => (
            <Grid container key={indexInner}>
              <Grid item xs={4}>
                <Typography variant="paragraph" component="p">
                  {acc.title}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Typography variant="paragraph" component="p">
                  $ {acc.spent}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Typography variant="paragraph" component="p">
                  {acc.noBalance ? "N / A" : `$ ${acc.balance}`}
                </Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="paragraph" component="p" textAlign="center">
            Sin datos
          </Typography>
        )}
        <hr />
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="paragraph" component="p" fontWeight={600}>
              Categoria
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography variant="paragraph" component="p" fontWeight={600}>
              Gastado
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography variant="paragraph" component="p" fontWeight={600}>
              Limite
            </Typography>
          </Grid>
        </Grid>
        {item.categories.length > 0 ? (
          item.categories.map((cat, indexInner) => (
            <Grid container key={indexInner}>
              <Grid item xs={4}>
                <Typography variant="paragraph" component="p">
                  {cat.title}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Typography variant="paragraph" component="p">
                  $ {cat.spent}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Typography variant="paragraph" component="p">
                  {cat.limit ? `$ ${cat.limit}` : "N / A"}
                </Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="paragraph" component="p" textAlign="center">
            Sin datos
          </Typography>
        )}
        <Button
          onClick={handleClick}
          fullWidth
          sx={{ marginTop: "1rem" }}
          variant="contained"
          color="primary"
        >
          Ver detalle
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default OldAccordion;
