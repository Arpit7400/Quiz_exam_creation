import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Grid,
  Typography
} from '@mui/material';


import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { inputStyle, mainBoxStyle, selectStyle } from '../../../styles/style';
import axios from 'axios';
import { State } from '../../Context/Provider'


const CreateUser = () => {
    const { user, setUser, link} = State();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');

  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState('User Id is required.');
  const passwordErrorMsg = 'Password is required.';
  const retypePasswordErrorMsg = 'Passwords do not match.';

  const [passwordStrength, setPasswordStrength] = useState('weak');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const passwordMatch = password === reTypePassword;

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleFullNameChange = (e) => {
    const fullNameValue = e.target.value;
    const formattedFullName = fullNameValue
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    setFullName(formattedFullName);
    setFullNameError(false);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const emailPattern = /^[^\s@]{6,}$/;

    if (value === '') {
      setEmailError(true);
      setEmailErrorMsg('User Id is required.');
    } else if (!emailPattern.test(value)) {
      setEmailError(true);
    } else if(value.length<6){
      setEmailError(true)
      setEmailErrorMsg("At least 6 letters")
    }
    else {
      setEmailError(false);
    }

    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(false);

    if (newPassword.length === 0) {
      setPasswordStrength('weak');
    } else if (newPassword.length < 8) {
      setPasswordStrength('weak');
    } else if (newPassword.length < 12) {
      setPasswordStrength('moderate');
    } else {
      setPasswordStrength('strong');
    }
  };
  const handleReTypePasswordChange = (e)=>{
    setReTypePassword(e.target.value)
  }

  const validateForm = () => {
    const isFullNameValid = fullName.trim() !== '';
    const isEmailValid = /^[^\s@]{6,}$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
    const isRetypePasswordValid = password === reTypePassword; 

    return isFullNameValid && isEmailValid && isPasswordValid && isRetypePasswordValid;
  };

  const handleSubmit = () => {
    let temp = {
          name: fullName,
          user_id: email,
          password: password
    };
    if (!validateForm()) {
      setFullNameError(fullName.trim() === '');
      setEmailError(!/^[^\s@]{6,}$/.test(email));
      setPasswordError(password.trim() === '');
    } else {
      setRegistrationSuccess(true);
      axios
      .post(`${link}/user`, {
        name: fullName,
        user_id: email,
        password: password
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
    }
  };

  
  const handleDismiss = () => {
    setRegistrationSuccess(false);
    setFullName('');
    setEmail('');
    setPassword('');
    setReTypePassword('');
  };


  return (
    
    <Box
      
sx={{
  width:'100%',

  display:"flex",
  justifyContent:'center',
  flexDirection:'column',
  alignItems:'center',
  pt:'100px'
}} 

>
      <Box sx={selectStyle.second} style={{background:'#fff', padding:'42px', borderRadius:'30px'}}    >
      <Box container direction="column" alignItems="center">
        <Box >
          <FormControl fullWidth>
            <Input
            required
              sx={inputStyle}
              disableUnderline ={true}
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              onFocus={() => setFullNameError(false)}
              placeholder="Name"
              error={fullNameError}
            />
            {fullNameError && <Typography color="error">Full name is required.</Typography>}
          </FormControl  >
        </Box>
        <Box >
          <FormControl fullWidth >
            <Input
            required
            sx={inputStyle}
            disableUnderline ={true}
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setEmailError(false)}
              placeholder="User ID"
              error={emailError}
            />
        {emailError && <Typography color="error">{emailErrorMsg}</Typography>}
          </FormControl>
        </Box>
        <Box >
          <FormControl fullWidth>
            <Input
            required
            sx={inputStyle}
              disableUnderline ={true}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordError(false)}
              placeholder="********"
              error={passwordError}
              endAdornment={
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />
            {passwordError && <Typography color="error">{passwordErrorMsg}</Typography>}
            {password && (
              <Typography
                color={
                  passwordStrength === 'weak'
                    ? 'error'
                    : passwordStrength === 'moderate'
                    ? 'warning'
                    : 'success'
                }
              >
                Password Strength: {passwordStrength}
              </Typography>
            )}
          </FormControl>
        </Box>
        <Box >
          <FormControl fullWidth>
            <Input
              required
              sx={inputStyle}
              disableUnderline ={true}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={reTypePassword}
              onChange={handleReTypePasswordChange}
              onFocus={() => setPasswordError(false)}
              placeholder="********"
              error={retypePasswordErrorMsg}
            />
                  {!passwordMatch && (
        <Typography color="error">{retypePasswordErrorMsg}</Typography>
      )}

          </FormControl>
        </Box>
        <Box >
          <Button
          type='submit'
          sx={{
            mt:'20px',
            width: "375px",
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
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            // disabled={!validateForm()}
          >
            Create User
          </Button>
        </Box>
      </Box>

      {registrationSuccess && (
        <Box p={4} mt={4}  borderRadius="md">
          <Typography>Successfully registered!</Typography>
          <Button
            mt={2}
            variant="contained"
            onClick={handleDismiss}
          >
            Dismiss
          </Button>
        </Box>
      )}
    </Box>
    </Box>
  );
};

export default CreateUser;
