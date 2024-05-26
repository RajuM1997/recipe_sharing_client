import { Box, CircularProgress } from "@mui/material";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <Box sx={{ display: "flex", marginLeft: "16px" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loader;
