import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../constants/header';
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const Header = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoAccount = () => {
    navigate('/account');
  }

  const gotoOrders = () => {
    navigate('/orders');
  }

  const Logout = () => {
    navigate('/logout');
  }

  const Register = () => {
    navigate('/users/register');
  }

  const login = false;

  const Login = () => {
    navigate('/users/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            display: { xs: 'none', sm: 'block' },
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          {Title}
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={t('header.search')}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex' }}>
          <IconButton
            size="large"
            aria-label="account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Person />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {login ? (
              <>
                <MenuItem onClick={gotoAccount}>{t('header.account.account')}</MenuItem>
                <MenuItem onClick={gotoOrders}>{t('header.account.orders')}</MenuItem>
                <MenuItem onClick={Logout}>{t('header.account.logout')}</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={Register}>{t('header.account.register')}</MenuItem>
                <MenuItem onClick={Login}>{t('header.account.login')}</MenuItem>
              </>
            )}
          </Menu>

          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
