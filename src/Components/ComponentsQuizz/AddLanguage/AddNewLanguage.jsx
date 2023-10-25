import {    Box  } from "@mui/material";
  import React, { useState } from "react";
  import ProfileWrapper from "../ProfileWrapper";
  import LanguageAndDotMenu from "../LanguageAndDotMenu";
  import AddDetailsWithBth from './AddDetailsWithBth'
  import SideDetails from "../SideDetails";
  import { State } from "../../Context/Provider";
  import SubjectsAccordian from "../AddSubject/SbujectsAccordian";
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
      sx={mainBoxStyle.first}
    >
      <Box
        sx={mainBoxStyle.second}
      >
           <ProfileWrapper pageName={"Add Language"}  /> {/* // add props for menu name */}
            <Box>
              <LanguageAndDotMenu   />
                <SubjectsAccordian />
            </Box>
        </Box>
        {/* preview question section */}
  
        <Box
          sx={sideDetail.first}
        >
  
          <AddDetailsWithBth />
  
               
        </Box>
      </Box>
    );
  };
  
  export default AddNewSubject;
  