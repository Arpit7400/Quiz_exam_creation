/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import Provider from "./Components/Context/Provider";
import { SnackbarProvider, closeSnackbar, useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <React.StrictMode>
    <SnackbarProvider autoHideDuration={6000} maxSnack={7}
    action={(snackbarId) => (
      <IconButton component="span" onClick={() => closeSnackbar(snackbarId)}>
      <CloseIcon sx={{color:'#fff'}} />
      </IconButton>
      
    )}
    >
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </SnackbarProvider>
    </React.StrictMode>
  </Provider>
);

