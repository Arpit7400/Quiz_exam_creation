import React, { useState } from 'react'
import Menu from '../Components/Menu/Menu'
import UpdateQuiz from '../Components/ComponentsQuizz/UpdateQuiz/Update'
import { Box } from '@mui/system'

const MainPageOfQuiz = () => {
  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu  />
        <UpdateQuiz />
    </Box>
  )
}

export default MainPageOfQuiz
