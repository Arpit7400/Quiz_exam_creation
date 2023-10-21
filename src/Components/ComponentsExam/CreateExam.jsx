import {  Box,  Button,} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuestionsExam from "./AddQuestionExam/QuestionsExam";
import ProfileWrapper from "../ComponentsQuizz/ProfileWrapper";
import LanguageAndDotMenuExam from "./LanguageAndDotMenuExam";
import SelectContainerExam from "./AddQuestionExam/SelectContainerExam";
import SideDetailsExam from "./SideDetailsExam";
import QuestionMultipleAnsExam from "./AddQuestionExam/QuestionMultipleAnsExam";
import QuestionTrueFalseExam from "./AddQuestionExam/QuestionTrueFalseExam";
import Instructions from './AddExam/Instructions'
import { State } from "../Context/Provider";
import axios from "axios";
import SelectMenuExam from "./AddQuestionExam/SelectMenuExam";
import QuestionsContainer from "./UpdateTopicQuestion/QuestionsContainer";
import { mainBoxStyle, sideDetail } from "../../styles/style";
import { enqueueSnackbar } from "notistack";
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
  const { exam, SetExams ,setexamid,examquest,examid} = State();
  const {instruction, eligiblity, learning,link} = State()
  // console.log(Exams)
  const [btn, setbtn] = useState('Enable');
  const [chuk,setchuk]=useState(true)
  const Submitexam =async () => {
    try {
      
        const { data } = await axios.get(`${link}/enable_disable_exam/${examid.id}`)
        setbtn(data)
        console.log(data)
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
  const handlePostQuestion = () => {
    if (!exam.Language || !exam.Class || !exam.Subject || !exam.Topic|| !exam.perquest||!exam.Level|| !exam.assigned_time   ) {
      enqueueSnackbar('Please select all dropdown', { variant: 'error' })
    }else{
     const formData = new FormData();
    formData.append('subject', exam.Subject); 
    formData.append('topic_class', exam.Class); 
    formData.append('topic_name', exam.Topic); 
    formData.append('language', exam.Language); 
    formData.append('level', exam.Level); 
    formData.append('time_per_question', exam.perquest); 
    formData.append('assigned_time', exam.assigned_time); 
    formData.append('instruction', instruction); 
    formData.append('learning', learning); 
    formData.append('eligiblity', eligiblity); 

    axios
  .post(`${link}/create_topic`, formData)
      .then((response) => {
        if (response.status === 201) {
          SetExams(oldArray => [response.data, ...oldArray])
          setexamid({ id: response.data._id, qno: 1 })
          setchuk(false)
          console.log("Data added successfully");
          enqueueSnackbar('Exam Created, Add Questions in Exam', { variant: 'success' })
        } else {
          alert("Error occured");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
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
         <ProfileWrapper pageName='Create Exam'  /> {/* // add props for menu name */}
          <Box>
            <LanguageAndDotMenuExam  />
              <Box>
                <SelectContainerExam />
                <Instructions />
                <Box sx={{display:'flex', width:"100%", mt:'56px', mb:'91px', justifyContent:'center'}}>
              <Button variant="contained" disabled={examid.id}  onClick={()=>{
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
                  <QuestionsContainer />
                  <Box sx={{width:'50%', mt:'30px', mb:'30px'}}>
                <SelectMenuExam dropdownName={"Exam Question Type"} listArray={["Multiple choice - Single answer", "Multiple choice - multiple answers", "Yes or No", "True or False"]} add={false} value={"Quiz_Type"} val={exam.Quiz_Type}/>

                </Box>
                {exam.Quiz_Type === "" ? (
                  <QuestionsExam  doit={false}/>
                ) : exam.Quiz_Type === "Multiple choice - multiple answers" ? (
                  <QuestionMultipleAnsExam doit={false}
                  />
                ) : exam.Quiz_Type === "True or False" ? (
                  <QuestionTrueFalseExam doit={false}prop={["True", "False"]} />
                ) : exam.Quiz_Type === "Multiple choice - Single answer" ? (
                  <QuestionsExam doit={false}/>
                ) : exam.Quiz_Type === "Yes or No" ? (
                  <QuestionTrueFalseExam doit={false}
                    prop={["Yes", "No"]}
                  />
            ) : null}
            



              <Box sx={{display:'flex', width:"100%", mt:'56px', mb:'91px', justifyContent:'center'}}>
                    <Button variant="contained"  onClick={()=>{
                      Submitexam()
                    }}
                    disabled={!examid.id} 
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
      {/* preview question section */}

      <Box
        sx={sideDetail.first}
      >

        <SideDetailsExam heading='Total Exam' />


             
      </Box>
    </Box>
  );
};

export default CreateQuiz;
