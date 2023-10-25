import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material"
import { State } from '../../Context/Provider'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link, useParams } from 'react-router-dom'
import profile from '../../../Data//logo.svg'
import QuestionImg from '../../../Data/QuestionImg.png'
import axios from 'axios'
import edit from '../../../Data/edit.png'
import PreviewExamEdit from './PreviewExamEdit';

const PreviewExamQuestions = ({heading, number}) => {
  const {updatePreviewQuestionExam,boo,setboo,link} = State()
   const {topic_id} = useParams()
  const [examquest, setexamquest] = useState([])
  // const [j, setj] = useState(0);
  useEffect(() => {
    // setexamquest([])
    const fetchQuestions = async ()=>{
      try {
        const { data } = await axios.get(`${link}/get_topic/${topic_id}`)
        
        const objects = data.questions
        // const no = Object.keys(data.questions);
        // console.log(Object.keys(data.questions));
    
        // for (var i = 0; i < objects.length; i++) {
        //     arr.push(objects[i]);
        // }
        setexamquest([])
        let j=1
        for (const key in objects) {
          const arr = Object.values(objects[key][0].options)
          const dat = []
          for (let i = 0; i < arr.length; i+=2){
            dat.push({text:arr[i], image:null, img: arr[i+1]})
          }
          // console.log(Object.values(objects[key][0].options))
          // console.log(data._id)

          setexamquest(oldArray => [...oldArray,{
            question: objects[key][0].question_text,
            img: objects[key][0].question_image,
            ans: objects[key][0].answer,
            options: dat,
            id: data._id,
            qno: key,
            drop:objects[key][0].question_type
          }])
          // j = j + 1;
          // no.unshift()
          // console.log(Object.keys(objects[key]))
        }
        //  Object.keys(data[0].options)
        // console.log(Object.keys(arr[0][0].options))
        // setexamquest(arr)
        // setboo(!boo)
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
      
    }
    fetchQuestions()
    // console.log(examquest)
  }, [updatePreviewQuestionExam,boo])
  // console.log(questions)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (index) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [index]: true
    }));
  };

  const propsForPopUp = {open, setOpen, handleOpen }

  return (
    
    
      
      <Box>

        {examquest?.map((data, index) => {
        // const {question, options, id } = data
        // console.log(data)
          return (
          <Box sx={{background:'#fff', position:'relative'}} className='preview-question' key={index}>
            <img onClick={() => handleOpen(index)} style={{position:'absolute', top:'30px', right:'30px', cursor:'pointer'}} src={edit}></img>
              {open[index] && <PreviewExamEdit open={open} setOpen={setOpen} handleOpen={handleOpen} data={data} />}
            <Box sx={{display:'flex', mr:'20px', mb:'20px'}}>
                {data.img ? <img alt='Question image' style={{ width: '200px', height: '200px', objectFit: 'contain', marginRight: '20px' }} src={`${link}/get_image/${data.img}`}></img> : <></>}
              <p>{data.question} </p>

            </Box>
            
            <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="option"
              name="radio-buttons-group"
                >
                  
              {data.options.map((option, i)=>{
                const text = option.text
                // const is_answer = option.is_answer             
                return(
                  <Box key={i} sx={{ display: 'flex', mr: '20px', mb: '20px' }}>{
                    option.img?<img src={`${link}/get_image/${option.img}`} alt='get-image' style={{ width: '100px', height: '100px', objectFit: 'contain', marginRight: '20px' }}  />:<></>
                    }
                    <FormControlLabel key={i}  value="option" control={<Radio disabled={data.ans != i} /> } label={text} />
                  </Box>
                )
              })}
            </RadioGroup>
          </FormControl>
              </Box>
        )
        })}

      </Box>


  )
}

export default PreviewExamQuestions