import React, { useState } from 'react'
import Menu from '../Components/Menu/Menu'
import { Box } from '@mui/system'
import EditExam from '../Components/ComponentsExam/EditExamQuestion/EditExam'


const ExamEditPage = () => {

  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu  />
        <EditExam />
    </Box>
  )
}

export default ExamEditPage
