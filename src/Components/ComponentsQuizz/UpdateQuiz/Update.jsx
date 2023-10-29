import {Box,} from "@mui/material";
import React, { useState,useEffect } from "react";
import UnstyledSelectObjectValues from "../CreateQuiz/UnstyledSelectObjectValues";

import Questions from "./Questions";
import AddDetails from "../AddSubject/AddDetails";
import ProfileWrapper from "../ProfileWrapper";
import SelectContainer from "../CreateQuiz/SelectContainer";
import { State } from "../../Context/Provider";
import QuestionMultipleAnsUpdate from "./QuestionMultipleAnsUpdate";
import QuestionTrueFalseUpdate from "./QuestionTrueFalseUpdate";
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

const UpdateQuiz = () => {
  const {quest, openPage} = State();


  return (
    <Box
      style={style.dflex}
      sx={mainBoxStyle.first}
    >
      <Box
        sx={mainBoxStyle.second}
      >
        <ProfileWrapper pageName='Update Quiz'  />
        
          <Box>
              <Box sx={{
                  width: {
                    xs: "60%",
                    sm: "50%",
                    md: "50%" 
                  },
                  mt:'20px'
                }}>
                <UnstyledSelectObjectValues
                  dropdownName={"Language"}
                    listArray={["Hindi", "English", "Urdu"]}
                    val={quest.Language}
                  add={true}
                />
              </Box>
              <Box>
                <SelectContainer />
                <Box>
                {quest.Quiz_Type === "" ? (
                  <Questions  />
                ) : quest.Quiz_Type === "multiple" ? (
                  <QuestionMultipleAnsUpdate
                  />
                ) : quest.Quiz_Type === "truefalse" ? (
                  <QuestionTrueFalseUpdate prop={["True", "False"]} />
                ) : quest.Quiz_Type === "single" ? (
                  <Questions />
                ) : quest.Quiz_Type === "Yes or No" ? (
                  <QuestionTrueFalseUpdate
                    prop={["Yes", "No"]}
                  />
                ) : null}
              </Box>
              </Box>
            
          </Box>
      </Box>

      <Box
        sx={sideDetail.first}
      >
     
      <AddDetails />
      </Box>
    </Box>
  );
};

export default UpdateQuiz;
