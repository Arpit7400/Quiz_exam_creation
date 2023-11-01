/* eslint-disable */
import React, { useState } from 'react'
import Menu from '../Components/Menu/Menu'
import { Box } from '@mui/system'
import AddNewSubject from '../Components/ComponentsQuizz/AddSubject/AddNewSubject'

const AddSubjectSubtopic = () => {
  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu />
        <AddNewSubject />
    </Box>
  )
}

export default AddSubjectSubtopic
