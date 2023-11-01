/* eslint-disable */
import React from 'react'
import DropDown from '../../ComponentsAssignUser/AssignUser/DropDown'
import { Box } from '@mui/system'
import { sideDetail } from '../../../styles/style'

const AddDetails = ({}) => {
  return (
    <Box sx={sideDetail.second}  className="side-details page2 page3">
      <h3>Add Language</h3>
      <p>Language</p>
      <DropDown dropdownName={"Add new or select existing"} listArray={["Option1", "Option2", "Option3", "Option4"]} />
      <div className='btn-to-add'>
        <button>Add</button>
      </div>

    </Box>
  )
}

export default AddDetails