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
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux';
import { signout } from '../../redux/users/userSlice';
import { fetchProducts, searchProducts } from '../../redux/products/productSlice';
import { fetchCategories } from '../../redux/categories/categorySlice';
import { Category } from '../../redux/categories/type';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants/product';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
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

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

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

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  backgroundColor: 'transparent',
  '& .MuiSelect-icon': {
    color: 'inherit',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  marginLeft: theme.spacing(2),
  minWidth: 120,
  height: 40,
}));

const Header = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = useSelector((state: RootState) => state.category.categories);
  const numOfCart = useSelector((state: RootState) => state.cart.carts.length);
  const isSignin = useSelector((state: RootState) => state.user.isSignin);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // if (searchTerm === "" && selectedCategory === 0) {
    //   dispatch(fetchProducts({page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
    //   navigate('/');
    // } else {
    //   dispatch(searchProducts({searchTerm: searchTerm, category_id: selectedCategory, page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE}));
    //   navigate(`/search?q=${encodeURIComponent(searchTerm)}&category_id=${selectedCategory}`);
    // }
    navigate(`/search?q=${encodeURIComponent(searchTerm)}&category_id=${selectedCategory}`);
  };

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const newCategory = event.target.value as number;
    setSelectedCategory(newCategory);
  };

  // TODO: Add some function to menu
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoAccount = () => {
    navigate('/account');
  }

  const gotoFavorite = () => {
    navigate('/favorite');
  }

  const Signin = () => {
    navigate('/signin');
  }

  const Signout = () => {
    dispatch(signout());
    navigate(0);
  }

  // const categories = [
  //   {id: 1, label: 'All Categories'},
  //   {id: 2, label: 'Electronics'},
  //   {id: 3, label: "Men's Clothing"},
  //   {id: 4, label: "Women's Clothing"},
  //   {id: 5, label: "Jewelery"},
  // ];

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
          <IconButton
            size='large'
            color='inherit'
            aria-label='search'
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder={t('header.search')}
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <FormControl>
            <StyledSelect
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
            >
              <MenuItem value={0}>Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
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
            {isSignin ? (
              <>
                <MenuItem onClick={gotoAccount}>{t('header.account.account')}</MenuItem>
                <MenuItem onClick={gotoFavorite}>{t('header.account.favorites')}</MenuItem>
                <MenuItem onClick={Signout}>{t('header.account.signout')}</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={Signin}>{t('header.account.signin')}</MenuItem>
              </>
            )}
          </Menu>

          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            component={Link}
            to={'/cart'}
          >
            <Badge badgeContent={numOfCart} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
