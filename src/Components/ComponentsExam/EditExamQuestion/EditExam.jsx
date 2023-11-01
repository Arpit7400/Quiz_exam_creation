/* eslint-disable */
import {Avatar,Box,FormControl,FormGroup,InputLabel,Menu,MenuItem,Select,Typography,Button,} from "@mui/material";
  import React, { useState } from "react";
  import ProfileWrapper from "../../ComponentsQuizz/ProfileWrapper"; 
  import { State } from "../../Context/Provider"; 
import SideDetailsEditExam from "./SideDetailsEditExam";
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
// import {Button} from "@mui/material";
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
    const { topic_id } = useParams()
    
    // console.log("Topic ID Exam " + topic_id)
    const { quest } = State();
    const { exam, SetExams ,setexamid,examquest,link} = State();
    const {instruction, eligiblity, learning,btn, setbtn} = State()
    // console.log(Exams)
    const Submitexam =async () => {
    try {
      
        const { data } = await axios.get(`${link}/enable_disable_exam/${topic_id}`)
        setbtn(data)
        console.log(data)
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    const handlePostQuestion = () => {
    // console.log(exam)
    let assigntime = parseInt(exam.assigned_time.slice(0,3))
    let perquesttime = parseInt(exam.perquest.slice(0,1))
     const formData = new FormData();
    formData.append('subject', exam.Subject); 
    formData.append('topic_class', exam.Class); 
    formData.append('topic_name', exam.Topic); 
      formData.append('level', exam.Level);
    formData.append('language', exam.Language);  
    formData.append('time_per_question', perquesttime); 
    formData.append('assigned_time', assigntime); 
    formData.append('instruction', instruction); 
    formData.append('learning', learning); 
    formData.append('eligiblity', eligiblity); 

    axios
  .post(`${link}/update_topic/${topic_id}`, formData)
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
                <SelectMenuExam dropdownName={"Exam Question Type"} listArray={["Multiple choice - Single answer", "Multiple choice - multiple answers", "Yes or No", "True or False"]} add={false} value={"Quiz_Type"} val={exam.Quiz_Type}/>

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
            
            <Box sx={{display:'flex', width:"100%", mt:'56px', mb:'91px', justifyContent:'center'}}>
                    <Button variant="contained"  onClick={()=>{
                      Submitexam()
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
                      {btn}
                    </Button>
            </Box>
                
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
  