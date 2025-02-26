import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Box,
  MenuItem,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { Address } from '../../redux/users/type';

const countries = ['United States', 'Canada', 'United Kingdom', 'Japan', 'Germany'];

interface AddressProps {
  open: boolean;
  onClose: () => void;
  // onSubmit: (data: Address) => void;
  onSubmit: (e: React.FormEvent, data: Address ) => void;
  initialData: Address | null;
}

const AddressDialog = ({ open, onClose, onSubmit, initialData }: AddressProps) => {
  const [formData, setFormData] = useState<Address>(
    {
      id: 0,
      user_id: 0,
      name: '',
      postal_code: '',
      address: '',
      country: '',
      phone_number: '',
      is_default: false,
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    setFormData((prev) => ({ ...prev, is_default: e.target.checked }));
  };

  const validate = () => {
    return true
    // let newErrors = {};
    // Object.keys(formData).forEach((key) => {
    //   if (!formData[key] && key !== 'is_default') {
    //     newErrors[key] = 'This field is required';
    //   }
    // });
    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (validate()) {
      console.log(formData);
      onSubmit(e, formData);
      onClose();
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn color="primary" />
          <Typography variant="h6">Manage Address</Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ py: 2, px: 3, bgcolor: '#f9f9f9' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || ''}
              required
              placeholder="John Doe"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Postal Code *"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              error={!!errors.postal_code}
              helperText={errors.postal_code || 'Enter without hyphens'}
              required
              placeholder="1000001"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address *"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address || ''}
              required
              placeholder="123 Main St, Apt 4B"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Country *"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={!!errors.country}
              helperText={errors.country || ''}
              required
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number *"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              error={!!errors.phone_number}
              helperText={errors.phone_number || 'Enter without hyphens'}
              required
              placeholder="08012345678"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={formData.is_default} onChange={handleSwitchChange} />}
              label="Set as default address"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;
