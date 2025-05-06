import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Calculator, DollarSign, CreditCard, Info } from 'lucide-react';

const HomePage: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Calculator size={40} color={theme.palette.primary.main} />,
      title: 'Loan EMI Calculator',
      description: 'Calculate your Equated Monthly Installments with our easy-to-use calculator. Input loan amount, interest rate, and tenure to see your monthly payments.',
      link: '/calculator'
    },
    {
      icon: <DollarSign size={40} color={theme.palette.secondary.main} />,
      title: 'Currency Conversion',
      description: 'Convert your EMI to different currencies with real-time exchange rates. See how your payments would look in multiple currencies.',
      link: '/calculator'
    },
    {
      icon: <CreditCard size={40} color={theme.palette.success.main} />,
      title: 'Amortization Schedule',
      description: 'View a detailed breakdown of your loan repayment schedule. See how each payment is split between principal and interest.',
      link: '/calculator'
    },
    {
      icon: <Info size={40} color={theme.palette.info.main} />,
      title: 'About This App',
      description: 'Learn more about how this app was built and the technologies used. Find documentation on the EMI formula and API integrations.',
      link: '/about'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(33, 150, 243, 0.05)',
          py: { xs: 8, md: 12 },
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 2,
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)' 
                    : 'linear-gradient(45deg, #2196f3 30%, #0d47a1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Simplify Your Loan Calculations
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 400, maxWidth: '90%' }}
              >
                Calculate EMIs, view amortization schedules, and convert currencies in real-time
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/calculator"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/exchange-rates"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                  }}
                >
                  View Exchange Rates
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Loan Calculator"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Key Features
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                  {feature.description}
                </Typography>
                <Button
                  component={RouterLink}
                  to={feature.link}
                  variant="text"
                  color="primary"
                  sx={{ alignSelf: 'flex-start', fontWeight: 500 }}
                >
                  Learn more →
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : theme.palette.grey[100],
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              p: 5,
              borderRadius: 4,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.1)' : 'white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to calculate your loan payments?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Our calculator helps you make informed financial decisions by providing accurate EMI calculations
              and detailed amortization schedules.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/calculator"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
              }}
            >
              Start Calculating
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;