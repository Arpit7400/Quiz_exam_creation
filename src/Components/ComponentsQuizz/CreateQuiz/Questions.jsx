/* eslint-disable */
import React, { useState } from 'react';
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
import { State } from "../../Context/Provider"
import axios from 'axios';
import { btn, qStyle } from '../../../styles/style';
import { useSnackbar } from 'notistack';
import Editor from '../../Editor';

const CreateQuiz = () => {
  const { enqueueSnackbar} = useSnackbar();
  const { quest,questions, setQuestions,link} = State();
  const [question, setQuestion] = useState({ text: '', image: null });
  const [options, setOptions] = useState([
    { text: '', image: null ,answer: ''},
    { text: '', image: null ,answer: ''},
    { text: '', image: null ,answer: ''},
    { text: '', image: null ,answer: ''},
  ]);
  // const [bool, setbool]=useState(false)
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
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

  const handleRadioChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    
    // Create a new array with updated answer values
    const newOptions = options.map((option, index) => ({
        ...option,
        answer: index === selectedIndex,
    }));

    setOptions(newOptions);
    setCorrectAnswerIndex(selectedIndex);
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
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, { text: '', image: null,answer: false}];
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
    const formData = new FormData();
    if (!quest.Language || !quest.Class || !quest.Subject || !quest.Topic|| !quest.Sub_topic||!quest.Level|| !quest.Quiz_Type  ) {
      enqueueSnackbar('Please select all dropdown', { variant: 'error' })
    }
    else {
      let quizType = quest.Quiz_Type
      if(quizType.includes("multiple")){
        quizType = 'multiple'
      }else if(quizType.includes('single')){
        quizType = 'single'
      }else if(quizType.includes(' or ')){
        quizType = 'truefalse'
      }
      
      formData.append('language', quest.Language);
      formData.append('class', quest.Class);
      formData.append('subject', quest.Subject);
      formData.append('topic', quest.Topic);
      formData.append('subtopic', quest.Sub_topic);
      formData.append('level', quest.Level);
      formData.append('quiz_type', quizType);
      formData.append('question', handleRemovePTag(question.text));
      formData.append('question_image', question.image);
      formData.append('explanation', handleRemovePTag(explanation));

      const popt = [], QUE = question.text;
      for (let i = 0; i < options.length; i++) {
        const optionText = options[i].text;
        const optionImageInput = options[i].image;
        formData.append(`option_${i + 1}`, handleRemovePTag(optionText));
        formData.append(`option_${i + 1}_image`, optionImageInput);
        const isAnswer = options[i].answer;
        formData.append(`is_answer_${i + 1}`, isAnswer.toString());
        popt.push({ text: optionText, is_answer: isAnswer });
      }
    
      var usersdata = JSON.parse(localStorage.getItem('user'));
      const creatorId = usersdata.user._id
      axios
        .post(`${link}/create_quiz/${creatorId}`, formData)
        .then((response) => {
          if (response.status === 201) {
            console.log("Data added successfully");
           
            try {
              
              setQuestions(oldArray => [{ question: QUE, options: popt, id: response.data._id }, ...oldArray])
              // console.log(response.data._id)
              enqueueSnackbar('Quiz Posted Successfully', { variant: 'success' })
              setOptions([
                { text: '', image: null, answer: false },
                { text: '', image: null, answer: false },
                { text: '', image: null, answer: false },
                { text: '', image: null, answer: false }
              ]
              );
  
              setQuestion( {text: '', image: null });
              setCorrectAnswerIndex('')
              setExplanation('')
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


const required = (e,i)=>{
  const {name, validity} = e.target

}
  
  const inputStyle = {
    padding: "11px 27px",
    borderRadius: "12px",
    background: "#EFF3F4",
    width: "100%",
    border: "none",
    color: "#707070",
    fontSize:'18px'
  };

  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      handlePostQuestion()
      }} >
    <Box display="flex" flexDirection="column" alignItems="center" width="100%"
        sx={qStyle.question}
    >
        <Typography sx={{font:'700 32px Poppins', color:'var(--grey, #707070)',alignSelf:'start', pb:"28px"}} >Question</Typography>
        <Box sx={{display:'flex', width:'100%'}}>

            <Editor
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
        <Typography sx={{font:'700 32px Poppins', color:'var(--grey, #707070)',alignSelf:'start', pb:"28px", mt:'28px'}} >Options:</Typography>
        <Box sx={{width:"100%", display:'grid', gridTemplateColumns:"12fr", gridRowGap:'24px'}}>

                {options.map((option, index) => (
                    <Box key={index} style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', marginBottom: '8px', width:'100%', gap:'32px' }}>
                    <FormControlLabel
                        name='Answer'
                        value={index.toString()}
                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35, }}} checked={correctAnswerIndex === index} onChange={handleRadioChange} />}
                        label=""
                        required
                        sx={{
                          '.MuiFormControlLabel-asterisk': {
                            display: 'none', // This will hide the asterisk
                          },

                        }}
                        labelPlacement="start"
                        onInvalid={required}
                        
                    />
                    <Editor
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
      <Button variant="contained"
        color="primary"
        type='submit'
        sx={btn.primary}
      >
        Post Question
      </Button>


    </Box>
    </form>
  );
};

export default CreateQuiz;
