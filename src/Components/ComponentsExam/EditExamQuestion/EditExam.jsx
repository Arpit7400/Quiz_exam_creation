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
import { useParams } from "react-router-dom";
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
  
  const EditExam = () => {
    const {topic_id} = useParams()
    // console.log("Topic ID Exam " + topic_id)
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
  .post(`http://localhost:5000/update_topic/${topic_id}`, formData)
      .then((response) => {
        if (response.status === 202) {
          // SetExams(oldArray => [response.data, ...oldArray])
          // setexamid({id:response.data._id,qno:1})
          console.log("Data added successfully");
          console.log(response)
        } else {
          alert("Error occured");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
    
    return (
      <Box
      style={style.dflex}
      sx={ mainBoxStyle.first
      }
    >
      <Box
        sx={mainBoxStyle.second}
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
                      Update Exam
                    </Button>
                </Box>
                <QueContainerEdit topic_id={topic_id} />
                  <Box sx={{width:'50%', mt:'30px', mb:'30px'}}>
                <SelectMenuExam dropdownName={"Quiz Type"} listArray={["Multiple choice - Single answer", "Multiple choice - multiple answers", "Yes or No", "True or False"]} add={false} value={"Quiz_Type"} val={exam.Quiz_Type}/>

                </Box>
                {exam.Quiz_Type === "" ? (
                  <QuestionsExam doit={true} />
                ) : exam.Quiz_Type === "Multiple choice - multiple answers" ? (
                  <QuestionMultipleAnsExam doit={true}
                  />
                ) : exam.Quiz_Type === "True or False" ? (
                  <QuestionTrueFalseExam prop={["True", "False"]} doit={true}/>
                ) : exam.Quiz_Type === "Multiple choice - Single answer" ? (
                  <QuestionsExam doit={true}/>
                ) : exam.Quiz_Type === "Yes or No" ? (
                  <QuestionTrueFalseExam doit={true}
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
  
          <SideDetailsEditExam heading='Total Exam' />
  
  
             </Box>  
      </Box>
    );
  };
  
  export default EditExam;
  