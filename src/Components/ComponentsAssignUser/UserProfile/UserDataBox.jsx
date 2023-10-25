import React from "react";
import { Box, Typography } from "@mui/material";

const UserDataBox = ({name, number}) => {
  return (
    <Box
      sx={{
        mb:'18px',
        pb: "12px",
        pt: "17px",
        width:{
            lg:'180px',
            xs:'150px',
        },
        background: "#fff",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Typography
        sx={{ fontSize: "12px", color: "#707070", fontFamily: "Poppins" }}
      >
        {name}
      </Typography>
      <Typography
        sx={{ fontSize: "35px", color: "#707070", fontFamily: "Poppins" }}
      >
        {number}
      </Typography>
    </Box>
  );
};

export default UserDataBox;
