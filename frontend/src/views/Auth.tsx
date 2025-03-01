import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink,
  Alert,
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, signin, signup } from '../redux/users/userSlice';
import { AppDispatch, RootState } from '../redux';
import { integrateCart, fetchCarts } from '../redux/carts/cartSlice';
import { integrateFavorite } from '../redux/favorites/favoriteSlice';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/constants';

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isSignUp = location.pathname === '/signup';

  const [formData, setFormData] = useState({
    login_name: '',
    first_name: '',
    last_name: '',
    first_name_kana: '',
    last_name_kana: '',
    email: '',
    phone_number: '',
    postal_code: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const user_id = useSelector((state: RootState) => state.user.user?.id);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  useEffect(() => {
    if (user_id) {
      navigate('/');
    }
  }, [user_id]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setIsLoading(true));
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    dispatch(setIsLoading(true));

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      try {
        const result = await dispatch(signup({formData: formData}));
        const userId = result.payload?.data?.id;
        await dispatch(fetchCarts({user_id: userId, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
        toast.success('Sign up successful');
        navigate('/')
      } catch (err) {
        // TODO: エラーメッセージを表示
        toast.error('Authentication failed. Please try again.');
        setError('Authentication failed. Please try again.');
      }
    } else {
      try {
        const result = await dispatch(signin({formData: formData}));
        const userId = result.payload?.data?.id;
        await dispatch(integrateCart({user_id: userId}))
        await dispatch(integrateFavorite({user_id: userId}))
        await dispatch(fetchCarts({user_id: userId, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
        toast.success('Sign in successful');
        const prevPath = localStorage.getItem('prevPath');
        navigate(prevPath || '/');
      } catch (err) {
        // TODO: エラーメッセージを表示
        toast.error('Authentication failed. Please try again.');
        setError('Authentication failed. Please try again.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {isSignUp ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="login_name"
                      label="Login Name"
                      name="login_name"
                      value={formData.login_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="last_name"
                      label="Last Name (姓)"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="first_name"
                      label="First Name (名)"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="last_name_kana"
                      label="Last Name Kana (セイ)"
                      name="last_name_kana"
                      value={formData.last_name_kana}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="first_name_kana"
                      label="First Name Kana (メイ)"
                      name="first_name_kana"
                      value={formData.first_name_kana}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone_number"
                      label="Phone Number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      inputProps={{
                        pattern: '[0-9]*',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="postal_code"
                      label="Postal Code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      inputProps={{
                        pattern: '[0-9]*',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <MuiLink
                component={Link}
                to={isSignUp ? '/signin' : '/signup'}
                variant="body2"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </MuiLink>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Auth;
