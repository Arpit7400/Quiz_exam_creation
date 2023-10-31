/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Select, selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { OptionGroup } from '@mui/base/OptionGroup';
import { Popper } from '@mui/base/Popper';
import { Box, fontSize, styled } from '@mui/system';
// import { useState } from 'react';
import {State} from "../../Context/Provider"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';

export default function SelectMenuExam({dropdownName,listArray,add,value,val }) {
  const style = (dropdownName == "Language") ? "#fff" :(dropdownName == "Exam Question Type")? '#fff' :(dropdownName == "Topic Quiz Type")? "#fff": '#F5F6F7'
  const index = (dropdownName == "Subject")?0:(dropdownName =="Topic")?1:(dropdownName == 'Sub topic')?2:null

  const {exam,setexam,setdsubject,setdtopic,setdstopic,setdlanguage,setedstopic,setdesubject,link} = State();
  const [open, setOpen] = React.useState(false);
  
  const [subImg, setSubImg] = React.useState([{image:null}])
  const handleImageUpload = (event, index, type) => {
    const newImg = [...subImg]
    newImg[0].image = event.target.files[0]
    setSubImg(newImg)
  };
  
  const [sub, setSub] = React.useState('')
  const InputEvent = (event, index) => {
    const { value, name } = event.target;
    setSub(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // Handle adding the subject
    // ...

    // Close the dialog
    handleClose();
  };
  const submithandler = () => {
  const formData = new FormData();
  if (dropdownName == "Language") {
    formData.append('language', sub);
    axios.post(`${link}/create_language`, formData)
      .then((response) => {
        if (response.status === 201) {
          console.log("Data added successfully");
          setdlanguage(oldArray => [sub,...oldArray])
        } else {
          alert(response);
        }
      })
      .catch((err) => {
        console.log(err);
    });
  }
  else {
    if (dropdownName == "Subject") {
      formData.append('subject', sub);
      formData.append('subject_image', subImg[0].image);
    }
    else {
      // console.log(exam.Subject)
      formData.append('topic', sub);
      formData.append('topic_image', subImg[0].image);
      formData.append('subject', exam.Subject);
    }
    
    axios.post(`${link}/add_Subject_exams`, formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Data added successfully");
          // console.log(response)
          (dropdownName=="Subject")?setdesubject(oldArray => [sub,...oldArray]):setedstopic(oldArray => [sub,...oldArray])
        } else {
          console.log(response)

          alert("Error occured");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  }
  
  return (
    <div>

    <CustomSelect id={dropdownName}  onChange={(event, newValue) =>setexam((prevData) => {
      return {
        ...prevData,
        [value]: newValue,
      };
    })} sx={{background:`${style}`}} placeholder={val?val:dropdownName} >
        {/* {listArray.map((itemVal, index) => (
          <StyledOption
          sx={{}}
          key={index} value={itemVal} >{itemVal}
          </StyledOption>
                ))} */}
      {listArray 
        ? listArray?.map((itemVal, index)=>{
            return(
              <StyledOption
              sx={{}}
              key={index} value={itemVal} >{itemVal}
              </StyledOption>
            )
        }):null}
        {add?<StyledOption onClick={handleOpen}  sx={{color:'blue'}}>Add New</StyledOption>:null}
    </CustomSelect>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New {dropdownName}</DialogTitle>
        <form
        onSubmit={(e)=>{
          e.preventDefault()
          handleAdd()
          submithandler()
        }}
        style={{position:'relative'}}
        >
        <DialogContent sx={{display:'flex', justifyContent:'center'}}>
          <TextField
          required
            type="text"
            label={`Enter New ${dropdownName}`}
            value={sub}
            onChange={(e) => InputEvent(e,index)}
            fullWidth
          />
          {(dropdownName == "Subject"|| dropdownName =="Topic"|| dropdownName=="Sub topic")?
          <Box>
            <label htmlFor="topic-image-upload">
          <input
            required
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, null, 'topic')}
            id="topic-image-upload"
            className='image-upload'
            />
            <IconButton component="span" aria-label="Upload image">
                <AddPhotoAlternateIcon sx={{fontSize:'30px'}} />
            </IconButton>
            </label>

          </Box>
            :null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit'  color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
      </div>
    
  );
}

function CustomSelect(props) {
  
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };
  return <Select {...props}  slots={slots} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.func,
    root: PropTypes.elementType,
  }),
};

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(props, ref) {
  const slots = {
    root: StyledGroupRoot,
    label: StyledGroupHeader,
    list: StyledGroupOptions,
    ...props.slots,
  };

  return <OptionGroup {...props} ref={ref} slots={slots} />;
});

CustomOptionGroup.propTypes = {
  /**
   * The components used for each slot inside the OptionGroup.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    label: PropTypes.elementType,
    list: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
};

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: Poppins;
  font-size: 20px;
  box-sizing: border-box;
  width: 100%;
  padding: 14px 10px 14px 21px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  background: #F5F6F7;
  border: none;
  color: var(--grey, #707070);

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;



  &.${selectClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  padding-top:32px;
  width: 400px;
  border-bottom-radius: 12px;
  overflow: auto;
  outline: 0px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `,
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  font-style:Poppins;
  padding-left:32px;
  border-radius: 8px;
  cursor: pointer;
  color:var(--grey, #707070);

  &:last-of-type {
    border-bottom: none;
  }
  
  `,
);

const StyledGroupRoot = styled('li')`
  list-style: none;
`;

const StyledGroupHeader = styled('span')`
  display: block;
  padding: 15px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;

const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`;

const StyledPopper = styled(Popper)`
  z-index: 1;
`;