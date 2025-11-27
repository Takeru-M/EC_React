import React, { useEffect, useState } from "react";
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
  IconButton,
  Switch,
  MenuItem
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux";
import { useNavigate } from "react-router-dom";
import { ORDER_STATUS, TAX_RATE } from "../constants/constants";
import { Address } from "../redux/users/type";
import { createAddress, fetchAddresses, setIsLoading } from "../redux/users/userSlice";
import LoadingScreen from "../components/Common/Loading";
import { defaultAddress as defaultAddressData } from "../redux/users/type";
import { OrderTablePayload, OrderItemsPayload, Order } from "../redux/orders/type";
// import { createOrder, createOrderItems } from "../redux/orders/orderSlice";
import { clearCart, setIsLoading as setCartIsLoading } from "../redux/carts/cartSlice";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe("pk_test_51Qvk3oFj5qxoG818hojLuE2QA2APokm9lj8blRjVk8VHBzqr7YE6bYemNhFK5MqnP5VCjQoko67jJmg8ZxG1VuOK008QTTFBCs");

const countries = ['United States', 'Canada', 'United Kingdom', 'Japan', 'Germany'];

interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Mock default address - In a real app, this would come from your backend
// const defaultAddress: AddressData = {
//   street: "123 Main St",
//   city: "San Francisco",
//   state: "CA",
//   zipCode: "94105",
//   country: "USA"
// };

const PriceBreakdown = ({ sub_total, tax, total_price }: { 
  sub_total: number; 
  tax: number; 
  total_price: number; 
}) => {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Subtotal" />
        <Typography>${sub_total.toFixed(2)}</Typography>
      </ListItem>
      <ListItem>
        <ListItemText primary="Tax (10%)" />
        <Typography>${tax.toFixed(2)}</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={<Typography variant="h6">Total</Typography>} />
        <Typography variant="h6">${total_price.toFixed(2)}</Typography>
      </ListItem>
    </List>
  );
};

const AddressDisplay = ({ address }: { address: Address }) => (
  <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, border: 1, borderColor: "divider" }}>
    <Typography>{address.address}</Typography>
    <Typography>{`${address.postal_code}, ${address.country}`}</Typography>
  </Box>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const elements = useElements();
  const addresses = useSelector((state: RootState) => state.user.addresses);
  const defaultAddress = addresses.find((address) => Boolean(address.is_default) === true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState<Address>(defaultAddress as Address);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressType, setAddressType] = useState("default");
  const [showSaveAddressModal, setShowSaveAddressModal] = useState(false);
  const [errors, setErrors] = useState({});
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const [formData, setFormData] = useState<Address>(defaultAddressData);
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.carts);
  const sub_total = useSelector((state: RootState) => state.cart.sub_total);
  const tax = sub_total * TAX_RATE;
  const total_price = sub_total + tax;

  useEffect(() => {
    if (user) {
      dispatch(fetchAddresses({id: user.id}))
      .unwrap()
      .then(() => {
        dispatch(setIsLoading(false));
      });
    }
    dispatch(setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!user) {
      setIsEditingAddress(true);
    }
  }, [user]);

  const handleAddressChange = (field: keyof Address) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleAddressTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressType(event.target.value);
    if (event.target.value === "default") {
      setAddress(address);
      setIsEditingAddress(false);
    } else {
      setIsEditingAddress(true);
    }
  };

  const handleSaveAddress = () => {
    // Here you would typically save the address to your backend
    setAddress(formData);
    setShowSaveAddressModal(false);
    setIsEditingAddress(false);
    dispatch(createAddress({formData}));
  };

  //TODO: 頑張る
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handlePayment(e);
    handleOrder(e);
  };

  const handlePayment = async (e: React.FormEvent) => {
    // e.preventDefault();
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
              country: address.country,
              postal_code: address.postal_code,
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

  // defaultAdressの時はdefaultAddressを，それ以外の時はformDataを使用する
  // userと非userを意識する
  const handleOrder = async (e: React.FormEvent) => {
    dispatch(setCartIsLoading(true));
    if (user && !isEditingAddress) {
      // ユーザかつdefaultAdress
      const OrderTablePayload: OrderTablePayload = {
        user: user,
        address: defaultAddress?.address,
        // TODO: Implement the function to calculate the shipping fee
        shipping_fee: 0,
        total_price: total_price,
        status: ORDER_STATUS.PAID,
      };
      const orderResponse: Order = await dispatch(createOrder(OrderTablePayload))
        .unwrap()
        .then(() => {
          if (orderResponse.id) {
            // orderd_itemsに登録（商品情報）
            const orderItemsPayload: OrderItemsPayload = {
              order_id: orderResponse.id,
              products: cartItems,
            };
            try {
              dispatch()
              .unwrap()
              .then(() => {
                dispatch(setCartIsLoading(false));
                  navigate('/order/complete');
                  dispatch(clearCart());
                  // メール送信
              });
            } catch (error) {
              console.error("Error creating order items:", error);
            }
          }
        });
    } else if (user && isEditingAddress) {
      // ユーザかつ新規アドレス
    } else if (isEditingAddress) {
      // 非ユーザかつ新規アドレス
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen message="Loading..." />
        ) : (
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
                  {user?.id ? (
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
                          {<AddressDisplay address={defaultAddress as Address} />}
                        </Box>
                        <FormControlLabel 
                          value="new" 
                          control={<Radio />} 
                          label="Use a different address" 
                        />
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <Typography sx={{ mb: 2 }}></Typography>
                  )}

                  {isEditingAddress && (
                    <Grid container spacing={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Name *"
                            name="name"
                            value={formData.name}
                            onChange={handleAddressChange('name')}
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
                            onChange={handleAddressChange('postal_code')}
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
                            onChange={handleAddressChange('address')}
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
                            onChange={handleAddressChange('country')}
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
                            onChange={handleAddressChange('phone_number')}
                            error={!!errors.phone_number}
                            helperText={errors.phone_number || 'Enter without hyphens'}
                            required
                            placeholder="08012345678"
                          />
                        </Grid>
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
                  <PriceBreakdown sub_total={sub_total} tax={tax} total_price={total_price} />
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
              <AddressDisplay address={formData} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                setAddress(formData);
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
      )}
    </>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
