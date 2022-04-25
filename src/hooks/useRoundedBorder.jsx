import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  round: {
    [`& fieldset`]: {
      borderRadius: "12px",
    },
  },
}));

const useRoundedBorder = () => {
    const classes = useStyles();

    return classes;
};

export default useRoundedBorder;