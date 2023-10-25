import React, { useEffect, useState } from 'react'
import Menu from '../Components/Menu/Menu'
import { Box } from '@mui/system'
import CreateExam from '../Components/ComponentsExam/CreateExam'

const MainPageOfExam = () => {

  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu />
        <CreateExam />
    </Box>
  )
}

export default MainPageOfExam
