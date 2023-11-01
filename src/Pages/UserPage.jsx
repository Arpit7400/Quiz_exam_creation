/* eslint-disable */
import { Outlet } from 'react-router-dom'
import Menu from '../Components/Menu/Menu'
import { Box } from '@mui/system'

const UserPage = () => {
  return (
    <Box sx={{display:'flex', alignItems:'start'}}>
        <Menu  />
        <Outlet />

    </Box>
  )
}

export default UserPage
