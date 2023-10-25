import {    Box,  } from "@mui/material";
  import React, { useState } from "react";
  import ProfileWrapper from "../ProfileWrapper";
  import LanguageAndDotMenu from "../LanguageAndDotMenu";
  import { State } from "../../Context/Provider";
import SubjectsAccordian from "./SbujectsAccordian";
import AddDetails from "./AddDetails";
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
  
  const AddNewSubject = ({
  
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
           <ProfileWrapper pageName={"Create Subject"}  /> {/* // add props for menu name */}
            <Box>
              <LanguageAndDotMenu  />
                <SubjectsAccordian />
            </Box>
        </Box>
        {/* preview question section */}
  
        <Box
          sx={sideDetail.first}
        >
  
          <AddDetails />
  
               
        </Box>
      </Box>
    );
  };
  
  export default AddNewSubject;
  