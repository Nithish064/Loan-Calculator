import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Slider,
  InputAdornment,
  Box,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { useCurrency } from '../contexts/CurrencyContext';
import CurrencySelector from './CurrencySelector';

const LoanCalculator: React.FC = () => {
  const theme = useTheme();
  const { inputs, updateInputs, emi, totalPayment, totalInterest } = useEMICalculator();
  const { baseCurrency, convertAmount } = useCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateInputs({ principal: isNaN(value) ? 0 : value });
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateInputs({ interestRate: isNaN(value) ? 0 : value });
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    updateInputs({ loanTerm: isNaN(value) ? 0 : value });
  };

  const handlePrincipalSliderChange = (_event: Event, newValue: number | number[]) => {
    updateInputs({ principal: newValue as number });
  };

  const handleInterestSliderChange = (_event: Event, newValue: number | number[]) => {
    updateInputs({ interestRate: newValue as number });
  };

  const handleTermSliderChange = (_event: Event, newValue: number | number[]) => {
    updateInputs({ loanTerm: newValue as number });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(convertAmount(value, selectedCurrency));
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        overflow: 'visible',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Calculator size={28} color={theme.palette.primary.main} />
          <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
            Loan Calculator
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Loan Amount
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={inputs.principal}
                onChange={handlePrincipalChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarSign size={18} />
                    </InputAdornment>
                  ),
                }}
              />
              <Slider
                value={inputs.principal}
                onChange={handlePrincipalSliderChange}
                min={1000}
                max={1000000}
                step={1000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                sx={{ mt: 2 }}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Interest Rate (% per year)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={inputs.interestRate}
                onChange={handleInterestChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Percent size={18} />
                    </InputAdornment>
                  ),
                }}
              />
              <Slider
                value={inputs.interestRate}
                onChange={handleInterestSliderChange}
                min={0.1}
                max={20}
                step={0.1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                sx={{ mt: 2 }}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Loan Term (months)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={inputs.loanTerm}
                onChange={handleTermChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={18} />
                    </InputAdornment>
                  ),
                }}
              />
              <Slider
                value={inputs.loanTerm}
                onChange={handleTermSliderChange}
                min={1}
                max={360}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} months`}
                sx={{ mt: 2 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Currency</Typography>
              <CurrencySelector 
                selectedCurrency={selectedCurrency} 
                onChange={setSelectedCurrency}
              />
            </Box>

            <Box sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)', 
              p: 3, 
              borderRadius: 2,
              transition: 'all 0.3s ease'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                Payment Summary
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">Monthly Payment (EMI)</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                  {formatCurrency(emi)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Principal Amount</Typography>
                <Typography variant="body1" fontWeight={500}>{formatCurrency(inputs.principal)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Total Interest</Typography>
                <Typography variant="body1" fontWeight={500} color={theme.palette.warning.main}>
                  {formatCurrency(totalInterest)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Total Payment</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {formatCurrency(totalPayment)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                component="a"
                href="#amortization"
                sx={{ 
                  minWidth: 200,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                View Amortization Schedule
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;