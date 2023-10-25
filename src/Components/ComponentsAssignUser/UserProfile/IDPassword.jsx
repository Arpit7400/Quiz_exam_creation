import { Button, FormControl, Input } from "@mui/material";
import React, { useState } from "react";
import { btnStyle, inputStyle } from "../../../styles/style";
import { Box } from "@mui/system";
import { State } from "../../Context/Provider";
import axios from "axios";


const IDPassword = () => {
  const {updateUser, setUpdateUser, userData, userImage, link} = State()
  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setUpdateUser({...updateUser, [name]:value})
  }

  const handleHave = ()=>{
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const userId = usersdata.user.user_id
    console.log(userId)

    const formData = new FormData();

    formData.append('password', updateUser.oldPassword);
    formData.append('new-password', updateUser.newPassword);
    formData.append('email', userData.email);
    formData.append('phone', userData.phoneno);
    formData.append('street', userData.address);
    formData.append('country', userData.country);
    formData.append('city', userData.city);
    formData.append('state', userData.state);
    formData.append('pincode', userData.pincode);
    formData.append('user_image', userImage);
    // console.log(updateUser)
    // console.log(userImage)
    // console.log(userData)

    // console.log(formData)
    axios
    .put(`${link}/update_user_profile/${userId}`, formData)
        .then((response) => {
          if (response.status === 200) {
            // setbool(!bool)
            console.log("Data updated successfully");
            
          } else {
            alert("Error occured");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
  }
  return (
    <>
    <Box 
    sx={{
            display:'grid', gridGap:'20px', 
            }}>
      <Input
      name="userId"
      required
        disableUnderline
        placeholder="User ID"
        fullWidth
        value={updateUser.userId}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      type="password"
      name="oldPassword"
        disableUnderline
        placeholder="Old Password"
        fullWidth
        value={updateUser.oldPassword}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      type="password"
      name="newPassword"
        disableUnderline
        placeholder="New Password"
        fullWidth
        value={updateUser.newPassword}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
    </Box>
    <Box textAlign={'end'}>
        <Button type="submit" onClick={handleHave} sx={{width:'50%', mt:'25px',}} style={btnStyle}>Save</Button>
    </Box>
    </>
  );
};

export default IDPassword;
