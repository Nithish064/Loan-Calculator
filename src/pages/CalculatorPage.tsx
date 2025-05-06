import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoanCalculator from '../components/LoanCalculator';
import AmortizationSchedule from '../components/AmortizationSchedule';

const CalculatorPage: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
          Loan EMI Calculator
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Calculate your loan's EMI, view payment breakdown, and check amortization schedule.
        </Typography>
        
        <LoanCalculator />
        <AmortizationSchedule />
      </Container>
    </Box>
  );
};

export default CalculatorPage;