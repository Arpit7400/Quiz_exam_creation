import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StyledArea from './StyledArea';
import { useState } from 'react';
import { State } from '../../Context/Provider';
import { qStyle } from '../../../styles/style';

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
        <Box sx={{ p: 0 }}>
          <Box>{children}</Box>
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
  };
}

export default function Instructions() {
  const {instruction, setInstruction,    eligiblity, setEligiblity,    learning, setLearning,} = State()
  const [value, setValue] = useState(0);
  

  const handleChange = (event, newValue) => {
    
    setValue(newValue);
  };
  const btnStyle={
    borderRadius:'12px',
    height:'64px',
    fontSize:'20px',
    fontWeight:'700',
    border:'none',
    textTransform:'capitalize'
  }
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <Box sx={qStyle.question}>
    
    <Box sx={{ width: '100%' }}>
      <Box className='instructions-exam'>
        <Tabs sx={{
                borderRadius:'16px',
                width:'100%',
                mb:'49px',
                border:'none',
                background:'#F5F6F7',
                boxShadow:'none'
                
            }} 
          value={value} onChange={handleChange}>
          <Tab disableFocusRipple 
          disableTouchRipple 
          color='#fff'
          sx={{
            borderRadius:'12px',
            height:'64px',
            fontSize:'20px',
            fontWeight:'700',
            border:'none',
            textTransform:'capitalize',
            width:'100%',
            width:'100%',
            color: activeTab === 'tab1' ? '#FFF' : '#707070',
            fontWeight: activeTab === 'tab1' ? '700' : '400',
            background: activeTab === 'tab1' ? '#7A58E6' : 'transparent',
            '&:hover': {
            background: activeTab === 'tab1' ? '#7A58E6' : 'transparent',
            }   
          }} 
          className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1')}
          label="Instruction" {...a11yProps(0)} />

          <Tab sx={{
            borderRadius:'12px',
            height:'64px',
            fontSize:'20px',
            fontWeight:'700',
            border:'none',
            textTransform:'capitalize',
            color: activeTab === 'tab2' ? '#FFF' : '#707070',
            fontWeight: activeTab === 'tab2' ? '700' : '400',
            background: activeTab === 'tab2' ? '#7A58E6' : 'transparent',
            '&:hover': {
            background: activeTab === 'tab2' ? '#7A58E6' : 'transparent',
            }   
            
            }} 
            className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab2')}
            label="Eligiblity" {...a11yProps(1)} />
          <Tab sx={{
            borderRadius:'12px',
            height:'64px',
            fontSize:'20px',
            fontWeight:'700',
            border:'none',
            textTransform:'capitalize',
            width:'100%',
            color: activeTab === 'tab3' ? '#FFF' : '#707070',
            fontWeight: activeTab === 'tab3' ? '700' : '400',
            background: activeTab === 'tab3' ? '#7A58E6' : 'transparent',
            '&:hover': {
            background: activeTab === 'tab3' ? '#7A58E6' : 'transparent',
            }   
            
          }}
          className={`tab ${activeTab === 'tab3' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab3')}
          label="Learning" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <StyledArea value={instruction} setValue={setInstruction} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <StyledArea value={eligiblity} setValue={setEligiblity} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <StyledArea value={learning} setValue={setLearning} />
      </CustomTabPanel>
    </Box>
    </Box>
  );
}