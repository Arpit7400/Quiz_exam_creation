/* eslint-disable */
import React, { useState, useEffect } from "react";
import AccordianAdd from "./AccordianAdd";
import { Box, TextField } from "@mui/material";
import { State } from "../../Context/Provider";
const SubjectsAccordian = ({ toggleMenu, close }) => {
  const { subjects } = State();
  return (
    <Box>
      <Box sx={{ backgroundColor: "#fff",p: "0px 48px",borderRadius: "12px",mt: "32px",fontWeight: "700",}}>
        {subjects.map((data, i) => {
          const { subject, topics } = data;

          return <AccordianAdd key={i} subject={subject} topics={topics} />;
        })}
      </Box>
    </Box>
  );
};

export default SubjectsAccordian;
