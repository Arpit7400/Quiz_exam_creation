import {Avatar,Box,FormControl,FormGroup,InputLabel,Menu,MenuItem,Select,Typography,Button,} from "@mui/material";
  import React, { useState } from "react";
  import ProfileWrapper from "../../ComponentsQuizz/ProfileWrapper"; 
  import { State } from "../../Context/Provider"; 
import SideDetailsEditExam from "./SideDetailsEditExam";
import EditQuestionsExam from "./EditQuestionsExam";
import axios from "axios";
import LanguageAndDotMenuExam from "../LanguageAndDotMenuExam";
import SelectContainerExam from "../AddQuestionExam/SelectContainerExam";
import Instructions from "../AddExam/Instructions";
import QuestionsExam from "../AddQuestionExam/QuestionsExam";
import QuestionMultipleAnsExam from "../AddQuestionExam/QuestionMultipleAnsExam";
import QuestionTrueFalseExam from "../AddQuestionExam/QuestionTrueFalseExam";
import QuestionsContainer from "../UpdateTopicQuestion/QuestionsContainer";
import SelectMenuExam from "../AddQuestionExam/SelectMenuExam";
import QueContainerEdit from "./QueContainerEdit";

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
  
  const EditExam = () => {
    const { quest } = State();
    const { exam, SetExams ,setexamid,examquest} = State();
    const {instruction, eligiblity, learning} = State()
    // console.log(Exams)
    const handlePostQuestion = () => {
    // console.log(exam)
     const formData = new FormData();
    formData.append('subject', exam.Subject); 
    formData.append('topic_class', exam.Class); 
    formData.append('topic_name', exam.Topic); 
    formData.append('level', exam.Level); 
    formData.append('no_of_questions', exam.perquest); 
    formData.append('assigned_time', exam.assigned_time); 
    formData.append('instruction', instruction); 
    formData.append('learning', learning); 
    formData.append('eligiblity', eligiblity); 

    axios
  .post("http://localhost:5000/create_topic", formData)
      .then((response) => {
        if (response.status === 201) {
          SetExams(oldArray => [response.data, ...oldArray])
          setexamid({id:response.data._id,qno:1})
          console.log("Data added successfully");
        } else {
          alert("Error occured");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  
    
    return (
      <Box
        style={style.dflex}
        sx={{
          width: {
            md: "79%",
            lg: "85%",
          },
          minHeight: "100dvh",
          background: "#F5F6F7",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "63%",
              lg: "65%",
              xl: "69%",
            },
            px: "40px",
            pt: "38px",
          }}
        >
           <ProfileWrapper pageName='Edit Exam'  /> {/* // add props for menu name */}
            <Box>
           
            <Box>
            <LanguageAndDotMenuExam  />
              <Box>
                <SelectContainerExam />
                <Instructions />
                <Box sx={{display:'flex', width:"100%", mt:'56px', mb:'91px', justifyContent:'center'}}>
                    <Button variant="contained" onClick={()=>{
                      handlePostQuestion()
                    }} 
                      color="primary"
                      sx={{
                          width: "375px",
                          borderRadius: "12px",
                          background: "#7A58E6",
                          cursor: "pointer",
                          border: "none",
                          color: "#FFF",
                          fontSize: "18px",
                          fontWeight: "500",
                          textTransform: "capitalize",
                          p: "10px 10px",
                          "&:hover": {
                            background: "#7A58E6",
                          },
                        }}
                    >
                      Create Exam
                    </Button>
              </Box>
                  <Box sx={{width:'50%', mt:'30px', mb:'30px'}}>
                <SelectMenuExam dropdownName={"Quiz Type"} listArray={["Multiple choice - Single answer", "Multiple choice - multiple answers", "Yes or No", "True or False"]} add={false} value={"Quiz_Type"} val={exam.Quiz_Type}/>

                </Box>
                {exam.Quiz_Type === "" ? (
                  <QuestionsExam  />
                ) : exam.Quiz_Type === "Multiple choice - multiple answers" ? (
                  <QuestionMultipleAnsExam
                  />
                ) : exam.Quiz_Type === "True or False" ? (
                  <QuestionTrueFalseExam prop={["True", "False"]} />
                ) : exam.Quiz_Type === "Multiple choice - Single answer" ? (
                  <QuestionsExam />
                ) : exam.Quiz_Type === "Yes or No" ? (
                  <QuestionTrueFalseExam
                    prop={["Yes", "No"]}
                  />
            ) : null}
            

               <QueContainerEdit />
              </Box>
          </Box>
            </Box>
       
  
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "37%",
              lg: "35%",
              xl: "31%",
            },
            background: "#fff",
            p: "38px 32px",
          }}
        >
  
          <SideDetailsEditExam heading='Total Exam' />
  
  
             </Box>  
      </Box>
    );
  };
  
  export default EditExam;
  