/* eslint-disable */
import React, { useState,useEffect } from 'react';
import {
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  Button,
  Radio,
  Input,
  TextField,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { State } from '../../Context/Provider';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const QuestionTrueFalseTopicExam = ( props  ) => {

    const { setexamquest,exam,examid,setexamid, quest,link} = State();

  const [question, setQuestion] = useState({ text: props.question, image: null });
  const [selectedAnswer, setSelectedAnswer] = useState(parseInt(props.answer));
  const [options, setOptions] = useState([]);
  const [explanation, setExplanation] = useState('')

  const handleExplanationChange = (event)=>{
    setExplanation(event.target.value)
  }


  const handleQuestionChange = (event) => {
    setQuestion({ ...question, text: event.target.value });
  };
  const [drop, setdrop] = useState(props.type);
  useEffect(() => {
    setOptions([])
    const arr = Object.values(props.options)
    for (let i = 0; i < arr.length; i+=2){
       setOptions(oldArray => [...oldArray,{text: arr[i], image:null}])
    }
  },[])
  const handleRadioChange = (selectedIndex) => {
    const newOptions = options.map((option, index) => ({
      ...option,
      answer: index === selectedIndex,
    }));
  
    setOptions(newOptions);
    setSelectedAnswer(selectedIndex);
  };
  const handleOptionChange = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = event.target.value;
    setOptions(updatedOptions);
  };



  const handleImageUpload = (event, index, type) => {
    const updatedOptions = [...options];
    if (type === 'question') {
      setQuestion({ ...question, image: event.target.files[0] });
    } else if (type === 'option') {
        updatedOptions[index].image = event.target.files[0];
        setOptions(updatedOptions);
    }
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = '';
    setOptions(updatedOptions);
  };

  const handlePostQuestion = () => {
    const answer = parseInt(selectedAnswer)
    console.log(answer)
    // const data = {selectedAnswer
      const formData = new FormData();
    // formData.append('question_no', examid.qno); 
    formData.append('question_type', drop);
    formData.append('question_text', question.text);
    formData.append('question_image', question.image);
    formData.append('answer', answer);

    for (let i = 0; i < options.length; i++) {
      const optionText = options[i].text;
      const optionImageInput = options[i].image;
      formData.append(`option${i + 1}`, optionText);
      formData.append(`option${i + 1}_image`, optionImageInput); 
    }
    
    axios
    .post(`${link}/update_question/${examid.id}/${props.qno}`, formData)
        .then((response) => {
          if (response.status === 200) {
            console.log("Data added successfully");
            setexamid({ id: examid.id, qno: (examid.qno + 1) })
            enqueueSnackbar('Question updated', { variant: 'success' })

          }
          else {
            enqueueSnackbar('Network Error', { variant: 'error' })
             console.log(response);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    
    }
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

  }

  return (
    <form
    onSubmit={(e)=>{
      e.preventDefault()
      handlePostQuestion()
      }}
    >
        <Box display="flex" flexDirection="column" alignItems="center" width="100%"
        sx={{
            background:'#fff', width:'100%', mt:'32px', p:'56px 48px', 
            borderRadius:'40px'
        }}
    >
      <Typography sx={{ font: '700 32px Poppins', color: 'var(--grey, #707070)', alignSelf: 'start', pb: '28px' }}>
        Question
      </Typography>
      <Box sx={{display:'flex', width:'100%'}}>
      <Input
       name='Question'
       required
       onInvalid={required}
        placeholder='Question'
        style={{ ...inputStyle, resize: 'vertical' }}
        value={question.text}
        onChange={handleQuestionChange}
        disableUnderline = {true}
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
        <Typography sx={{font:'700 32px Poppins', color:'var(--grey, #707070)',alignSelf:'start', pb:"28px", mt:'28px'}} >Options:</Typography>
        <Box sx={{width:"100%", display:'grid', gridTemplateColumns:"12fr", gridRowGap:'24px'}}>

      {options.map((option, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: '16px' }}>
          <Radio
            sx={{ '& .MuiSvgIcon-root': { fontSize: 35 }, marginRight: '16px' }}
            checked={selectedAnswer === index}
            onChange={() => handleRadioChange(index)}
          />
          <Input
           required
           name={`Option ${index+1}`}
           onInvalid={(e)=>{required(e,index+1)}}
            placeholder={`${props[index]}`}
            style={inputStyle}
            value={option.text}
            onChange={(e) => handleOptionChange(e, index)}
            disableUnderline = {true}
          />
          <input
            type='file'
            accept='image/*'
            onChange={(e) => handleImageUpload(e, index)}
            style={{ display: 'none' }}
            id={`option-image-upload-${index}`}
          />
          <label htmlFor={`option-image-upload-${index}`}>
            <IconButton component='span' aria-label={`Upload image for Option ${index + 1}`}>
              <AddPhotoAlternateIcon sx={{ fontSize: '37px' }} />
            </IconButton>
          </label>
          <IconButton onClick={() => handleDeleteOption(index)} aria-label={`Delete Option ${index + 1}`}>
            <DeleteOutlineIcon sx={{ fontSize: '37px' }} />
          </IconButton>
        </Box>
      ))}
      
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
      <Box sx={{display:'grid', gridTemplateColumns:'4fr', justifyContent:'center', mt:'32px'}}>
          <Box sx={{textAlign:'center'}}>
            <Button 
            type='submit'
            sx={{
              width: "140px",
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
            >Update</Button>

          </Box>
          
      </Box>
      
      </Box>
    </form>
  );
};

export default QuestionTrueFalseTopicExam;
