/* eslint-disable */
import {Avatar,Box,FormControl,FormGroup,InputLabel,Menu,MenuItem,Select,Typography,Button,} from "@mui/material";
  import React, { useState } from "react";
  import ProfileWrapper from "../../ComponentsQuizz/ProfileWrapper";
  import { State } from "../../Context/Provider"; 

import PreviewExamQuestions from "./PreviewExamQuestions";
import SideDetailsPreviewPage from "./SideDetailsPreviewPage";
import { mainBoxStyle, sideDetail } from "../../../styles/style";

  const style = {
    dflex: {
      display: "flex",
    },
    bellIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  
  const PreviewExam = () => {
    const { quest } = State();
    
    return (
      <Box
        style={style.dflex}
        sx={mainBoxStyle.first}
      >
        <Box
          sx={mainBoxStyle.second}
        >
           <ProfileWrapper pageName='Exam Preview'  /> {/* // add props for menu name */}
            <Box sx={{pt:'30px'}}>
             <PreviewExamQuestions />
            </Box>
        {/* preview Exam section */}
  
        </Box>
        <Box
          sx={sideDetail.first}
        >
  
          <SideDetailsPreviewPage heading='Total Exam' />
  
  
             </Box>  
      </Box>
    );
  };
  
  export default PreviewExam;
  