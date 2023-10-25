import React, { useState } from 'react'
import { Box, FormGroup, Input, Button } from '@mui/material'
import axios from 'axios';
import { State } from '../../Context/Provider';

const AddNewUser = ({user, setUser, toggleShowAddUser}) => {
    // const [user, setUser] = useState([])
    const {link} = State()
    const [note, setnote] = useState({
        name: "",
        email: "",
        password: "",
      });

    const inputStyle={
        padding: "14px 27px",
        borderRadius: "12px",
        background: "#EFF3F4",
        width: "100%",
        border: "none",
        marginBottom: "18px",
    }

    const InputEvent = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setnote((prevData) => {
          return {
            ...prevData,
            [name]: value,
          };
        });
      };
      const addNewUser = () => {
        let temp = {
          name: note.name,
          user_id: note.email,
          password: note.password
        };
        
        axios
        .post(`${link}/user`, {
          name: note.name,
          user_id: note.email,
          password: note.password
        })
        .then((response) => {
          if (response.status === 200) {
            // Success
            setUser([temp,...user]);
            console.log(response);
          } else {
            alert("Error occured");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
        
      };
  return (
    <Box>
    <FormGroup>
        <Input 
            disableUnderline ={true}
            style={inputStyle} 
            name='name' type='text' 
            placeholder='User Name' 
            onChange={InputEvent}
            value={note.name}
        />
        <Input 
            disableUnderline ={true} 
            name='email' type='email' 
            style={inputStyle} 
            placeholder='User ID' 
            onChange={InputEvent}
            value={note.email}
        />
        <Input 
            disableUnderline ={true} 
            name='password' type='password' 
            style={inputStyle} 
            placeholder='Password' 
            onChange={InputEvent}
            value={note.password}
        />
        <Button
            onClick={()=>{
              addNewUser()
              toggleShowAddUser()
            }}
            sx={{
                width: "100%",
                borderRadius: "12px",
                background: "#7A58E6",
                cursor: "pointer",
                border: "none",
                color: "#FFF",
                fontSize: "18px",
                fontWeight: "500",
                textTransform: "capitalize",
                p: "10px 10px",
                "&:hover": {
                  background: "#7A58E6",
                },
              }}
        >Create User</Button>
    </FormGroup>
</Box>
  )
}

export default AddNewUser
