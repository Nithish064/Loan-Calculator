import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
  TablePagination,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Search as SearchIcon, TrendingUp } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const ExchangeRatesTable: React.FC = () => {
  const theme = useTheme();
  const { currencies, baseCurrency, isLoading, error } = useCurrency();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card elevation={3} sx={{ overflow: 'visible' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TrendingUp size={28} color={theme.palette.primary.main} />
          <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
            Exchange Rates
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            (Base: {baseCurrency})
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search currency..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3, textAlign: 'center', color: theme.palette.error.main }}>
            <Typography>{error}</Typography>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ 
              boxShadow: 'none',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              overflow: 'hidden'
            }}>
              <Table>
                <TableHead sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : theme.palette.grey[50]
                }}>
                  <TableRow>
                    <TableCell>Currency Code</TableCell>
                    <TableCell>Currency Name</TableCell>
                    <TableCell align="right">Exchange Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCurrencies
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((currency) => (
                      <TableRow 
                        key={currency.code}
                        hover
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography variant="body1" fontWeight={500}>
                            {currency.code}
                          </Typography>
                        </TableCell>
                        <TableCell>{currency.name}</TableCell>
                        <TableCell align="right">
                          {currency.rate.toFixed(4)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredCurrencies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
              Note: For demonstration purposes, these rates are simulated. In a production environment, 
              real-time data would be fetched from an exchange rate API.
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ExchangeRatesTable;