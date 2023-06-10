import { useStateContext } from "@/context/ContextProvider";
import { Box, CircularProgress } from "@mui/material";

const DataLoading = () => {
  const { currentColor } = useStateContext();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        style={{
          color: currentColor,
        }}
      />
    </Box>
  );
};

export default DataLoading;
