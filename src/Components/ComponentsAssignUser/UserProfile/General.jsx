import { Button, FormControl, Input } from "@mui/material";
import React, { useState } from "react";
import { btnStyle, inputStyle } from "../../../styles/style";
import { Box } from "@mui/system";
import { State } from "../../Context/Provider";
import axios from "axios";


const General = () => {
  const{userData, setUserData, updateUser, userImage, link} = State()
    const handleInputChange = (e)=>{
    const {name, value} = e.target
    setUserData({...userData, [name]: value} )
  }
  const handleSave = ()=>{
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const userId = usersdata.user.user_id
    console.log(userId)

    const formData = new FormData();

    formData.append('password', updateUser.oldPassword);
    formData.append('new-password', updateUser.newPassword);
    formData.append('email', userData.email);
    formData.append('phone', userData.phoneno);
    formData.append('street', userData.street);
    formData.append('country', userData.country);
    formData.append('city', userData.city);
    formData.append('state', userData.state);
    formData.append('pincode', userData.pincode);
    formData.append('user_image', userImage);

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
            display:'grid', gridTemplateColumns:'6fr 6fr', gridGap:'20px', 
            }}>
      <Input
      name="name"
      required
        disableUnderline ={true}
        placeholder="Name"
        multiline
        fullWidth
        value={userData.name}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      name="email"
        disableUnderline ={true}
        placeholder="email"
        multiline
        fullWidth
        value={userData.email}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      name="phoneno"
        disableUnderline ={true}
        placeholder="Phone no."
        multiline
        fullWidth
        value={userData.phoneno}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
        name="street"
        disableUnderline ={true}
        placeholder="Address"
        multiline
        fullWidth
        value={userData.street}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      name="country"
        disableUnderline ={true}
        placeholder="Country"
        multiline
        fullWidth
        value={userData.country}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      name="state"
         disableUnderline ={true}
         placeholder="State"
         multiline
         fullWidth
         value={userData.state}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      name='city'
       disableUnderline ={true}
       placeholder="City"
       multiline
       fullWidth
       value={userData.city}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
      <Input
      name="pincode"
       disableUnderline ={true}
       placeholder="Pincode"
       multiline
       fullWidth
       value={userData.pincode}
        onChange={handleInputChange}
        style={inputStyle}
        sx={{
          color: "var(--grey, #707070)",
        }}
      />
    </Box>
    <Box textAlign={'end'}>
        <Button type="submit" onClick={handleSave} sx={{width:'50%', mt:'25px',}} style={btnStyle}>Save</Button>
    </Box>
    </>
  );
};

export default General;
