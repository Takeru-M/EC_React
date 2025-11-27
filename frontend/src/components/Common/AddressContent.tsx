import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  MenuItem,
} from '@mui/material';
import { Address } from '../../redux/users/type';

const countries = ['United States', 'Canada', 'United Kingdom', 'Japan', 'Germany'];

const AddressContent = () => {
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

  return (
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
  )
}

export default AddressContent;
