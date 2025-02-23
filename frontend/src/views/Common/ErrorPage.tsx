import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  title: string;
  message: string;
  code?: string | number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  title, 
  message, 
  code,
  action = {
    label: 'Go Back Home',
    onClick: () => window.location.href = '/'
  }
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            width: '100%',
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          {code && (
            <Typography
              variant="h1"
              sx={{
                fontSize: '6rem',
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 2,
                opacity: 0.8
              }}
            >
              {code}
            </Typography>
          )}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'medium' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            {message}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={action.onClick}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            {action.label}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorPage
