import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ExchangeRatesTable from '../components/ExchangeRatesTable';

const ExchangeRatesPage: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
          Exchange Rates
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          View current exchange rates for different currencies.
        </Typography>
        
        <ExchangeRatesTable />
      </Container>
    </Box>
  );
};

export default ExchangeRatesPage;