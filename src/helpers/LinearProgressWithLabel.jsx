import { LinearProgress,Box } from "@mui/material";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <p className="mb-0" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</p>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
