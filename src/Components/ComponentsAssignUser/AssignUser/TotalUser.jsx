import { Box, Typography } from '@mui/material'
import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import AddNewUser from './AddNewUser'
import UserList from './UserList'
import { State } from '../../Context/Provider'

const TotalUser = () => {
    // const [user, setUser] = useState([])
    const { user, setUser, link} = State();
    const [showAddUser, setShowAddUser] = useState(false);

    const toggleShowAddUser = () => {
        setShowAddUser(prevShowAddUser => !prevShowAddUser);
    };
      
    useEffect(() => {
    axios.get(`${link}/user`).then(
        // &limit=10
    (response) => {
        setUser(response.data);
    }
  ).catch((error) => {
      console.error(error);
    });
  }, []);
    
  return (
    <Box >
      <Box sx={{m:'0px 12px 32px 12px'}} className="amount-wrapper">
        <p className="price-heading">Total Users</p>
        <p className="price-count">{user.length}</p>
      </Box>

      <Box>
        <Box sx={{display:'flex', justifyContent:'space-between', mb:'16px', alignItems:'center'}}>
            <Typography sx={{color:'#707070', fontSize:'20px', fontWeight:'700'}}>Users</Typography>
            <Typography 
            sx={{color:'#7A58E6', fontSize:'24px', cursor:'pointer'}}
            onClick={toggleShowAddUser}
            >
                +
            </Typography>
        </Box>
        {showAddUser ? <AddNewUser user={user} setUser={setUser} toggleShowAddUser={toggleShowAddUser} /> : <UserList user={user} />}

        
        
      </Box>
    </Box>
  )
}

export default TotalUser
