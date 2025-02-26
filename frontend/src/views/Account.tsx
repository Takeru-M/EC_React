import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Switch,
  Alert,
  Collapse,
  ListItemButton,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  ShoppingBag,
  Favorite,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabaseClient';
import type { RootState, AppDispatch } from '../redux';
import { createAddress, updateAddress, deleteAddress, switchDefaultAddress, setDefaultAddress, updatePassword, updateUser } from '../redux/users/userSlice';
import { defaultAddress, UpdateUserState } from '../redux/users/type';
import AddressDialog from '../components/Dialog/AddressDialog';
import DeleteAddressDialog from '../components/Dialog/DeleteAddressDialog';
import { Address } from '../redux/users/type';
import { fetchAddresses } from '../redux/users/userSlice';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserState>({
    login_name: user?.login_name || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    first_name_kana: user?.first_name_kana || '',
    last_name_kana: user?.last_name_kana || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    postal_code: user?.postal_code || '',
    address: user?.address || '',
  });
  const addresses = useSelector((state: RootState) => state.user.addresses);

  // Password change state
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Address dialog state
  const [addressDialog, setAddressDialog] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [deleteAddressDialog, setDeleteAddressDialog] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchAddresses({id: user.id}));
    } else {
      navigate('/signin');
    }
  }, [user]);

  useEffect(() => {
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      await dispatch(updateUser({id: user.id, formData}));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    if (user) {
      try {
        await dispatch(updatePassword({
          id: user.id,
          current_password: passwordForm.currentPassword,
          new_password: passwordForm.newPassword
        })).unwrap();

        setPasswordDialog(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        toast.success('Password updated successfully');
      } catch (error) {
        console.error('Error updating password:', error);
        toast.error(error as string);
      }
    }
  };

  const handleSwitchChange = async(id: number, is_default: boolean) => {
    if (is_default) {
      toast.error('There must be only one default address');
      return;
    }

    const defaultAddress = addresses.filter(address => address.is_default)[0];
    dispatch(setDefaultAddress({ id: defaultAddress.id, is_default: false }));
    dispatch(setDefaultAddress({ id: id, is_default: true }));

    try {
      await dispatch(switchDefaultAddress({ id: defaultAddress.id, is_default: false }));
      await dispatch(switchDefaultAddress({id, is_default: true}));
      await dispatch(fetchAddresses({id: user?.id as number}));
      toast.success('Default address updated successfully');
    } catch (error) {
      dispatch(switchDefaultAddress({ id: defaultAddress.id, is_default: true }));
      dispatch(switchDefaultAddress({ id: id, is_default: false }));
      console.error('Error switching default address:', error);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent, formData: Address) => {
    e.preventDefault();
    if (user) {
      formData.user_id = user.id;
    }

    if (isEditingAddress) {
      try {
        await dispatch(updateAddress({formData}));
        setAddressDialog(false);
        setCurrentAddress(defaultAddress);
        setIsEditingAddress(false);
        toast.success('Address updated successfully');
      } catch (error) {
        console.error('Error updating address:', error);
      }
    } else {
      try {
        await dispatch(createAddress({formData}));
        setAddressDialog(false);
        setCurrentAddress(defaultAddress);
        toast.success('Address created successfully');
      } catch (error) {
        console.error('Error saving address:', error);
      }
    }
  };

  const handleDeleteAddress = async () => {
    try {
      if (currentAddress) {
        await dispatch(deleteAddress({id: Number(currentAddress.id)}));
        setDeleteAddressDialog(false);
        toast.success('Address deleted successfully');
        // fetchAddresses();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };


  // const addresses: Address[] = [
  //   {
  //     id: 1,
  //     user_id: 1,
  //     name: "Home",
  //     address: "1-2-3 Shibuya",
  //     postal_code: "150-0002",
  //     country: "Japan",
  //     phone_number: "090-1234-5678",
  //     is_default: true,
  //   },
  //   {
  //     id: 2,
  //     user_id: 1,
  //     name: "Office",
  //     address: "4-5-6 Akasaka",
  //     postal_code: "107-0052",
  //     country: "Japan",
  //     phone_number: "080-9876-5432",
  //     is_default: false,
  //   },
  //   {
  //     id: 3,
  //     user_id: 1,
  //     name: "Parents' House",
  //     address: "7-8-9 Namba",
  //     postal_code: "542-0076",
  //     country: "Japan",
  //     phone_number: "06-1234-5678",
  //     is_default: false,
  //   },
  // ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                }}
              >
                {formData.first_name?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ ml: 3 }}>
                <Typography variant="h4" gutterBottom>
                  {`${formData.first_name} ${formData.last_name}`}
                </Typography>
              </Box>
            </Box>

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Login Name"
                    name="login_name"
                    value={formData.login_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name (Kana)"
                    name="first_name_kana"
                    value={formData.first_name_kana}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name (Kana)"
                    name="last_name_kana"
                    value={formData.last_name_kana}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </form>
            <Grid item xs={12} mt={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {isEditing ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      type="button"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<LockIcon />}
                      onClick={() => setPasswordDialog(true)}
                    >
                      Change Password
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Paper>

          {/* Shipping Addresses Section */}
          <Paper sx={{ p: 4, mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Shipping Addresses</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setCurrentAddress(defaultAddress);
                  setIsEditingAddress(false);
                  setAddressDialog(true);
                }}
              >
                Add New Address
              </Button>
            </Box>

            <List>
              {addresses.map((address) => (
                <React.Fragment key={address.id}>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {address.name}
                          {address.is_default && (
                            <Typography variant="caption" sx={{ ml: 1, bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>
                              Default
                            </Typography>
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" display="block">
                            {address.address}
                          </Typography>
                          <Typography component="span" display="block">
                            {address.postal_code}
                          </Typography>
                          {/* <Typography component="span" display="block">
                            {`${address.city}, ${address.state} ${address.postal_code}`}
                          </Typography> */}
                          <Typography component="span" display="block">
                            {address.country}
                          </Typography>
                          {address.phone_number && (
                            <Typography component="span" display="block">
                              {address.phone_number}
                            </Typography>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={address.is_default}
                        onChange={() => {
                          handleSwitchChange(address.id, address.is_default);
                        }}
                      />
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setCurrentAddress(address);
                          setIsEditingAddress(true);
                          setAddressDialog(true);
                        }}
                        sx={{ ml: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setDeleteAddressDialog(true);
                        }}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItemButton onClick={() => navigate('/order_history')}>
                <ListItemIcon>
                  <ShoppingBag />
                </ListItemIcon>
                <ListItemText 
                  primary="My Orders"
                  secondary="View your order history"
                />
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/favorite')}>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText 
                  primary="Favorites"
                  secondary="View your favorite items"
                />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handlePasswordSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordInputChange}
                  required
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Update Password
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Address Dialog */}
      <AddressDialog
        open={addressDialog}
        onClose={() => setAddressDialog(false)}
        onSubmit={(e, formData) => handleAddressSubmit(e, formData)}
        initialData={currentAddress}
      />

      {/* Delete Address Dialog */}
      <DeleteAddressDialog
        open={deleteAddressDialog}
        onClose={() => setDeleteAddressDialog(false)}
        onDelete={handleDeleteAddress}
      />
    </Container>
  );
};

export default Account;
