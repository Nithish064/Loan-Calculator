import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // In a real app, you might log this to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 5, 
              textAlign: 'center',
              borderRadius: 2,
              border: '1px solid #f44336'
            }}
          >
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <AlertTriangle size={64} color="#f44336" />
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Something went wrong!
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4 }}>
              We're sorry, but we encountered an unexpected error.
            </Typography>
            
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 4 }}>
              <Typography component="pre" sx={{ textAlign: 'left', overflowX: 'auto' }}>
                {this.state.error?.toString() || 'An unknown error occurred'}
              </Typography>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={this.handleReload}
              sx={{ minWidth: 150 }}
            >
              Reload Page
            </Button>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;