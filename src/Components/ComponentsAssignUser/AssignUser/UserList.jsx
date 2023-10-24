import React from 'react'
import { Box, Typography  } from '@mui/material'
import userlogo from './userlogo.png'
import { Link, useNavigate } from 'react-router-dom'

const UserList = ({user}) => {
  const navigate = useNavigate()

  return (
    <Box>   
        {user 
        ? user.map((user, index)=>{
            return(
                <Link key={index} to={`/user/${user._id}`} style={{textDecoration:'none'}}>
                <Box sx={{bgcolor:'#F5F6F7', cursor:'pointer', borderRadius:'10px', p:'6px 14px',m:'16px 0px', display:'flex', flexDirection:'column', gap:'5px'}}>
                <Typography sx={{color:'#707070', fontSize:'20px', }}>User Name : <span>{user.name}</span></Typography>
                <Typography sx={{color:'#707070', fontSize:'20px', }}>User Id : <span>{user.user_id}</span></Typography>
                </Box>
                </Link>
            )
        }):null}
        </Box>
  )
}

export default UserList
