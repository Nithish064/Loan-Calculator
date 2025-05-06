import React from 'react';
import { 
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box
} from '@mui/material';
import { useCurrency } from '../contexts/CurrencyContext';

type CurrencySelectorProps = {
  selectedCurrency: string;
  onChange: (currency: string) => void;
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, onChange }) => {
  const { currencies, isLoading } = useCurrency();
  
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  
  return (
    <FormControl fullWidth>
      <Select
        value={selectedCurrency}
        onChange={handleChange}
        displayEmpty
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency.code} value={currency.code}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="body1">{currency.code}</Typography>
              <Typography variant="body2" color="text.secondary">{currency.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;