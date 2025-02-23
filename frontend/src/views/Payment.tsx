import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { api } from "../constants/axios";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  CircularProgress, 
  Alert,
  Grid,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe("pk_test_51Qvk3oFj5qxoG818hojLuE2QA2APokm9lj8blRjVk8VHBzqr7YE6bYemNhFK5MqnP5VCjQoko67jJmg8ZxG1VuOK008QTTFBCs");

interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Mock default address - In a real app, this would come from your backend
const defaultAddress: AddressData = {
  street: "123 Main St",
  city: "San Francisco",
  state: "CA",
  zipCode: "94105",
  country: "USA"
};

const PriceBreakdown = () => {
  const subtotal = 10.00;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <List>
      <ListItem>
        <ListItemText primary="Subtotal" />
        <Typography>${subtotal.toFixed(2)}</Typography>
      </ListItem>
      <ListItem>
        <ListItemText primary="Tax (10%)" />
        <Typography>${tax.toFixed(2)}</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={<Typography variant="h6">Total</Typography>} />
        <Typography variant="h6">${total.toFixed(2)}</Typography>
      </ListItem>
    </List>
  );
};

const AddressDisplay = ({ address }: { address: AddressData }) => (
  <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, border: 1, borderColor: "divider" }}>
    <Typography>{address.street}</Typography>
    <Typography>{`${address.city}, ${address.state} ${address.zipCode}`}</Typography>
    <Typography>{address.country}</Typography>
  </Box>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState<AddressData>(defaultAddress);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressType, setAddressType] = useState("default");
  const [showSaveAddressModal, setShowSaveAddressModal] = useState(false);
  const [tempAddress, setTempAddress] = useState<AddressData>(defaultAddress);

  const handleAddressChange = (field: keyof AddressData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTempAddress(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleAddressTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressType(event.target.value);
    if (event.target.value === "default") {
      setAddress(defaultAddress);
      setTempAddress(defaultAddress);
      setIsEditingAddress(false);
    } else {
      setIsEditingAddress(true);
    }
  };

  const handleSaveAddress = () => {
    // Here you would typically save the address to your backend
    setAddress(tempAddress);
    setShowSaveAddressModal(false);
    setIsEditingAddress(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // If using new address, show save modal
    if (addressType === "new" && !showSaveAddressModal) {
      setShowSaveAddressModal(true);
      setLoading(false);
      return;
    }

    if (!stripe || !elements) return;

    try {
      const { data } = await api.post("/create-payment-intent", {
        amount: 1100, // $11.00 (including tax) in cents
        address // Send address data to backend
      });

      const { clientSecret } = data;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { 
          card: cardElement,
          billing_details: {
            address: {
              line1: address.street,
              city: address.city,
              state: address.state,
              postal_code: address.zipCode,
              country: address.country
            }
          }
        }
      });

      if (error) {
        setError(error.message ?? "Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* Left side - Address and Payment Form */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <RadioGroup
                  value={addressType}
                  onChange={handleAddressTypeChange}
                >
                  <FormControlLabel 
                    value="default" 
                    control={<Radio />} 
                    label="Use default address"
                  />
                  <Box sx={{ ml: 4, mb: 2 }}>
                    {addressType === "default" && <AddressDisplay address={defaultAddress} />}
                  </Box>
                  <FormControlLabel 
                    value="new" 
                    control={<Radio />} 
                    label="Use a different address" 
                  />
                </RadioGroup>
              </FormControl>

              {isEditingAddress && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      value={tempAddress.street}
                      onChange={handleAddressChange("street")}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={tempAddress.city}
                      onChange={handleAddressChange("city")}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      value={tempAddress.state}
                      onChange={handleAddressChange("state")}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="ZIP Code"
                      value={tempAddress.zipCode}
                      onChange={handleAddressChange("zipCode")}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={tempAddress.country}
                      onChange={handleAddressChange("country")}
                      required
                    />
                  </Grid>
                </Grid>
              )}

              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Payment Details
              </Typography>
              <Box sx={{ mb: 3, p: 2, borderRadius: 1, bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
                <CardElement options={{ 
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }} />
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={!stripe || loading}
                sx={{ mt: 2 }}
                size="large"
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Complete Purchase"}
              </Button>

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mt: 2 }}>Payment successful! Thank you for your purchase.</Alert>}
            </form>
          </Grid>

          {/* Right side - Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <PriceBreakdown />
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Save Address Modal */}
      <Dialog open={showSaveAddressModal} onClose={() => setShowSaveAddressModal(false)}>
        <DialogTitle>Save New Address</DialogTitle>
        <DialogContent>
          <Typography>
            Would you like to save this address for future purchases?
          </Typography>
          <AddressDisplay address={tempAddress} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddress(tempAddress);
            setShowSaveAddressModal(false);
            handleSubmit(new Event('submit') as any);
          }}>
            No, just use for this purchase
          </Button>
          <Button onClick={handleSaveAddress} variant="contained" color="primary">
            Yes, save address
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
