/* eslint-disable */
import { Box, Input } from '@mui/material'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const StyledArea = ({value, setValue}) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', ,
    'link'
  ]
  return (
    <Box
    sx={{position:'relative'}}
    className='instructions'
    >
      <ReactQuill style={{minHeight:'205px',
            background:'#F5F6F7',
            width:'100%',
            padding:'32px 32px',
            borderRadius:'24px',
            fontSize:'15px', }} theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
        {/* <Input
        sx={{
            height:'205px',
            background:'#F5F6F7',
            width:'100%',
            padding:'32px 32px',
            borderRadius:'24px',
            fontSize:'15px',
            "::after": {
                border:'none',
              },
            "::before": {
                border:'none',
              },
            '&:hover:before':{
                border:'none !important',
            }

        }}
        />
        <Box
            sx={{
                position:'absolute',
                top:'32px',
                right:'32px'
            }}
        >
            <CustomizedDividers />
        </Box> */}
    </Box>
  )
}

export default StyledArea
