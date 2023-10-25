import {  Box,} from "@mui/material";
import React, { useState } from "react";
import Questions from "./Questions";
import ProfileWrapper from "../ProfileWrapper";
import LanguageAndDotMenu from "../LanguageAndDotMenu";
import SelectContainer from "./SelectContainer";
import SideDetails from "../SideDetails";
import QuestionMultipleAns from "./QuestionMultipleAns";
import QuestionTrueFalse from "./QuestionTrueFalse";
import { State } from "../../Context/Provider";
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

const CreateQuiz = ({

}) => {
  
  
  const { quest } = State();
  return (
    <Box style={style.dflex} sx={ mainBoxStyle.first }>
      <Box
        sx={mainBoxStyle.second}
      >
         <ProfileWrapper pageName='Create Quiz'  /> {/* // add props for menu name */}
          <Box>
            <LanguageAndDotMenu  />
              <Box>
                <SelectContainer />
                {quest.Quiz_Type === "" ? (
                  <Questions  />
                ) : quest.Quiz_Type === "Multiple choice - multiple answers" ? (
                  <QuestionMultipleAns
                  />
                ) : quest.Quiz_Type === "True or False" ? (
                  <QuestionTrueFalse prop={["True", "False"]} />
                ) : quest.Quiz_Type === "Multiple choice - Single answer" ? (
                  <Questions />
                ) : quest.Quiz_Type === "Yes or No" ? (
                  <QuestionTrueFalse
                    prop={["Yes", "No"]}
                  />
                ) : null}
              </Box>
          </Box>
      </Box>


      {/* preview question section */}

      <Box sx={sideDetail.first}>
        <SideDetails heading='Total Quiz'  />
      </Box>
    </Box>
  );
};

export default CreateQuiz;
