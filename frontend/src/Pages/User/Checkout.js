import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ArrowBack,
  Payment,
  PhoneAndroid,
  CreditCard,
  AccountBalance,
  CheckCircle
} from "@mui/icons-material";

function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [openSuccess, setOpenSuccess] = useState(false);

  const steps = ["Delivery", "Payment Method", "Confirm Order"];

  // Delivery Details
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  // Order Details (from cart)
  const orderDetails = {
    items: 3,
    subtotal: 9997,
    shipping: 0,
    tax: 1799,
    total: 11796
  };

  const handleDeliveryChange = (field, value) => {
    setDeliveryDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (activeStep === 0) {
      if (!deliveryDetails.fullName || !deliveryDetails.email || !deliveryDetails.phone || !deliveryDetails.address) {
        alert("Please fill all delivery details");
        return;
      }
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    setOpenSuccess(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER */}
      <AppBar position="sticky" sx={{ bgcolor: "white", color: "#1e293b", boxShadow: 1 }}>
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            onClick={() => navigate("/cart")}
            sx={{ mr: 2, color: 'primary.main' }}
          >
            <ArrowBack />
          </IconButton>

          <Typography variant="h5" fontWeight="bold" sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            🛒 Checkout
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
              }}
              onClick={handlePlaceOrder}
            >
                opacity: 0.06
              }
            }}
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Stepper and Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, p: 3 }}>
              {/* Stepper */}
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step 1: Delivery Details */}
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Delivery Address
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={deliveryDetails.fullName}
                        onChange={(e) => handleDeliveryChange("fullName", e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={deliveryDetails.email}
                        onChange={(e) => handleDeliveryChange("email", e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={deliveryDetails.phone}
                        onChange={(e) => handleDeliveryChange("phone", e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        multiline
                        rows={3}
                        value={deliveryDetails.address}
                        onChange={(e) => handleDeliveryChange("address", e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        value={deliveryDetails.city}
                        onChange={(e) => handleDeliveryChange("city", e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="State"
                        value={deliveryDetails.state}
                        onChange={(e) => handleDeliveryChange("state", e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Zip Code"
                        value={deliveryDetails.zipCode}
                        onChange={(e) => handleDeliveryChange("zipCode", e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 2: Payment Method */}
              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Select Payment Method
                  </Typography>

                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {/* UPI */}
                    <Card sx={{ mb: 2, borderRadius: 2, border: paymentMethod === "upi" ? "2px solid" : "1px solid #e0e0e0", borderColor: paymentMethod === "upi" ? 'primary.main' : '#e0e0e0', cursor: "pointer" }}>
                      <CardContent>
                        <FormControlLabel
                          value="upi"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                              <PhoneAndroid sx={{ color: 'primary.main', fontSize: 28 }} />
                              <Box>
                                <Typography fontWeight="600">UPI (Google Pay, PhonePe, Paytm)</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Fast and secure payment using UPI
                                </Typography>
                              </Box>
                            </Box>
                          }
                          sx={{ flex: 1 }}
                        />
                      </CardContent>
                    </Card>

                    {/* Credit/Debit Card */}
                    <Card sx={{ mb: 2, borderRadius: 2, border: paymentMethod === "card" ? "2px solid" : "1px solid #e0e0e0", borderColor: paymentMethod === "card" ? 'primary.main' : '#e0e0e0', cursor: "pointer" }}>
                      <CardContent>
                        <FormControlLabel
                          value="card"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                              <CreditCard sx={{ color: 'primary.main', fontSize: 28 }} />
                              <Box>
                                <Typography fontWeight="600">Credit/Debit Card</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Visa, Mastercard, American Express
                                </Typography>
                              </Box>
                            </Box>
                          }
                          sx={{ flex: 1 }}
                        />
                      </CardContent>
                    </Card>

                    {/* Net Banking */}
                    <Card sx={{ mb: 2, borderRadius: 2, border: paymentMethod === "netbanking" ? "2px solid" : "1px solid #e0e0e0", borderColor: paymentMethod === "netbanking" ? 'primary.main' : '#e0e0e0', cursor: "pointer" }}>
                      <CardContent>
                        <FormControlLabel
                          value="netbanking"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                              <AccountBalance sx={{ color: 'primary.main', fontSize: 28 }} />
                              <Box>
                                <Typography fontWeight="600">Net Banking</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  All major Indian banks
                                </Typography>
                              </Box>
                            </Box>
                          }
                          sx={{ flex: 1 }}
                        />
                      </CardContent>
                    </Card>

                    {/* Wallet */}
                    <Card sx={{ mb: 2, borderRadius: 2, border: paymentMethod === "wallet" ? "2px solid" : "1px solid #e0e0e0", borderColor: paymentMethod === "wallet" ? 'primary.main' : '#e0e0e0', cursor: "pointer" }}>
                      <CardContent>
                        <FormControlLabel
                          value="wallet"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                              <Payment sx={{ color: 'primary.main', fontSize: 28 }} />
                              <Box>
                                <Typography fontWeight="600">Digital Wallet</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Amazon Pay, Airtel Money
                                </Typography>
                              </Box>
                            </Box>
                          }
                          sx={{ flex: 1 }}
                        />
                      </CardContent>
                    </Card>

                    {/* Cash on Delivery */}
                    <Card sx={{ borderRadius: 2, border: paymentMethod === "cod" ? "2px solid" : "1px solid #e0e0e0", borderColor: paymentMethod === "cod" ? 'primary.main' : '#e0e0e0', cursor: "pointer" }}>
                      <CardContent>
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                              <PhoneAndroid sx={{ color: 'primary.main', fontSize: 28 }} />
                              <Box>
                                <Typography fontWeight="600">Cash on Delivery</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Pay when you receive your order
                                </Typography>
                              </Box>
                            </Box>
                          }
                          sx={{ flex: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </Box>
              )}

              {/* Step 3: Order Confirmation */}
              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Order Summary
                  </Typography>

                  <Card sx={{ p: 2, mb: 3, bgcolor: 'primary.main', opacity: 0.06, borderRadius: 2 }}>
                    <Typography fontWeight="600" sx={{ mb: 2 }}>
                      Delivery Address
                    </Typography>
                    <Typography variant="body2">
                      {deliveryDetails.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {deliveryDetails.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {deliveryDetails.city}, {deliveryDetails.state} {deliveryDetails.zipCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {deliveryDetails.phone}
                    </Typography>
                  </Card>

                  <Card sx={{ p: 2, mb: 3, bgcolor: 'primary.main', opacity: 0.06, borderRadius: 2 }}>
                    <Typography fontWeight="600" sx={{ mb: 2 }}>
                      Payment Method
                    </Typography>
                    <Typography variant="body2">
                      {paymentMethod === "upi" && "UPI (Google Pay, PhonePe, Paytm)"}
                      {paymentMethod === "card" && "Credit/Debit Card"}
                      {paymentMethod === "netbanking" && "Net Banking"}
                      {paymentMethod === "wallet" && "Digital Wallet"}
                      {paymentMethod === "cod" && "Cash on Delivery"}
                    </Typography>
                  </Card>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    By clicking "Place Order", you agree to our terms and conditions.
                  </Typography>
                </Box>
              )}

              {/* Navigation Buttons */}
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 4 }}>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handlePrevStep}
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    fontWeight: 600
                  }}
                >
                  Back
                </Button>

                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNextStep}
                    sx={{
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: 600,
                      px: 4
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    sx={{
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                      fontWeight: 600,
                      px: 4
                    }}
                  >
                    Place Order
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, position: "sticky", top: 80 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Order Summary
              </Typography>

              <Box sx={{ pb: 2, borderBottom: "1px solid #e0e0e0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary">Items ({orderDetails.items})</Typography>
                  <Typography>₹{orderDetails.subtotal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography sx={{ color: "#4caf50", fontWeight: 600 }}>FREE</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Tax (18%)</Typography>
                  <Typography>₹{orderDetails.tax}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: 'primary.main' }}
                >
                  ₹{orderDetails.total}
                </Typography>
              </Box>

              <Box sx={{ bgcolor: "#4caf5010", p: 1.5, borderRadius: 1, mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  ✓ You will save ₹2,000 on this order
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                  fontWeight: 600
                }}
              >
                Help & Support
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Success Dialog */}
      <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
        <DialogTitle sx={{ textAlign: "center", py: 2 }}>
          <CheckCircle sx={{ fontSize: 60, color: "#4caf50", mb: 1 }} />
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Order Placed Successfully! 🎉
          </Typography>
          <Typography color="text.secondary">
            Order ID: #{Math.floor(Math.random() * 1000000)}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            You will receive your order within 3-5 business days.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            sx={{ background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)" }}
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Checkout;
