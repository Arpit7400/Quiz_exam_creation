import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect} from 'react'
import TimerIcon from '@mui/icons-material/Timer';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link,NavLink, useNavigate } from 'react-router-dom';
import {State} from '../../Context/Provider'
import { sideDetail } from '../../../styles/style';
import axios from 'axios';

const SideDetailsExam = ({heading}) => {
  const { Exams, SetExams, handleUpdatePreviewQuestionExam,link } = State();
  useEffect(()=>{
    const fetchQuestions = async ()=>{
      try {
        var usersdata = JSON.parse(localStorage.getItem('user' )) ;
        const creatorI = usersdata.user._id
        const { data } = await axios.get(`${link}/get_topics/${creatorI}`)
        // console.log(data)
        SetExams(data)

      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    fetchQuestions()
  }, [])
  const navigate = useNavigate()
    const styleButton = {
        borderRadius:'34px',
        color:'#383838',
        font:'700 16px Lato',
        width:'100%'
  }
  
  return (
    <div sx={sideDetail.second} className="side-details">
      <div className="amount-wrapper">
        <p className="price-heading">{heading}</p>
        <p className="price-count">{Exams.length}</p>
      </div>
      <h3>Preview</h3>
      
      <Box>
    <Box 
    >
      {Exams?.map((data, i) => {
          return (
        <Box 
        key={i}
        style={{background:'#F5F6F7'}}
        sx={{display:'grid', 
        gridTemplateColumns:'6fr 6fr', 
        gridRowGap:'17px',
        gridColumnGap:'16px',
        px:'32px', pb:'18px', pt:'25px',
        width:'100%', borderRadius:'32px',
        mb:'21px'
        }}>
              <Typography sx={{ font: '700 24px Poppins', color: '#383838', }} variant='h4'>{data.topic_name}</Typography>
              <Typography sx={{ font: '700 24px Poppins', color: '#383838', }} variant='h4'>{data.topic_class}</Typography>
              <Box>
                <Typography sx={{ font: '700 16px Lato', mb: '15px' }} variant='p'>{data.subject}</Typography>
                <Typography sx={{ color: '#707070' }}> <QuizIcon /> {data.questions?Object.keys(data.questions).length:0} Questions</Typography>

              </Box>
              <Box >
              <Typography variant='p' sx={{color:'#707070', mb:'30px'}}>{data.level}</Typography>
                <Typography sx={{ color: '#707070' }}> <TimerIcon />{data.assigned_time}</Typography>

              </Box>
              <NavLink to={`/admin/create-exam/${data._id}`}>
              <Button style={{background:'var(--Linear, linear-gradient(180deg, #8C6FE9 0%, #2D00BA 100%))', color:'#fff'}} sx={styleButton}>Check</Button>
              </NavLink>
              <NavLink to={`/admin/create-exam/edit-exam/${data._id}`}>
              <Button style={{background:'#fff'}} sx={styleButton}>Edit</Button>

              </NavLink>


        </Box>
      )
        })}
    </Box>
    </Box>

</div>
  )
}

export default SideDetailsExam