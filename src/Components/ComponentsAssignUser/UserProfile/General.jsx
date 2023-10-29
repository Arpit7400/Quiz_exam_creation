import { Button, FormControl, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { btnStyle, inputStyle } from "../../../styles/style";
import { Box } from "@mui/system";
import { State } from "../../Context/Provider";
import axios from "axios";


const General = () => {
  const{userData, setUserData, updateUser, userImage, link, usersdata} = State()
    const handleInputChange = (e)=>{
    const {name, value} = e.target
    setUserData({...userData, [name]: value} )
  }
  const handleSave = ()=>{
    var usersdata = JSON.parse(localStorage.getItem('user' )) ;
    const userId = usersdata.user.user_id

    const formData = new FormData();

    // formData.append('password', updateUser.oldPassword);
    // formData.append('new-password', updateUser.newPassword);
    formData.append('email', userData.email);
    formData.append('phone', userData.phoneno);
    formData.append('street', userData.street);
    formData.append('country', userData.country);
    formData.append('city', userData.city);
    formData.append('state', userData.state);
    formData.append('pincode', userData.pincode);
    // formData.append('user_image', userImage);

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
  useEffect(()=>{
    const fetchUser =  async ()=>{
      const userID = await usersdata.user._id
     const {data} = await axios.get(`${link}/user/${userID}`)
      setUserData({
        name:data.name,
        email:data.email,
        phoneno:data.phone,
        street:data.address.street,
        country:data.address.country,
        state:data.address.state,
        city:data.address.city,
        pincode:data.address.pincode,
      })
    } 
    fetchUser()
  }, [])
  return (
    <form
    onSubmit={(e)=>{
      e.preventDefault()
      handleSave()
    }}
    >
    <Box 
    sx={{
            display:'grid', gridTemplateColumns:'6fr 6fr', gridGap:'20px', 
            }}>
      <Input
      disabled
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
      required
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
      required
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
        required
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
      required
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
      required
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
      required
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
      required
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
        <Button type="submit" sx={{width:'50%', mt:'25px',}} style={btnStyle}>Save</Button>
    </Box>
    </form>
  );
};

export default General;
