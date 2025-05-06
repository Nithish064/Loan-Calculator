import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 4, md: 6 }, 
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 4 
        }}>
          <FileQuestion size={80} color="#2196f3" />
          
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              mt: 3,
              fontWeight: 700, 
              fontSize: { xs: '2rem', sm: '3rem' }
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mt: 1,
              fontWeight: 600, 
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Page Not Found
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
          We're sorry, but the page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the home page.
        </Typography>
        
        <Button 
          variant="contained" 
          size="large" 
          component={RouterLink} 
          to="/"
          sx={{ 
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600
          }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;