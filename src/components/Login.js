import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Clear form after successful auth
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error with email auth:', error);
      // TODO: Add proper error handling
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh' 
    }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {isSignUp ? 'Sign Up' : 'Sign in'} to Dataset Monitor
        </Typography>
        <form onSubmit={handleEmailAuth}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'} with Email
          </Button>
        </form>
        <Button
          fullWidth
          variant="outlined"
          onClick={signInWithGoogle}
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{ mt: 2 }}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
