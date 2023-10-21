import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import Hamburger from 'hamburger-react';

const ChatContext = createContext();

const Provider = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(true)
  const handleHamburger = ()=>{
    setToggleMenu(!toggleMenu)
  }
  const [activeTab, setActiveTab] = useState('Create Quiz');
  const [openPage, setOpenPage] = useState('')
  const handleOpenPage = (page)=>{
      setOpenPage(page)
  }
  const [updatePreviewQuestionExam, setUpdatePreviewQuestionExam] = useState(true)
  const handleUpdatePreviewQuestionExam = ()=>{
    setUpdatePreviewQuestionExam(!updatePreviewQuestionExam)
  }
  const [instruction, setInstruction] = useState('');
  const [eligiblity, setEligiblity] = useState('');
  const [learning, setLearning] = useState('');
  const [quest, setquest] = useState({
    Subject: "",
    Class: "",
    Topic: "",
    Sub_topic: "",
    Level: "",
    Quiz_Type: "",
    Language: "",
    
  });

  const [exam, setexam] = useState({
    Subject: "",
    Class: "",
    Topic: "",
    Level: "",
    perquest: "",
    assigned_time: "",
    Quiz_Type: "",
    Language: ""
  });

  const [examquest, setexamquest] = useState([]);
  const [editexam, seteditexam] = useState([]);

  const [examid, setexamid] = useState({id:null, qno:1});
  const link="http://34.131.15.235"
  const [dsubject, setdsubject] = useState([])
  const [dtopic, setdtopic] = useState([])
  const [dlanguage, setdlanguage] = useState([])
  const [dstopic, setdstopic] = useState([])
  const [bool, setbool] = useState(true)
  const [boo,setboo]= useState(true)
  const [questions, setQuestions] = useState([])
  const [Exams, SetExams]=useState([])
  const [subjects, setSubjects] = useState([])
  const [fdata, setfdata] = useState([])
  const [desubject, setdesubject] = useState([])
  const [destopic, setedstopic] = useState([])
  const [editid, seteditid] = useState({})
  const [user, setUser] = useState([])
  const [assign, setassign] = useState({
    fun: '',
    language: '',
    class: '',
    subject: '',
    Topic: '',
    user:''
  })
  const [btn,setbtn]=useState()
  const [dasubject, setdasubject] = useState([])
  const [datopic, setdatopic] = useState([])
  const [dalanguage, setdalanguage] = useState([])
  
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    phoneno:'',
    street:'',
    country:'',
    state:'',
    city:'',
    pincode:'',
  })
  const [updateUser, setUpdateUser] = useState({
    userId:'',
    oldPassword:'',
    newPassword:'',
  })
  const [userImage, setUserImage] = useState('')
    
 
  

  return (
    <ChatContext.Provider
      value={{
              Hamburger,
              handleHamburger,toggleMenu,
              activeTab,
              setActiveTab,
              handleOpenPage,
              quest,
              setquest,
              questions,
              subjects,
              setQuestions,
              dsubject,
              setdsubject,
        dtopic, setdtopic,
              dstopic, setdstopic,
        openPage, setOpenPage,
        exam, setexam,
        Exams, SetExams,
        examquest, setexamquest,
        examid, setexamid,
              bool,setbool,
              instruction, setInstruction,
              eligiblity, setEligiblity,
              learning, setLearning,
              updatePreviewQuestionExam,
        handleUpdatePreviewQuestionExam,
        desubject, setdesubject,
        destopic, setedstopic,
        boo,setboo,
        editexam, seteditexam,
        editid, seteditid,
        dlanguage, setdlanguage, setSubjects,
        user, setUser,
        assign, setassign,
        dasubject, setdasubject,
        datopic, setdatopic,
         dalanguage, setdalanguage,
         userData, setUserData,
         updateUser, setUpdateUser,
        userImage, setUserImage,
        btn, setbtn,
         link
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const State = () => {
  return useContext(ChatContext);
};

export default Provider;