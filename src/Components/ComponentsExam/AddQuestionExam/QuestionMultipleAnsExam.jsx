/* eslint-disable */
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
import { btn, qStyle } from '../../../styles/style';
import { enqueueSnackbar } from 'notistack';
import Editor from '../../Editor';

const QuestionMultipleAnsExam = (props) => {
  const doit=props.doit
  const { setexamquest,exam,examid,setexamid,editid,seteditid,seteditexam,link} = State();
  const [question, setQuestion] = useState({ text: '', question_image_url: null });
  const [options, setOptions] = useState([
    { text: '', image: null, is_answer: '' },
    { text: '', image: null, is_answer: '' },
    { text: '', image: null, is_answer: '' },
    { text: '', image: null, is_answer: '' },
  ]);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]);
  const [explanation, setExplanation] = useState('')

  const handleExplanationChange = (event)=>{
    setExplanation(event)
  }


  const handleQuestionChange = (event) => {
    setQuestion({ ...question, text: event });
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].text = event;
    setOptions(newOptions);
  };

  const handleCheckboxChange = (event,index) => {
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
      is_answer: newSelectedIndices.includes(i),
    }));
  
    setSelectedAnswerIndices(newSelectedIndices);
    setOptions(updatedOptions);
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
  const handleRemovePTag = (text)=>{
    return text.slice(3,-4)
  }
   const handlePostQuestion = () => {
    // const data = {
    const answer = selectedAnswerIndices.map(data=>data+1)
    const formData = new FormData();
    formData.append('question_type', exam.Quiz_Type);
    formData.append('question_text', handleRemovePTag(question.text));
    formData.append('question_image', question.image);
    formData.append('answer', answer);
    formData.append('explanation', handleRemovePTag(explanation));

    for (let i = 0; i < options.length; i++) {
      const optionText = options[i].text;
      const optionImageInput = options[i].image;
      formData.append(`option${i + 1}`, handleRemovePTag(optionText));
      formData.append(`option${i + 1}_image`, optionImageInput);
    }
    if(doit){
      formData.append('question_no', 'q'+editid.qno); 
       axios
         .post(`${link}/create_questions/${editid.id}`, formData)
         .then((response) => {
           if (response.status === 201) {
             console.log("Data added successfully");
             console.log(response.data);
             console.log(doit);
             seteditexam(oldArray => [...oldArray, {que:response.data, qno:editid.qno}])
            seteditid({ id: editid.id, qno: editid.qno + 1 })
            enqueueSnackbar('Question Added', { variant: 'success' })

             // console.log(response.data.question_type);
             setOptions([
              { text: '', image: null, answer: false },
              { text: '', image: null, answer: false },
              { text: '', image: null, answer: false },
              { text: '', image: null, answer: false }
            ]
            );

            setQuestion( {text: '', image: null });
            setSelectedAnswerIndices('')
            setExplanation('')
           }
           else {
             console.log(response);
           }
         })
         .catch((err) => {
           console.log(err.response.data);
         });
    }
     else {
        formData.append('question_no', 'q'+examid.qno); 
       axios
         .post(`${link}/create_questions/${examid.id}`, formData)
         .then((response) => {
           if (response.status === 201) {
             console.log("Data added successfully");
             console.log(response.data);
             setexamquest(oldArray => [...oldArray, { que: response.data, qno: examid.qno }])
             setexamid({ id: examid.id, qno: (examid.qno + 1) })
             enqueueSnackbar('Question Added', { variant: 'success' })

             // console.log(response.data.question_type);
             setOptions([
              { text: '', image: null, answer: false },
              { text: '', image: null, answer: false },
              { text: '', image: null, answer: false },
              { text: '', image: null, answer: false }
            ]
            );

            setQuestion( {text: '', image: null });
            setSelectedAnswerIndices('')
           }
           else {
             console.log(response);
           }
         })
         .catch((err) => {
           console.log(err.response.data);
         });
      }
    // console.log('Posted Question:', { question, options, correctAnswerIndex });
  };
  
  const inputStyle = {
    padding: '11px 27px',
    borderRadius: '12px',
    background: '#EFF3F4',
    width: '100%',
    border: 'none',
    color: '#707070',
    fontSize: '18px',
    outline:'none'
  };
  const required = (e,i)=>{
    // const {name, validity} = e.target
    // if(e.target.validity.valueMissing){
    //   if(name ==='Question'||name=== `Option ${i}`){
    //   enqueueSnackbar(`Enter ${name}`, {variant:'error'})
    //   }
    // }
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

            <Editor
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
                {/* <IconButton onClick={() => setQuestion({ ...question, text: '' })} aria-label="Clear question">
                <DeleteOutlineIcon />
                </IconButton> */}
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
        <Typography sx={{ font: '700 32px Poppins', color: 'var(--grey, #707070)', alignSelf: 'start', mt:'28px', pb: "28px" }}>Options:</Typography>
      <Box sx={{ width: "100%", display: 'grid', gridTemplateColumns: "12fr", gridRowGap: '24px' }}>
        {options.map((option, index) => (
          <Box key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', width: '100%', gap: '32px' }}>
            <FormControlLabel
            required={selectedAnswerIndices.length===0}
            sx={{
              '.MuiFormControlLabel-asterisk': {
                display: 'none', // This will hide the asterisk
              },

            }}
              control={
                <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
                  checked={selectedAnswerIndices.includes(index)}
                  onClick={(event) => handleCheckboxChange(event, index)}
                />
              }
              label=""
              labelPlacement="start"
            />
            <Editor
            required
            name={`Option ${index+1}`}
            onInvalid={(e)=>{required(e,index+1)}}
              placeholder={`Option ${index + 1}`}
              style={inputStyle}
              value={option.text}
              onChange={(e) => handleOptionChange(e, index)}
              variant="outlined"
            />
                    <Box display="flex" alignItems="center">
                        {/* {option.image && (
                        <IconButton
                            onClick={() => handleDeleteImage('option')}
                            aria-label={`Delete image for Option ${index + 1}`}
                            s
                        >
                            <DeleteOutlineIcon size="large" />
                        </IconButton>
                        )} */}


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
          <Editor 
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
      type='submit'
        color="primary" 
        disabled={!examid.id && !editid.id}
        sx={btn.primary}
      >
        ADD Question
      </Button>


    </Box>
    </form>
  );
};

export default QuestionMultipleAnsExam;
