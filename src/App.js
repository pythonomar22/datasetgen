import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import { createTheme } from '@mui/material/styles';
import Navigation from './components/Navigation';
import DatasetUpload from './components/DatasetUpload';
import ExperimentDashboard from './components/ExperimentDashboard';
import './App.css';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1', 
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

function App() {
  // Temporarily disabled auth for development
  const [user, loading] = useAuthState(auth);

  // User is logged in, show main app
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={
              <Box sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 4,
                textAlign: 'center',
                minHeight: '80vh',
                justifyContent: 'center'
              }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Dataset Generation & Monitoring
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mb: 4 }}>
                  An all-in-one open-source tool for understanding, monitoring, and augmenting ML datasets using advanced AI techniques.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    component={RouterLink} 
                    to="/upload"
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    component={RouterLink} 
                    to="/monitor"
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            } />
            <Route path="/upload" element={<DatasetUpload />} />
            <Route path="/monitor" element={<ExperimentDashboard />} />
            <Route path="/augment" element={<div>Dataset Augmentation (Coming Soon)</div>} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
