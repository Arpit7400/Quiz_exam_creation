/* eslint-disable */
import React, { useState,useEffect } from 'react';
import {
  TextField,
  Radio,
  FormControlLabel,
  Box,
  IconButton,
  Button,
  Typography,
  Input,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import { State } from "../../Context/Provider"
import axios from 'axios';
import SelectMenuTopicUpdate from './SelectMenuTopicUpdate';
import { enqueueSnackbar } from 'notistack';

const QuestionsExamTopic = (props) => {
  const { setexamquest,exam,examid,setexamid, quest,link} = State();
  const [question, setQuestion] = useState({ text: props.question, image: null });
  const [options, setOptions] = useState([
  ]);
  const [drop, setdrop] = useState(props.type);
  const [explanation, setExplanation] = useState('')

  const handleExplanationChange = (event)=>{
    setExplanation(event.target.value)
  }

  useEffect(() => {
    setOptions([])
    const arr = Object.values(props.options)
    for (let i = 0; i < arr.length; i+=2){
       setOptions(oldArray => [...oldArray,{text: arr[i], image:null}])
    }
  },[])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(parseInt(props.answer));

  const handleQuestionChange = (event) => {
    setQuestion({ ...question, text: event.target.value });
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].text = event.target.value;
    setOptions(newOptions);
  };

  const handleRadioChange = (event, index) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setCorrectAnswerIndex(index);
};

  const handleDeleteImage = (type) => {
    if (type === 'question') {
      setQuestion({ ...question, image: null });
    } else if (type === 'option') {
      const newOptions = options.map((option, index) => {
        if (index === correctAnswerIndex) {
          return { ...option, image: null };
        }
        return option;
      });
      setOptions(newOptions);
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions[index] = { text: '', image: null };
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, { text: '', image: null}];
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
    const formData = new FormData();
    formData.append('question_type', drop);
    formData.append('question_text', question.text);
    formData.append('question_image', question.image);
    formData.append('answer', correctAnswerIndex+1);

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
             console.log(response);
             enqueueSnackbar('Network Error', { variant: 'error' })
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    
  };


  
  const inputStyle = {
    padding: "11px 27px",
    borderRadius: "12px",
    background: "#EFF3F4",
    width: "100%",
    border: "none",
    color: "#707070",
    fontSize:'18px'
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
        <Typography sx={{font:'700 32px Poppins', color:'var(--grey, #707070)',alignSelf:'start', pb:"28px"}} >Question</Typography>
        <Box sx={{display:'flex', width:'100%'}}>

            <Input
             name='Question'
             required
             onInvalid={required}
                disableUnderline = {true}
                placeholder='Question'
                multiline
                fullWidth
                value={question.text}
                onChange={handleQuestionChange}
                style={inputStyle}
                sx={{
                    color:'var(--grey, #707070)'
                }}
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
                    <Box key={index} style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', marginBottom: '8px', width:'100%', gap:'32px' }}>
                    <FormControlLabel
                        value={index.toString()}
                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35, }}} checked={correctAnswerIndex === index} onClick={(e)=>handleRadioChange(e,index)} />}
                        label=""
                        labelPlacement="start"
                        
                    />
                    <Input
                     required
                     name={`Option ${index+1}`}
                     onInvalid={(e)=>{required(e,index+1)}}
                        placeholder={`Option ${index+1}`}
                        style={inputStyle}
                        disableUnderline = {true}
                        value={option.text}
                        onChange={(e) => handleOptionChange(e, index)}
                        variant="outlined"
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
        <Box sx={{display:'grid', gridTemplateColumns:'4fr 4fr 4fr', justifyContent:'center', mt:'32px', width:'100%'}}>
          <span></span>
          <Box sx={{textAlign:'center'}}>
            <Button 
              type='submit'
            sx={{
              width: "60%",
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
          <Box sx={{display:'flex', justifyContent:'end'}}>
              <Typography sx={{cursor:'pointer', color:'#7A58E6', font:'700 20px Poppins', alignSelf:'center',}} onClick={handleAddOption} aria-label="Add option" >Add Another Options</Typography>
              
          </Box>
        </Box>
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

    </form>
  );
};

export default QuestionsExamTopic;
