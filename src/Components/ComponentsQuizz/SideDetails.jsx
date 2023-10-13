import React, { useEffect, useState } from 'react'
import edits  from '../../Data/edit.png'
import { Box, Typography } from "@mui/material"
import { State } from '../Context/Provider'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link } from 'react-router-dom'
import { sideDetail } from '../../styles/style';
import axios from 'axios';
const SideDetails = ({heading, number}) => {
  const { questions,bool,openPage,quest,setQuestions} = State();
  // console.log(questions)
  useEffect(()=>{
    const fetchQuestions = async ()=>{
  
        try {
          // const formData = new FormData();
          // formData.append('subject', quest.Subject);
          // formData.append('topic', quest.Topic);
          // formData.append('subtopic', quest.Sub_topic);
          // formData.append('level', quest.Level);
          // const { data } = await axios.get("http://localhost:5000/get_quizzes_by_filter", formData)
          var usersdata = JSON.parse(localStorage.getItem('user' )) ;
          const creatorId = usersdata.user._id
          const role=usersdata.user.role


          const formData = new FormData();
          formData.append('creator_id', creatorId);
          formData.append('role', role);

          const { data } = await axios.get(`http://localhost:5000/get_all_quizz/${role}/${creatorId}`)
          // console.log(quest)

          const quet = data.filter((data) => (
                          (!quest.Subject || data.subject == quest.Subject) &&
                          (!quest.Topic || data.topic == quest.Topic) &&
                          (!quest.Sub_topic || data.subtopic == quest.Sub_topic) &&
                          (!quest.Language || data.language == quest.Language) &&
                          (!quest.Level || data.level == quest.Level) &&
                          (!quest.Quiz_Type || data.quiz_type == quest.Quiz_Type) &&
                          (!quest.Class || data.class == quest.Class)                           
          ))

          setQuestions([]);
          quet?.map((dat, i) => {
          const { question, options, explanation} = dat.question_container
          // console.log(dat)

          setQuestions(oldArray => [{ question: question, options: options, id: dat._id, explanation: explanation }, ...oldArray])
          })
        // console.log(data)
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    fetchQuestions()
    
    
  }, [quest.Subject,quest.Topic,quest.Sub_topic,quest.Level,quest.Class,quest.Quiz_Type,quest.Language,openPage,bool])
  return (
    
    <Box  className="side-details">
      <div className="amount-wrapper">
        <p className="price-heading">{heading}</p>
        <p className="price-count">{questions.length}</p>
      </div>
      <h3>Preview</h3>
      
      <Box>
        {questions?.map((data, i) => {
          // console.log(data)
        const {question, options, id, explanation } = data
          return (
          // <textarea className='preview-question'>
          <div className='preview-question' key={i}>
            <Link to={`/update/${id}`} >
          <img src={edits} className='edit-logo' alt="" />
            </Link>
            <Typography>{question}</Typography>
            
            <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="option"
              name="radio-buttons-group"
            >
              {options.map((option, i)=>{
                const text = option.text
                const is_answer = option.is_answer
                // console.log(is_answer)
                
                return(
                  <FormControlLabel key={i}  disabled={!is_answer} value="option" control={<Radio />} label={text} />
                  
                )
              })}
            </RadioGroup>
            {explanation?
            <Typography sx={{font:'500 20px Poppins'}}><strong>Explanation: </strong>{explanation}</Typography>
            :null}
          </FormControl>
              </div>
          // </textarea>
        )
        })}

      </Box>

    </Box>
  )
}

export default SideDetails