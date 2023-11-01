/* eslint-disable */
import React from "react";
import { useState } from "react";
import Logo from '../../Data/logo.svg'
import Test707070 from './Test (3).png'
import TestWhite from './Test (2).png'
import { Box, List, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { State } from "../Context/Provider";
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

const Menu = () => {
  
  const navigate = useNavigate();
  const {setActiveTab, openPage, toggleMenu, handleHamburger,assignedUser } = State();
  let usersdata = JSON?.parse(localStorage?.getItem('user'));


  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab == 'tab1') {
       navigate("/admin");
    }
    else if(tab == 'tab2') {
       navigate("/admin/create-exam");
    }
    else {
      navigate("/admin/user/assign-user");
    }
  };
  
  return (
    <Box 
    sx={{
      background:'#fff',
      p:'18px 32px',
      height:'120vh',
      position:{
        xs: 'fixed',
        sm: "fixed",
        md: "sticky",
        lg: "sticky",
        xl: "sticky",
      },
      zIndex:{
        xs:'10',
        sm:'10'
      },
      top:'0',
      width:{
        xs:'70%',
        sm:'65%',
        md:'21%',
        lg:'15%',
      },
      transform:{
        xs:`translate3d(${toggleMenu==true?'-100%':'0%'}, 0%, 0px)`,
        sm:`translate3d(${toggleMenu==true?'-100%':'0%'}, 0%, 0px)`,
        md: "translate3d(0%, 0%, 0px)",
        lg: "translate3d(0%, 0%, 0px)",
        xl: "translate3d(0%, 0%, 0px)",
      },
      transitionDuration:'400ms'

    }}
    
    >
      
      {/* page logo  */}
      <Box sx={{textAlign:'center', pb:'30px' }}>
        <img style={{ width:'134px'}} src={Logo} alt="" />
      </Box>
      {/* menu list  */}
      <Box
       className="menu-wrapper"
      >
        <List >
          <li className={`tab ${openPage === 'Create Quiz' ? 'active' : ''}`} 

            onClick={() => {
            
            handleTabClick('tab1')
            handleHamburger()
          }} 
          >
            <img src={openPage==="Create Quiz"?TestWhite:Test707070} alt="" className="menuelog " />
            

            <p>Quiz</p>
          </li>
          <li className={`tab ${openPage === 'Create Exam' ? 'active' : ''}`} 
            onClick={() => {
              handleTabClick('tab2')
              handleHamburger()
            }}>
            {/* <img src={Exam} className="menuelog" alt="" /> */}
            <DescriptionIcon sx={{fontSize:'30px'}} htmlColor={`${openPage === 'Create Exam'?"#fff":"#707070"}`} />
            
            <p>Exam</p>
          </li>
            {assignedUser.role === 'admin' || usersdata.user.role ==='admin'?
            <>
           
          <li className={`tab ${openPage === 'Assign User' ? 'active' : ''}`} 
          onClick={() => {
            handleTabClick('tab3')
            handleHamburger()
            }}>
            {/* <img src={User} className="menuelog" alt="" /> */}
            <PersonIcon sx={{fontSize:'30px'}} htmlColor={`${openPage === 'Assign User'?"#fff":"#707070"}`} />
            <p>Assign user</p>
          </li>
          {(openPage==="Assign User"&&"Create User"&&"User Profile")?
          <Box sx={{textAlign:'left', ml:'56px', }}>
            <Link style={{textDecoration:'none'}} to='assign-user' >
              <Typography  sx={{font:'700 14px Poppins', color:'#707070', pt:'24px', cursor:'pointer'}}>Assign User</Typography>
            </Link>
            <Link style={{textDecoration:'none'}} to='create-user' >
              <Typography  sx={{font:'700 14px Poppins', color:'#707070', pt:'24px', cursor:'pointer'}}>Create User</Typography>
            </Link>
          </Box>
          :null}
           </>
           :null}
        </List>
      </Box>
    </Box>
  );
};

export default Menu;
