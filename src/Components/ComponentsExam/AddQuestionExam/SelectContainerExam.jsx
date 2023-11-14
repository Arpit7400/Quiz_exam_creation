/* eslint-disable */
import React,{useEffect, useState} from 'react'
import SelectMenuExam from './SelectMenuExam'
import { Box } from '@mui/system'
import { State } from '../../Context/Provider'
import { selectStyle } from '../../../styles/style'
import axios from 'axios'

const SelectContainerExam = () => {
  const { exam,  desubject, destopic,setdesubject,setedstopic,setdlanguage,link} = State();
  const [classs,setclasss]=useState([ "1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12", 'UG', 'PG', 'UPSC', 'SSC', 'IIT', 'Olympiad'])
  const ExamDuration = [
    '10 Minutes', '20 Minutes', '30 Minutes', '40 Minutes', '50 Minutes', '60 Minutes', '70 Minutes', '80 Minutes', '90 Minutes', '100 Minutes', 
    '110 Minutes', '120 Minutes', '130 Minutes', '140 Minutes', '150 Minutes', '160 Minutes', '170 Minutes', '180 Minutes', '190 Minutes' 
  ]
  useEffect(() => {
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const role = usersdata.user.role
    const fetchSubjec = async ()=>{
      try {
        setdesubject([])
        const { data } = await axios.get(`${link}/get_all_subjects`)
        if(data){
          setdesubject(data);
        }
      
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    if(role=="admin")
      fetchSubjec()
    
     const fetchuSubject = async ()=>{
      try {
        
        const { data } = await axios.get(`${link}/get_assign_details/${usersdata.user.user_id}`)
        setdesubject(data.subject)
        setedstopic(data.topic)
        setclasss(data.class)
        setdlanguage(data.language)
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }

    if(role=="user")
      fetchuSubject()

  }, [])

  useEffect(() => {
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const role = usersdata.user.role
    const fetchtopic = async ()=>{
      try {
        setedstopic([]);
        const { data } = await axios.get(`${link}/get_all_topics/${exam.Subject}`)
        setedstopic(Object.keys(data));
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    if(role=="admin" && exam.Subject  )
    fetchtopic()
  }, [exam.Subject])

  useEffect(() => {
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const role = usersdata.user.role
    const fetchQuestions = async ()=>{
      try {
        
        const { data } = await axios.get(`${link}/get_languages`)
        if(data)
        setdlanguage(data)
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    if(role=="admin" )
    fetchQuestions()
  }, [])
  return (
    <Box 
    sx={selectStyle.first}>
        <SelectMenuExam dropdownName={"Class"} listArray={classs} classList={"classChange"} add={false} value={"Class"} val={exam.Class} />
        <SelectMenuExam dropdownName={"Subject"} listArray={desubject} add={true} value={"Subject"} val={exam.Subject}/>
        <SelectMenuExam dropdownName={"Topic"} listArray={destopic} add={true} value={"Topic"} val={exam.Topic}/>
        <SelectMenuExam dropdownName={"Level"} listArray={["Beginner", "Intermediate" , "Advance", "Any One"]} add={false} value={"Level"} val={exam.Level}/>
        <SelectMenuExam dropdownName={"Per Question Time"} listArray={['1 Munute', '2 Minutes', '3 Minutes']} value={"perquest"} val={exam.perquest}/>
        <SelectMenuExam dropdownName={"Test Duration"} listArray={ExamDuration} value={"assigned_time"} val={exam.assigned_time}/>

    </Box>
  )
}

export default SelectContainerExam
