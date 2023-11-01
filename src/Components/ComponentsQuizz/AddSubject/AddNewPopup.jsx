/* eslint-disable */
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Box } from '@mui/system';

const AddNewPopup = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subject, setSubject] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    handleClose();
  };

  return (
    <Box>
      <Box>
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {/* Menu items for existing subjects */}
            <MenuItem value="">
              <em>-- Select Subject --</em>
            </MenuItem>
            {/* ... (existing subjects) */}
            <MenuItem value="AddNewSubject" onClick={handleOpen}>
              Add New Subject
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Dialog for adding a new subject */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Enter new subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNewPopup;
