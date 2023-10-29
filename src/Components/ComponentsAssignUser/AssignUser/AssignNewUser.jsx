import React, { useEffect } from 'react'
import { Box, Button, Container } from '@mui/material'
import DropDown from './DropDown'
import SelectMenuAssign from './SelectMenuAssign'
import { State } from '../../Context/Provider'
import axios from 'axios'
import { btn } from '../../../styles/style'
const AssignNewUser = () => {
  const { assign,dasubject, setdasubject,
        datopic, setdatopic,
         dalanguage, setdalanguage, link} = State();
  const { user, setUser} = State();
  // setdalanguage(["English"])
  useEffect(() => {

    const fetchuSubject = async () => {
      try {
        const { data } = await axios.get(`${link}/get_all_subject_quizz`)
        // console.log(data)
        setdasubject([])
        data.forEach(object => {
          setdasubject(oldArray => [object.subject, ...oldArray])
        });
      } catch (error) {
        console.error('Error Fetching questions: ', error)
      }
    }

    const fetchuSubjecte = async () => {
      try {
        setdasubject([])
        const { data } = await axios.get(`${link}/get_all_subjects`)
        if(data)
         setdasubject(data)
      } catch (error) {
        console.error('Error Fetching questions: ', error)
      }
    }
    if (assign.fun == 'Quiz') {
      fetchuSubject()
    }
    else if (assign.fun == 'Exam') {
      fetchuSubjecte()
    }
  }, [assign.fun])
  
  useEffect(()=>{
    const fetchQuestions = async ()=>{
      try {
        
        const { data } = await axios.get(`${link}/get_languages`)
        // console.log(data)
        if(data)
        setdalanguage(data)
      } catch(error){
        console.error('Error Fetching questions: ', error)
      }
    }

    if (assign.fun == 'Quiz') {
      fetchQuestions()
    }
    else if (assign.fun == 'Exam') {
      // fetchuSubjecte()
    }
    
  }, [assign.fun])

  useEffect(() => {

    const fetchuSubject = async () => {
      try {
        const { data } = await axios.get(`${link}/get_subject_topics/${assign.subject}`)
        if(data)
         setdatopic(data)
      } catch (error) {
        console.error('Error Fetching questions: ', error)
      }
    }

    const fetchuSubjecte = async () => {
    }
    if (assign.fun == 'Quiz' && assign.subject) {
      fetchuSubject()
    }
    else if (assign.fun == 'Exam' && assign.subject) {
      fetchuSubjecte()
    }
  }, [assign.subject])
  
  const handleAssign = () => {
    const formData = new FormData();
    formData.append('category',assign.fun);
    formData.append('language',assign.language);
    formData.append('class',assign.class);
    formData.append('subject',assign.subject);
    formData.append('topic',assign.Topic);
    const userid=assign.user
    axios
        .put(`${link}/assign_user/${userid}`, formData)
        .then((response) => {
          if (response.status === 200) {
            console.log("Data added successfully");
            
          }
          else {
            console.log(response);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
  }
  return (
    <Box
      
      sx={{
        width:'100%',

        display:"flex",
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        pt:'100px'
      }} 
      >
        <Container maxWidth="xs"
        className='fill-details assign-user-fill'
        sx={{
          p:'42px 42px !important',
          borderRadius:'24px',
          display:'flex',
          alignItems:'center',

        }}
        >
          <SelectMenuAssign dropdownName={"Function"} value={"fun"} listArray={['Quiz', 'Exam']} add={false} />
          <SelectMenuAssign dropdownName={"Language"} value={"language"}  listArray={dalanguage} add={true} />
          <SelectMenuAssign dropdownName={"Class"} value={"class"} listArray={["1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12"]} add={false} />
          <SelectMenuAssign dropdownName={"Subject"} value={"subject"} listArray={dasubject} add={true} />
          <SelectMenuAssign dropdownName={"Topic"} value={"Topic"} listArray={datopic} add={true} />
          <SelectMenuAssign dropdownName={"Select User"} value={"user"} listArray={user} add={false} />
          
        </Container>
        <Box>
        <Button
          onClick={handleAssign}
          sx={btn.primary}
          >Assign User</Button>
        </Box>

      </Box>
  )
}

export default AssignNewUser
