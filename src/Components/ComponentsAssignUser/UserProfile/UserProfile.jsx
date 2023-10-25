import React, { useState } from 'react'
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'
import UserDataBox from './UserDataBox'
import ProfileWrapper from '../../ComponentsQuizz/ProfileWrapper'
import { mainBoxStyle, sideDetail } from '../../../styles/style'
import UserData from './UserData'
import UserSetting from './UserSetting'
import { Outlet, useParams } from 'react-router-dom'



const UserProfile = () => {
  const {userId} = useParams()
  console.log(userId)
  
  const style = {
    dflex: {
      display: "flex",
    },
    bellIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  
   return (
    <Box
    style={style.dflex}
    sx={ mainBoxStyle.first
    }
  >
    <Box
      sx={mainBoxStyle.second}
    >
            <Box >
             <ProfileWrapper pageName="User Profile" />
             <Box>

             <Box sx={{display:'flex', justifyContent:'space-between', mt:'70px', flexWrap:'wrap'}}>
                <UserDataBox name={"Total Task"} number={"1,000"} />
                <UserDataBox name={"Complete"} number={"500"} />
                <UserDataBox name={"Working"} number={"100"} />
                <UserDataBox name={"Pending"} number={"400"} />
             </Box>
            <Box sx={{width:{md:'50%'}, bgcolor:'#fff', borderRadius:'8px', mt:'30px'}}>
                <Button sx={{fontSize:'16px', bgcolor:'#7A58E6', color:'#fff', textTransform:'capitalize', borderRadius:'8px' }}>instruction</Button>
                <Button sx={{fontSize:'16px', bgcolor:'#fff', color:'#7A58E6', textTransform:'capitalize', borderRadius:'8px' }}>instruction</Button>
                <Button sx={{fontSize:'16px', bgcolor:'#fff', color:'#7A58E6', textTransform:'capitalize', borderRadius:'8px' }}>instruction</Button>
            </Box>
            <Box sx={{background:'#fff', height:{ xs:'663px' }, mt:'32px', borderRadius:'16px', p:'32px' }}>
                <Typography sx={{fontSize:'20px', fontWeight:'700px', fontFamily:'Poppins', color:'#707070', pb:'15px'}}>Working</Typography>
                <Divider style={{ opacity: 0.5, height: 1, backgroundColor: '#707070' }} />
                <Box sx={{}}>
                    <Typography sx={{fontSize:'20px', fontWeight:'700px', fontFamily:'Poppins', color:'#707070', pl:'22px', py:'24px'}}>Creating science exam</Typography>
                    <Divider style={{ opacity: 0.5, height: 1, backgroundColor: '#707070' }} />
                    <Typography sx={{fontSize:'20px', fontWeight:'700px', fontFamily:'Poppins', color:'#707070', pl:'22px', py:'24px'}}>Creating science exam</Typography>
                    <Divider style={{ opacity: 0.5, height: 1, backgroundColor: '#707070' }} />
                </Box>
            </Box>
             </Box>
         
              
            </Box>
          

            </Box>
            <Box sx={sideDetail.first}>
            <UserData />

            </Box>
     </Box>
   )
}

export default UserProfile
