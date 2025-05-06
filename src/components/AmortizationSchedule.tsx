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
  Collapse,
  IconButton
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon 
} from '@mui/icons-material';
import { FileSpreadsheet } from 'lucide-react';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { useCurrency } from '../contexts/CurrencyContext';

const AmortizationSchedule: React.FC = () => {
  const theme = useTheme();
  const { amortizationSchedule } = useEMICalculator();
  const { baseCurrency, convertAmount } = useCurrency();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expanded, setExpanded] = useState(true);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(convertAmount(value, baseCurrency));
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card 
      elevation={3} 
      sx={{ mt: 4, overflow: 'visible' }}
      id="amortization"
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          mb: expanded ? 3 : 0 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FileSpreadsheet size={28} color={theme.palette.secondary.main} />
            <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
              Amortization Schedule
            </Typography>
          </Box>
          <IconButton onClick={toggleExpanded} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Collapse in={expanded}>
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
                  <TableCell align="center">Month</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right">Principal</TableCell>
                  <TableCell align="right">Interest</TableCell>
                  <TableCell align="right">Total Interest</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amortizationSchedule
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow 
                      key={row.month}
                      hover
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell align="center">{row.month}</TableCell>
                      <TableCell align="right">{formatCurrency(row.payment)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.principal)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.interest)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.totalInterest)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.endingBalance)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={amortizationSchedule.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AmortizationSchedule;