import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme } from '@mui/material';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[900] 
          : theme.palette.grey[100],
        transition: 'background-color 0.3s ease'
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4 }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Box sx={{ mb: { xs: 3, sm: 0 } }}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Loan Calculator App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A modern calculator for loan EMIs, amortization schedules,
              <br />
              and currency conversion.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="/" color="text.secondary" sx={{ textDecoration: 'none' }}>
                Home
              </Link>
              <Link href="/calculator" color="text.secondary" sx={{ textDecoration: 'none' }}>
                Calculator
              </Link>
              <Link href="/exchange-rates" color="text.secondary" sx={{ textDecoration: 'none' }}>
                Exchange Rates
              </Link>
            </Box>
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            mt: 4, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}
        >
          
          <Typography variant="body2" color="text.secondary">
            &copy; {year} Loan Calculator App. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;