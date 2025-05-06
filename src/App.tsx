import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import ExchangeRatesPage from './pages/ExchangeRatesPage';

import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CurrencyProvider>
          <Router>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
              }}
            >
              <Header />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/calculator" element={<CalculatorPage />} />
                  <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;