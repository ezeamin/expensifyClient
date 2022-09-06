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
  const { name, debts } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`panel-${name}-header`}
      >
        <Typography variant="h6">
          Deudas de <span className="fw-bold">{name}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {debts.map((debt) => (
          <DebtItem {...debt} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default DebtAccordion;
