import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  Container,
  AppBar,
  Toolbar,
  Badge,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Delete,
  Add,
  Remove,
  ShoppingCart,
  ArrowBack
} from "@mui/icons-material";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
        setError('Please login first');
        navigate('/');
        return;
      }

      const response = await fetch(`http://localhost:3003/api/cart/${user.id}`);
      const data = await response.json();

      if (data.success) {
        setCartItems(data.cartItems);
        setError("");
      } else {
        setError(data.message || 'Failed to fetch cart items');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3003/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });

      const data = await response.json();

      if (data.success) {
        setCartItems(cartItems.map(item =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        alert(data.message || 'Failed to update quantity');
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Error updating quantity');
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:3003/api/cart/${cartItemId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
      } else {
        alert(data.message || 'Failed to remove item');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Error removing item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = calculateTotal();

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER */}
      <AppBar position="sticky" sx={{ bgcolor: "white", color: "#1e293b", boxShadow: 1 }}>
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            onClick={() => navigate("/home")}
            sx={{ mr: 2, color: 'primary.main' }}
          >
            <ArrowBack />
          </IconButton>

          <Typography variant="h5" fontWeight="bold" sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            🛍️ My Cart
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Badge badgeContent={totalItems} color="error" sx={{ mr: 2 }}>
            <ShoppingCart sx={{ color: 'primary.main', fontSize: 28 }} />
          </Badge>

          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: 'primary.main',
              color: 'primary.main',
              "&:hover": {
                borderColor: "#764ba2",
                bgcolor: 'primary.main',
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
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : cartItems.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <ShoppingCart sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
              }}
              onClick={() => navigate("/home")}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items Table */}
            <Grid item xs={12} md={8}>
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: 'primary.main', opacity: 0.06 }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Price</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Quantity</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Total</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id} sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1,
                                bgcolor: 'primary.main',
                                opacity: 0.125,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                color: 'primary.main'
                              }}
                            >
                              P#{item.product_id}
                            </Box>
                            <Typography fontWeight={500}>{item.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ color: 'primary.main', fontWeight: 600 }}>
                            ₹{item.price}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              sx={{ color: 'primary.main' }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ minWidth: 20, textAlign: "center" }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              sx={{ color: 'primary.main' }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ color: 'primary.main', fontWeight: 600 }}>
                            ₹{item.price * item.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => removeItem(item.id)}
                            sx={{ color: "#ff4081" }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="text"
                sx={{ mt: 2, color: 'primary.main' }}
                onClick={() => navigate("/home")}
              >
                ← Continue Shopping
              </Button>
            </Grid>

            {/* Cart Summary */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Order Summary
                  </Typography>

                  <Box sx={{ my: 2, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography color="text.secondary">Subtotal</Typography>
                      <Typography>₹{totalPrice}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography color="text.secondary">Shipping</Typography>
                      <Typography sx={{ color: "#4caf50", fontWeight: 600 }}>FREE</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography color="text.secondary">Tax</Typography>
                      <Typography>₹{Math.round(totalPrice * 0.18)}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Total
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: 'primary.main' }}
                    >
                      ₹{totalPrice + Math.round(totalPrice * 0.18)}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: 600,
                      mb: 1,
                      "&:hover": {
                        boxShadow: 4
                      }
                    }}
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontWeight: 600
                    }}
                    onClick={() => navigate("/home")}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card sx={{ borderRadius: 2, boxShadow: 2, mt: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Have a promo code?
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <input
                      type="text"
                      placeholder="Enter code"
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                        fontSize: "14px"
                      }}
                    />
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        textTransform: "none"
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Cart;
