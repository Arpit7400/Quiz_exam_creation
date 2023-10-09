import {  Button,  Dialog,  DialogActions,  DialogContent,  DialogTitle,  FormControlLabel,  IconButton,  Input,  Radio,  TextField,  Tooltip,  Typography, Zoom, tooltipClasses,} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ClearIcon from "@mui/icons-material/Clear";
import userImg from "../../../../Data/userImg.png"
const SingleAns = ({ open, setOpen,}) => {

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [question, setQuestion] = useState({ text: "", image: null });
  const [options, setOptions] = useState([
    { text: "", image: null },
    { text: "", image: null },
    { text: "", image: null },
    { text: "", image: null },
  ]);

  const handleQuestionChange = (event) => {
    setQuestion({ ...question, text: event.target.value });
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].text = event.target.value;
    setOptions(newOptions);
  };

  const handleRadioChange = (event, index) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setCorrectAnswerIndex(index);
  };

  const handleDeleteImage = (type) => {
    if (type === "question") {
      setQuestion({ ...question, image: null });
    } else if (type === "option") {
      const newOptions = options.map((option, index) => {
        if (index === correctAnswerIndex) {
          return { ...option, image: null };
        }
        return option;
      });
      setOptions(newOptions);
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, { text: "", image: null }];
    setOptions(newOptions);
  };

  const handleImageUpload = (event, index, type) => {
    const newOptions = [...options];
    if (type === "question") {
      setQuestion({ ...question, image: event.target.files[0] });
    } else if (type === "option") {
      newOptions[index].image = event.target.files[0];
      setOptions(newOptions);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    handleClose();
    console.log(options)
    console.log(question)
    console.log(correctAnswerIndex)


  };
  const [isHovered, setIsHovered] = useState(false);
  

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '400px',
    },
  });
  return (
    
      
     
        <Box display="flex" flexDirection="column" alignItems="center" width="100%"
          sx={{background: "#fff",width: "100%",borderRadius: "40px", padding:'56px 48px'}}>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center", mb:'20px' }}>
          <CustomWidthTooltip
            title={<img src={userImg} alt="User Image" style={{ height: '400px', width: '400px', objectFit: 'contain' }} /> }
            arrow
            open={isHovered}
            onClose={handleMouseLeave}
            disableFocusListener
            disableTouchListener
            placement="left-start"
            ransitionComponent={Zoom}
            >
            <img
                src={userImg}
                alt="User Image"
                style={{ height: '80px', width: '80px', objectFit: 'contain', marginRight: '12px' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            </CustomWidthTooltip>
            {/* <img style={{ height: "80px", width: "80px", objectFit: "contain", marginRight:'12px' }} src={userImg} /> */}
            <Box sx={{ display: "grid", width: "100%", gridTemplateColumns: "11fr 1fr", alignItems: "center",}}>
                  <TextField
                    label={"Question"}
                    InputProps={{ disableUnderline: true, style: { background:'#EFF3F4', paddingLeft: '10px', borderRadius:'12px'} }}
                    multiline
                    fullWidth
                    minRows={1}
                    variant="filled"
                    
                    value={question.text}
                    onChange={handleQuestionChange} 
                  />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, null, 'question')}
                style={{ display: "none" }}
                id="question-image-upload"
              />
              <label htmlFor="question-image-upload">
                <IconButton component="span" aria-label="Upload image">
                  <AddPhotoAlternateIcon sx={{ fontSize: "30px" }} />
                </IconButton>
              </label>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "12fr",
              gridRowGap:'15px'
            }}
          >
            {options.map((option, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  width: "100%",
                }}
              >
                <img
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "contain",
                    marginRight:'12px',
                  }}
                  src={userImg}
                ></img>
                <FormControlLabel
                  value={index.toString()}
                  sx={{margin:'0px'}}
                  control={
                    <Radio
                    sx={{padding:'0px'}}
                      checked={correctAnswerIndex === index}
                      onClick={(e) => handleRadioChange(e, index)}
                    />
                  }
                  label=""
                  labelPlacement="start"
                />

                <TextField
                  label={`Option ${index + 1}`}
                  InputProps={{ disableUnderline: true, style: { background:'#EFF3F4', paddingLeft: '10px', borderRadius:'12px' } }}
                  multiline
                  minRows={1}
                  variant="filled"
                  fullWidth
                  value={option.text}
                  onChange={(e) => handleOptionChange(e, index)}
                  sx={{ml: "10px" }}
                />
                <Box sx={{}} display="flex" alignItems="center">
                  {/* {option.image && (
                        <IconButton
                            onClick={() => handleDeleteImage('option')}
                            aria-label={`Delete image for Option ${index + 1}`}
                            s
                        >
                            <DeleteOutlineIcon size="large" />
                        </IconButton>
                        )} */}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index, "option")}
                    style={{ display: "none" }}
                    id={`option-image-upload-${index}`}
                  />
                  <label htmlFor={`option-image-upload-${index}`}>
                    <IconButton
                      component="span"
                      aria-label={`Upload image for Option ${index + 1}`}
                    >
                      <AddPhotoAlternateIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  </label>
                  <IconButton
                    onClick={() => handleDeleteOption(index)}
                    aria-label={`Clear Option ${index + 1}`}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "12fr",
              justifyContent: "center",
              mt: "10px",
              width: "100%",
            }}
          >
            <span></span>

            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Box></Box>
            
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "#7A58E6",
                  font: "700 17px Poppins",
                  alignSelf: "center",
                  mt:'10px'
                }}
                onClick={handleAddOption}
                aria-label="Add option"
              >
                Add Another Options
              </Typography>
            </Box>
            <Box sx={{textAlign:'center', mt:'10px'}}>
                <Button
                sx={{
                    width: "25%",
                    borderRadius: "12px",
                    background: "#7A58E6",
                    color: "#FFF",
                    fontSize: "18px",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#7A58E6",
                    },
                  }}
                onClick={() => {
                    // handleUpdate();
                    // handlePostQuestion()
                }}
                color="primary"
                >
                Update
                </Button>

            </Box>
          </Box>
        </Box>
        


  );
};

export default SingleAns;
