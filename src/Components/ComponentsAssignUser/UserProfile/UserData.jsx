import { Image } from '@mui/icons-material'
import { Avatar, Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import userImg from './userImg.png'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { sideDetail } from '../../../styles/style';

const UserData = () => {
  return (
    <Box>
        <Box sx={{ mb:'35px', textAlign:'-webkit-center' }}>
          <Avatar src={userImg} 
            alt="User Image"
            style={{
            width: "300px",
            height: "300px",
            borderRadius:'16px',
            backgroundColor: '#fff',
          }}
          />
          <Typography sx={{pt:'25px', font:'500 24px Poppins'}}>User Name</Typography>
        </Box>

        <Box sx={{ display:'flex',alignItems:'center', flexDirection:'column', pb:'39px', borderBottom:'2px solid #707070'}}>
          <Typography sx={{alignSelf:'start', font:'500 20px Poppins'}}>Task Progress</Typography>
          <LinearProgress 
            variant="determinate"
            value="90"
            sx={{
              my:'32px',
              width: '90%',
              borderRadius: '5px',
              height: '10px',
              backgroundColor: '#D9D9D9',
              '& .MuiLinearProgress-bar': {
                borderRadius: '5px',
                backgroundColor: '#00E15A', // Green color for progress
              },
            }}
          />

          <Box sx={{display:'flex', justifyContent:'space-between', width:'80%'}}>
            <Box >
              <Typography sx={{font:'500 14px Poppins', color:'#707070'}}>Complete</Typography>
              <Typography sx={{font:'500 24px Poppins', color:'#383838'}}>24</Typography>
            </Box>
            
            <Box >
              <Typography sx={{font:'500 14px Poppins', color:'#707070'}}>On progress</Typography>
              <Typography sx={{font:'500 24px Poppins', color:'#383838'}}>04</Typography>
            </Box>

            <Box >
              <Typography sx={{font:'500 14px Poppins', color:'#707070'}}>Pending</Typography>
              <Typography sx={{font:'500 24px Poppins', color:'#383838'}}>08</Typography>
            </Box>
          </Box>

        </Box>

        <Box sx={{mt:'56px'}} >
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'start', gap:'24px', pb:'30px'}}>
            <Box sx={{p:'14px', bgcolor:'#F5F6F7', borderRadius:'8px'}}>
                <MailOutlinedIcon />
            </Box>
            <Box sx={{textAlign:'start'}}>
              <Typography sx={{font:'500 14px Poppins', color:'#707070', mb:'8px'}}>Email</Typography>
              <Typography sx={{font:'500 20px Poppins'}}>user@example.com</Typography>
            </Box>
          </Box>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'start', gap:'24px', pb:'30px'}}>
            <Box sx={{p:'14px', bgcolor:'#F5F6F7', borderRadius:'8px'}}>
                <LocalPhoneOutlinedIcon />
            </Box>
            <Box sx={{textAlign:'start'}}>
              <Typography sx={{font:'500 14px Poppins', color:'#707070', mb:'8px'}}>Phone</Typography>
              <Typography sx={{font:'500 20px Poppins'}}>+91 7878787878</Typography>
            </Box>
          </Box>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'start', gap:'24px', pb:'30px'}}>
            <Box sx={{p:'14px', bgcolor:'#F5F6F7', borderRadius:'8px'}}>
                <LocationOnOutlinedIcon />
            </Box>
            <Box sx={{textAlign:'start'}}>
              <Typography sx={{font:'500 14px Poppins', color:'#707070', mb:'8px'}}>Gurgaon, Hariyana-545454</Typography>
              <Typography sx={{font:'500 20px Poppins'}}>user@example.com</Typography>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default UserData
