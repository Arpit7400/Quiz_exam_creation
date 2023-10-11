import { Box } from '@mui/system'
import React from 'react'

import { mainBoxStyle } from '../../../styles/style'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ProfileWrapper from '../../ComponentsQuizz/ProfileWrapper';
import General from './General';
import IDPassword from './IDPassword';
import { Avatar, Button, IconButton } from '@mui/material';
import userImg from '../../../Data/userImg.png'



const UserSetting = () => {
    const [value, setValue] = React.useState(0);

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
                <Avatar src={userImg} sx={{width:'200px', height:'200px', objectFit:'contain'}}></Avatar>
                <Box sx={{ display:'flex', px:'25px', gap:'20px'}}>
                <input
                type="file"
                accept="image/*"
                // onChange={(e) => handleImageUpload(e, null, 'question')}
                style={{ display: 'none' }}
                id="question-image-upload"
                />
                <label htmlFor="question-image-upload">
                <Button component="span" aria-label="Upload image" style={{background: "#7A58E6",color: "#FFF",padding:'10px 20px',}} sx={style.btnStyle}>Upload Image</Button>
                
                </label>
                <Button style={{background: "#F5F6F7",color: "#707070",padding:'10px 20px',}} sx={style.btnStyle}>Delete</Button>

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
            <Typography >{children}</Typography>
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
  