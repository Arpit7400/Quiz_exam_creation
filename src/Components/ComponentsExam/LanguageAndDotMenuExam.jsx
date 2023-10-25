import { Button, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SelectMenuExam from "./AddQuestionExam/SelectMenuExam";
import { useNavigate } from "react-router-dom";
import { State } from "../Context/Provider";
const style = {
  dflex: {
    display: "flex",
  },
  bellIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const LanguageAndDotMenuExam = () => {
  const {setActiveTab, openPage,dlanguage} = State()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ pt: "40px" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "6fr 6fr",
          justifyContent: "space-between",
        }}
      >
        <Box >
          <SelectMenuExam
            dropdownName={"Language"}
            listArray={dlanguage}
            value={"Language"}
            add={true}
          />
        </Box>
        <Box sx={{textAlign:'end'}}>
          <Button
            id="basic-button"
            disableTouchRipple
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              height: "52px",
              width: "61px",
              fontSize: "50px",
              color: "#707070",
              bgcolor: "#fff",
              borderRadius: "8px",
              pb:'31px'
            }}
          >
            ...
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            classes={{ paper: "custom-menu-paper" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ boxShadow: "none !important" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/add-language')
                setActiveTab(openPage)
              }}
            >
              Add language
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/creae-subject')
                setActiveTab(openPage)
              }}
            >
              Create subject
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/creae-subject')
                setActiveTab(openPage)
              }}
            >
              Create topic
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/creae-subject')
                setActiveTab(openPage)
              }}
            >
              Create subtopic
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default LanguageAndDotMenuExam;
