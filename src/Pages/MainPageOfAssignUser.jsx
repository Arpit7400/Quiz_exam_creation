/* eslint-disable */
import React, { useState } from 'react'
import Menu from '../Components/Menu/Menu'
import { Box } from '@mui/system'
import AssignUser from '../Components/ComponentsAssignUser/AssignUser'

const MainPageOfAssignUser = () => {
  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu />
        <AssignUser />
    </Box>
  )
}

export default MainPageOfAssignUser
