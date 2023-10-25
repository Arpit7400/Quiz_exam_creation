import React from 'react'
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Error: Page not found
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button component={Link} to="/admin" variant="contained" color="primary">
          Go to Home
        </Button>
      </div>
    </Container>
  )
}

export default ErrorPage
