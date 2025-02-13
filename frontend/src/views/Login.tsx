import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux';
import { createUser, doLogin } from '../redux/users/userSlice';
const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { action } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { accessToken, user } = useSelector((state: RootState) => state.user);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (action === 'register') {
      await dispatch(createUser({name, email, password}));
      if (accessToken && user?.id) {
        navigate('/');
      } else {
        // サインイン失敗時の処理
      }
    } else {
      await dispatch(doLogin({email, password}));
      if (accessToken && user?.id) {
        navigate('/');
      } else {
        // ログイン失敗時の処理
      }
    }
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('login.login_title')}
        </Typography>
        <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
          {action === 'register' ? (
            <>
              <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={t('login.name_label')}
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            </>
          ) : (
            <>
            </>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('login.email_label')}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('login.password_label')}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('login.login_button')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
