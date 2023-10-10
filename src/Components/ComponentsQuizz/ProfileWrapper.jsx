import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import React from 'react'
import userImg from '../../Data/userImg.png'
import { State } from '../Context/Provider';
import { styleProfile } from '../../styles/style';
const style ={
    dflex:{
        display:'flex'
    },
    bellIcon:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'34px', border:'3px solid #4F78FE',
        objectFit:'contain'
    }
}

const ProfileWrapper = ({pageName}) => {
    const {setOpenPage, Hamburger, handleHamburger} = State()
    setOpenPage(pageName)

    
  return (
    <Box style={style.dflex} sx={{justifyContent:'space-between', width:'100%', alignItems:'center'}}>
    <Typography sx={styleProfile.pageName}>{pageName}</Typography>
    <Box style={style.dflex} sx={styleProfile.menuGap}>

        <Box style={style.bellIcon} sx={styleProfile.topIcon}>
            <CircleNotificationsIcon sx={{fontSize:'32px', color:'#4F78FE'}} />
        </Box>

        <Box 
            onClick={()=>{
            }}
        >
            <Avatar 
                src={userImg}
                style={{borderRadius:'300px', cursor:'pointer', objectFit:'contain'}}
                sx={styleProfile.topIcon}   
            />
        </Box>
        <Box onClick={handleHamburger} sx={{
            display:{
                xs: 'block',
                sm: "block",
                md: "none",
                lg: "none",
                xl: "none",
            }
        }}>

            <Hamburger />

        </Box>
    </Box>
    </Box>
  )
}

export default ProfileWrapper
