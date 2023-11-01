
/* eslint-disable */
import React from 'react'
import Menu from '../Components/Menu/Menu'
import { Box } from '@mui/system'
import AddNewLanguage from '../Components/ComponentsQuizz/AddLanguage/AddNewLanguage'

const AddLanguagePage = () => {

  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu  />
        <AddNewLanguage />
    </Box>
  )
}

export default AddLanguagePage
