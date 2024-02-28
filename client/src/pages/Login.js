import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Box, Typography, Stack, Button } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { login } from '../redux/slices/userSlice';
import { styled } from '@mui/material/styles';
import GoogleButton from 'react-google-button';

const clientId = "91591654443-af99j2dvlknfuursglmehifb9j2i3kro.apps.googleusercontent.com"; // move to .env


const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    color: 'white',
    padding: theme.spacing(3),
    textAlign: 'center',
    boxSizing: 'border-box',
  }));

const StyledBox = styled(Box)(({ theme }) => ({
    borderRadius: '15px',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    background: 'white',
    color: 'black',
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: '400px',
    marginBottom: theme.spacing(4),
}));

const BrandingText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
}));

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLoginSuccess = async (credentialResponse) => {
      try {
          // Assuming the backend expects the credential response token
          const token = credentialResponse.credential;

          const backendResponse = await axios.post('https://localhost:8000/users/google-login', {
              token: token,
          });

          // Assuming backendResponse contains the user data
          console.log('Google login successful', backendResponse.data);

          dispatch(login({
              id: backendResponse.data.user.id,
              username: backendResponse.data.username,
              // other user data
          }));

          navigate('/home');
      } catch (error) {
          console.error('Google login error:', error);
      }
  };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    

    return (
      <StyledDiv>
          <BrandingText variant="h3">Welcome to MERN</BrandingText>
          <Typography variant="h6" sx={{ mb: 2 }}>
              Easy to start, easier to scale.
          </Typography>
          <StyledBox>
              <Typography variant="h4" sx={{ mb: 2 }}>
                  Login
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin
                      clientId={clientId}
                      render={(renderProps) => (
                          <GoogleButton 
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                          />
                      )}
                      onSuccess={handleGoogleLoginSuccess}
                      onFailure={handleGoogleLoginFailure}
                      cookiePolicy={'single_host_origin'}
                  />
              </div>
          </StyledBox>
          <Button variant="text" color="inherit" onClick={() => navigate('/about')}>
              Learn more about Berbai
          </Button>
      </StyledDiv>
  );
}

export default Login;
