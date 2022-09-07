import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import DebtItem from "./DebtItem";

const DebtAccordion = (props) => {
  const { name, debts, total, type, personId } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`panel-${name}-header`}
      >
        <Typography variant="h6" sx={{ fontFamily: "var(--font)" }}>
          Deudas de <span className="fw-bold">{name}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DebtItem total={total} />
        {debts.map((debt) => (
          <DebtItem
            key={debt.id}
            name={name}
            {...debt}
            type={type}
            debtId={debt.id}
            personId={personId}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default DebtAccordion;
