import React, { useState } from 'react'
import Menu from '../Components/Menu/Menu'
import { Box } from '@mui/system'
import PreviewExam from '../Components/ComponentsExam/PreviewExam/PreviewExam'

const PreviewPageExam = () => {

  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu  />
        <PreviewExam />
    </Box>
  )
}

export default PreviewPageExam
