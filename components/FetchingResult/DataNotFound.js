import React from 'react';
import { Box } from '@mui/material';

const DataNotFound = ({ title }) => {
  return (
    <Box
      style={{
        display: 'flex', justifyContent: "center", alignItems: "center", color: "red", height: 50
      }}>
      {title}
    </Box>
  );
};

export default DataNotFound;