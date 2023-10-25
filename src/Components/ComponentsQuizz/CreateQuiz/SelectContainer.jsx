import React, {useEffect,useState} from 'react'
import UnstyledSelectObjectValues from './UnstyledSelectObjectValues'
import { Box } from '@mui/system'
import { State } from '../../Context/Provider'
import { selectStyle } from '../../../styles/style'
import axios from 'axios'

const SelectContainer = () => {
  const { quest, dsubject, dtopic, dstopic,setQuestions,setdsubject,setSubjects,setdstopic,setdtopic,setdlanguage,link} = State();
  const [classs,setclasss]=useState(["1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12"])
  
  useEffect(() => { 
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const role = usersdata.user.role
    const fetchSubject = async ()=>{
      try{
        const { data } = await axios.get(`${link}/get_all_subject_quizz`)
        const subjects = (data)
        setSubjects(subjects)
        setdsubject([])
        data.forEach(object => {
          setdsubject(oldArray => [object.subject,...oldArray])
        });
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    if(role=="admin")
      fetchSubject()
    
    const fetchuSubject = async ()=>{
      try {
        
        const { data } = await axios.get(`${link}/get_assign_details/${usersdata.user.user_id}`)
        
        setdsubject(data.subject)
        setdstopic(data.subtopic)
        setdtopic(data.topic)
        setdlanguage(data.language)
        setclasss(data.class)
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
        // console.log(dsubject)
        setdstopic([]);
        const { data } = await axios.get(`${link}/get_subject_topics/${quest.Subject}`)
        setdtopic(data);
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }
    if(role=="admin" && quest.Subject  )
    fetchtopic()
  }, [quest.Subject])

  useEffect(() => {
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const role = usersdata.user.role
    const fetchstopic = async ()=>{
      try {
        const { data } = await axios.get(`${link}/get_subject_subtopics/${quest.Subject}/${quest.Topic}`)
        setdstopic(data)

      } catch(error){
        console.log( error)
      }
    }
    if(role=="admin" && quest.Topic && quest.Subject)
    fetchstopic()
  }, [quest.Topic])

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
        <UnstyledSelectObjectValues dropdownName={"Class"} listArray={classs} classList={"classChange"} add={false} value={"Class"} val={quest.Class} />
        <UnstyledSelectObjectValues dropdownName={"Subject"} listArray={dsubject} add={true} value={"Subject"} val={quest.Subject}/>
        <UnstyledSelectObjectValues dropdownName={"Topic"} listArray={dtopic} add={true} value={"Topic"} val={quest.Topic}/>
        <UnstyledSelectObjectValues dropdownName={"Sub topic"} listArray={dstopic}add={true} value={"Sub_topic"} val={quest.Sub_topic}/>
        <UnstyledSelectObjectValues dropdownName={"Level"} listArray={["Beginner", "Intermediate" , "Advance"]} add={false} value={"Level"} val={quest.Level}/>
        <UnstyledSelectObjectValues dropdownName={"Quiz Type"} listArray={["Multiple choice - Single answer", "Multiple choice - multiple answers", "Yes or No", "True or False"]} add={false} value={"Quiz_Type"} val={quest.Quiz_Type}/>

    </Box>
  )
}

export default SelectContainer
