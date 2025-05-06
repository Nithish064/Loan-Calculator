import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  DarkMode as DarkModeIcon, 
  LightMode as LightModeIcon,
  Home as HomeIcon,
  Calculate as CalculateIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Calculator', icon: <CalculateIcon />, path: '/calculator' },
    { text: 'Exchange Rates', icon: <CurrencyExchangeIcon />, path: '/exchange-rates' },
  ];

  const renderDrawer = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding component={RouterLink} to={item.path}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="static" sx={{ transition: 'background-color 0.3s ease' }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant="h6" component="div" sx={{ 
          flexGrow: 1,
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <CalculateIcon sx={{ mr: 1 }} />
          Loan Calculator
        </Typography>
        
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Box 
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Typography variant="body1">{item.text}</Typography>
              </Box>
            ))}
          </Box>
        )}
        
        <IconButton onClick={toggleColorMode} color="inherit" sx={{ ml: 2 }}>
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
      {renderDrawer()}
    </AppBar>
  );
};

export default Header;