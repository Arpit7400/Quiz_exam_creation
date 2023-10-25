import React,{useEffect, useState} from 'react'
import SelectMenuExam from './SelectMenuExam'
import { Box } from '@mui/system'
import { State } from '../../Context/Provider'
import { selectStyle } from '../../../styles/style'
import axios from 'axios'

const SelectContainerExam = () => {
  const { exam,  desubject, destopic,setdesubject,setedstopic,setdlanguage,link} = State();
  const [classs,setclasss]=useState(["1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12"])
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
        <SelectMenuExam dropdownName={"Level"} listArray={["Beginner", "Intermediate" , "Advance"]} add={false} value={"Level"} val={exam.Level}/>
        <SelectMenuExam dropdownName={"Per Question Time"} listArray={['1 Munute', '2 Minutes', '3 Minutes']} value={"perquest"} val={exam.perquest}/>
        <SelectMenuExam dropdownName={"Test Duration"} listArray={['60 Minutes', '120 Minutes', '180 Minutes']} value={"assigned_time"} val={exam.assigned_time}/>

    </Box>
  )
}

export default SelectContainerExam
