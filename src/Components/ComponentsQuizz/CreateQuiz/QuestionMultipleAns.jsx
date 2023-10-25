import React, { useState } from 'react';
import {
  Checkbox,  FormControlLabel,
  Box,
  Typography,
  TextField,
  Radio,
  IconButton,
  Button,
  Input,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import { State } from "../../Context/Provider"
import axios from 'axios';
import { qStyle } from '../../../styles/style';
import { enqueueSnackbar } from 'notistack';

const QuestionMultipleAns = ({handleThreeDotMenu}) => {
const { quest,questions, setQuestions,link} = State();
const [question, setQuestion] = useState({ text: '', image: null });
  const [options, setOptions] = useState([
    { text: '', image: null, answer: '' },
    { text: '', image: null, answer: '' },
    { text: '', image: null, answer: '' },
    { text: '', image: null, answer: '' },
  ]);
  const [explanation, setExplanation] = useState('')

  const handleExplanationChange = (event)=>{
    setExplanation(event.target.value)
  }

  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]);

  const handleQuestionChange = (event) => {
    setQuestion({ ...question, text: event.target.value });
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].text = event.target.value;
    setOptions(newOptions);
  };

  const handleCheckboxChange = (index) => {
    const newSelectedIndices = [...selectedAnswerIndices];
    const currentIndex = newSelectedIndices.indexOf(index);
  
    if (currentIndex === -1) {
      newSelectedIndices.push(index);
    } else {
      newSelectedIndices.splice(currentIndex, 1);
    }
  
    // Update the options with the new answer states
    const updatedOptions = options.map((option, i) => ({
      ...option,
      answer: newSelectedIndices.includes(i),
    }));
  
    setSelectedAnswerIndices(newSelectedIndices);
    setOptions(updatedOptions);
    console.log(selectedAnswerIndices)
  };
  const handleDeleteImage = (type) => {
    if (type === 'question') {
      setQuestion({ ...question, image: null });
    } else if (type === 'option') {
      const newOptions = options.map((option, index) => {
        if (index === selectedAnswerIndices) {
          return { ...option, image: null };
        }
        return option;
      });
      setOptions(newOptions);
    }
  };
  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, { text: '', image: null, answer: false }];
    setOptions(newOptions);
  };

  const handleImageUpload = (event, index, type) => {
    const newOptions = [...options];
    if (type === 'question') {
      setQuestion({ ...question, image: event.target.files[0] });
    } else if (type === 'option') {
      newOptions[index].image = event.target.files[0];
      setOptions(newOptions);
    }
  };

   const handlePostQuestion = () => {
    if (!quest.Language || !quest.Class || !quest.Subject || !quest.Topic|| !quest.Sub_topic||!quest.Level|| !quest.Quiz_Type  ) {
      enqueueSnackbar('Please select all dropdown', { variant: 'error' })
    }else{
      let quizType = quest.Quiz_Type
      if(quizType.includes("multiple")){
        quizType = 'multiple'
      }else if(quizType.includes('Single')){
        quizType = 'single'
      }else{
        quizType = 'truefalse'
      }
    const formData = new FormData();
    formData.append('language', quest.Language); 
    formData.append('class', quest.Class);
    formData.append('subject', quest.Subject);
    formData.append('topic', quest.Topic);
    formData.append('subtopic', quest.Sub_topic);
    formData.append('level', quest.Level);
    formData.append('quiz_type', quizType);
    formData.append('question', question.text);
    formData.append('question_image', question.image);

    const popt = [],QUE=question.text;
    for (let i = 0; i < options.length; i++) {
      const optionText = options[i].text;
      const optionImageInput = options[i].image;
      formData.append(`option_${i + 1}`, optionText);
      formData.append(`option_${i + 1}_image`, optionImageInput);
      const isAnswer = options[i].answer;
      formData.append(`is_answer_${i + 1}`, isAnswer.toString());
      popt.push({text:optionText,is_answer:isAnswer});
    }
    
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const creatorId = usersdata.user._id
    axios
    .post(`${link}/create_quiz/${creatorId}`, formData)
        .then((response) => {
          if (response.status === 201) {
            console.log("Data added successfully");
            try {
              
              setQuestions(oldArray => [{ question: QUE, options: popt,id: response.data._id },...oldArray])
              enqueueSnackbar('Quiz Posted Successfully', { variant: 'success' })
            }
            catch (err) {
              console.log(err)
            }
          } else {
            alert("Error occured");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      }
    
  };
  const inputStyle = {
    padding: '11px 27px',
    borderRadius: '12px',
    background: '#EFF3F4',
    width: '100%',
    border: 'none',
    color: '#707070',
    fontSize: '18px',
  };
  
  const required = (e,i)=>{
    const {name, validity} = e.target

  }
  return (
    <form 
    onSubmit={(e)=>{
      e.preventDefault()
      handlePostQuestion()
      }}
    >
    <Box display="flex" flexDirection="column" alignItems="center" width="100%"
        sx={qStyle.question}
    >
        <Typography sx={{font:'700 32px Poppins', color:'var(--grey, #707070)',alignSelf:'start', pb:"28px"}} >Question</Typography>
        <Box sx={{display:'flex', width:'100%'}}>

        <Input
            name='Question'
                disableUnderline = {true}
                required
                placeholder='Question'
                multiline
                fullWidth
                value={question.text}
                onChange={handleQuestionChange}
                style={inputStyle}
                sx={{
                    color:'var(--grey, #707070)'
                }}
                onInvalid={required}
            />
                <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, null, 'question')}
                style={{ display: 'none' }}
                id="question-image-upload"
                />
                <label htmlFor="question-image-upload">
                <IconButton component="span" aria-label="Upload image">
                    <AddPhotoAlternateIcon sx={{fontSize:'37px'}} />
                </IconButton>
                </label>
        </Box>
        <Typography sx={{ font: '700 32px Poppins', color: 'var(--grey, #707070)', alignSelf: 'start', pb: "28px" }}>Options:</Typography>
      <Box sx={{ width: "100%", display: 'grid', gridTemplateColumns: "12fr", gridRowGap: '24px' }}>
        {options.map((option, index) => (
          <Box key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', width: '100%', gap: '32px' }}>
            <FormControlLabel
              control={
                <Checkbox
                required={selectedAnswerIndices==[]}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
                  checked={selectedAnswerIndices.includes(index)}
                  onChange={(event) => handleCheckboxChange(index)}
                />
              }
              label=""
              labelPlacement="start"
            />
            <Input
              required
              name={`Option ${index+1}`}
                placeholder={`Option ${index+1}`}
                style={inputStyle}
                disableUnderline = {true}
                value={option.text}
                onChange={(e) => handleOptionChange(e, index)}
                variant="outlined"
                onInvalid={(e)=>{required(e,index+1)}}
            />
                    <Box display="flex" alignItems="center">
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index, 'option')}
                        style={{ display: 'none' }}
                        id={`option-image-upload-${index}`}
                        />
                        <label htmlFor={`option-image-upload-${index}`}>
                        <IconButton component="span" aria-label={`Upload image for Option ${index + 1}`}>
                            <AddPhotoAlternateIcon sx={{fontSize:'37px'}} />
                        </IconButton>
                        </label>
                        <IconButton onClick={() => handleDeleteOption(index)} aria-label={`Clear Option ${index + 1}`}>
                        <DeleteOutlineIcon sx={{fontSize:'37px'}} />
                        </IconButton>
                    </Box>
                    </Box>
                ))}
        </Box>
        <Typography sx={{cursor:'pointer', color:'#7A58E6', font:'700 20px Poppins', alignSelf:'end', mt:'32px'}} onClick={handleAddOption} aria-label="Add option" >Add Another Options</Typography>
        <Box sx={{width:'100%'}}>
        <Typography sx={{font:'700 32px Poppins', color:'var(--grey, #707070)',alignSelf:'start', pb:"28px", mt:'28px'}} >Explanation</Typography>
          <TextField 
           InputProps={{ style: { background:'#EFF3F4', paddingLeft: '20px', borderRadius:'12px'} }}
           multiline
           placeholder='Explain the answer'
           fullWidth
           minRows={2}
           sx={{border: 'none',"& fieldset": { border: 'none' },}}
           value={explanation}
           onChange={handleExplanationChange}

          
          />
        </Box>
    </Box>
    <Box sx={{display:'flex', width:"100%", mt:'56px', mb:'91px', justifyContent:'center'}}>
      <Button variant="contained" onClick={()=>{
      }} 
      color="primary"
      type='submit'
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
        Post Question
      </Button>


    </Box>
    </form>
  );
};

export default QuestionMultipleAns;
