/* eslint-disable */
import { Box } from '@mui/system'
import React, { useEffect, useRef } from 'react'

import { mainBoxStyle } from '../../../styles/style'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileWrapper from '../../ComponentsQuizz/ProfileWrapper';
import General from './General';
import IDPassword from './IDPassword';
import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import { State } from '../../Context/Provider';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';



const UserSetting = () => {
    const [value, setValue] = React.useState(0);
    const inputRef = useRef(null)
    const {userImage, setUserImage, link, usersdata} = State()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    dflex: {
      display: "flex",
    },
    bellIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    btnStyle:{
      borderRadius: "12px",
      cursor: "pointer",
      border: "none",
      fontSize: "18px",
      fontWeight: "500",
      textTransform: "capitalize",
      p: "10px 10px",
      "&:hover": {
        background: "#7A58E6",
      },
    }
  };
  
  const handleImageClick= ()=>{
    inputRef.current.click();
  }
  const handleImageUpload = (event)=>{
    const image = event.target.files[0]
    setUserImage(image)
  }
  const handleUploadImage = ()=>{
    const formData = new FormData();
    formData.append('user_image', userImage)
    const userID = usersdata.user.user_id
    axios
    .put(`${link}/update_user_profile/${userID}`,formData )
      .then((response) => {
        if (response.status === 200) {
          // setbool(!bool)
          enqueueSnackbar("Image updated successfully", {variant: 'success'})
          console.log("Image updated successfully");
          // setUserImage('')
          
        } else {
          alert("Error occured");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=>{
    const fetchUserImg =  async ()=>{
      try{
        const userID = await usersdata.user._id
       const {data} = await axios.get(`${link}/user/${userID}`)
       setUserImage(data.user_image)

      }catch(error){
        console.log('Error getting Image URL :', error)
      }
    } 
    fetchUserImg()
  }, [])
  return (
    <Box
    // style={style.dflex}
    sx={ mainBoxStyle.first
    }
  >
    <Box
      sx={mainBoxStyle.second}
    >
            <Box sx={{pb:''}} >
             <ProfileWrapper pageName="User Profile" />
             <Box>
            <Box sx={{background:'#fff', mt:'32px', borderRadius:'16px', p:'32px' }}>
              <Box sx={{display:'flex', alignItems:'center'}}>
                <Box sx={{ display:'flex', px:'25px', gap:'20px', alignItems:'center'}}>
                  <Box onClick={handleImageClick}>
                    {userImage?(
                        <Tooltip title='Click to Change Image'>
                        {typeof(userImage) === 'object'?
                        <img src={URL.createObjectURL(userImage)} style={{width:'200px', height:'200px', objectFit:'contain'}}></img>
                        :
                        <img src={`${link}/get_user_profile-image/${userImage}`} style={{width:'200px', height:'200px', objectFit:'contain'}}></img>
                    }
                        </Tooltip>
                      
                      ):( 
                        <Tooltip title='Click to Upload Image'>
                        <Avatar sx={{width:'200px', height:'200px', objectFit:'contain'}}></Avatar>
                        </Tooltip>
                        
                    )}

                    <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="question-image-upload"
                    />

                  </Box>
                {/* <label htmlFor="question-image-upload">
                
                </label> */}
                <Box sx={{ display:'flex', px:'25px', gap:'20px', alignItems:'center'}}>
                <Button disabled={typeof(userImage)=== 'string'} onClick={handleUploadImage} component="span" aria-label="Upload image" style={{background: "#7A58E6",color: "#FFF",padding:'10px 20px',}} sx={style.btnStyle}>Upload Image</Button>
                

                </Box>

                </Box>
              </Box>
                <Box sx={{ borderBottom: 1, borderColor: '#707070' }}>
                    <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="General" {...a11yProps(0)} />
                    <Tab label="ID & Password"{...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <General />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <IDPassword />
                </CustomTabPanel>

            </Box>
    </Box>
    </Box>
    </Box>
    </Box>
  )
}

export default UserSetting



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        
      >
        {value === index && (
          <Box sx={{ py: 5 }}>
            <Box >{children}</Box>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      style:{width:'50%', marginTop:'30px', fontSize:'21px'}
    };
  }
  