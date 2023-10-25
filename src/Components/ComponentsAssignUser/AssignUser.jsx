import { Box } from "@mui/material";
import React, { useState } from "react";
import ProfileWrapper from "../ComponentsQuizz/ProfileWrapper";
import { State } from "../Context/Provider"; 
import TotalUser from "./AssignUser/TotalUser";
import { Outlet } from "react-router-dom";
import { mainBoxStyle, sideDetail } from "../../styles/style";
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
  
  const AssignUser = ({
  
  }) => {
    
    
    const { quest } = State();
    return (
      <Box
      style={style.dflex}
      sx={ mainBoxStyle.first
      }
    >
      <Box
        sx={mainBoxStyle.second}
      >
           <ProfileWrapper pageName='Assign User'  /> {/* // add props for menu name */}
           <Outlet></Outlet>

        </Box>
        {/* preview question section */}
  
        <Box
          sx={sideDetail.first}
        >
  
          <TotalUser />
  
               
        </Box>
      </Box>
    );
  };
  
  export default AssignUser;
  