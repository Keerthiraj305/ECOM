import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Rating
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  FavoriteBorder,
  Favorite,
  LocalShipping,
  Security,
  Support,
  TrendingUp,
  Menu
} from "@mui/icons-material";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "₹2,999",
    originalPrice: "₹4,999",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.5,
    reviews: 128,
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₹4,999",
    originalPrice: "₹7,999",
    discount: "38% OFF",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.8,
    reviews: 256,
    tag: "Trending"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: "₹1,999",
    originalPrice: "₹3,499",
    discount: "43% OFF",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    rating: 4.3,
    reviews: 89,
    tag: "Hot Deal"
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: "₹1,499",
    originalPrice: "₹2,999",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    rating: 4.6,
    reviews: 143,
    tag: "New Arrival"
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: "₹899",
    originalPrice: "₹1,499",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    rating: 4.4,
    reviews: 201,
    tag: "Popular"
  },
  {
    id: 6,
    name: "Phone Stand",
    price: "₹599",
    originalPrice: "₹999",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400",
    rating: 4.2,
    reviews: 67,
    tag: "Budget Pick"
  }
];

const features = [
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "Free Shipping",
    description: "On orders above ₹999"
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: "Secure Payment",
    description: "100% Protected"
  },
  {
    icon: <Support sx={{ fontSize: 40 }} />,
    title: "24/7 Support",
    description: "Dedicated support"
  }
];

function Homepage() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const addToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
        alert('Please login first');
        navigate('/');
        return;
      }

      const response = await fetch('http://localhost:3003/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          product_id: product.id,
          quantity: 1
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setCartCount(prev => prev + 1);
        alert('Product added to cart!');
      } else {
        alert(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Error adding to cart');
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: "#f8f9fa" }}>
      {/* ENHANCED HEADER */}
      <AppBar position="sticky" sx={{ bgcolor: "white", color: "#1e293b", boxShadow: 1 }}>
        <Toolbar sx={{ py: 1 }}>
          <IconButton sx={{ mr: 2, display: { md: "none" } }}>
            <Menu />
          </IconButton>
          
              <Typography variant="h5" fontWeight="bold" sx={{ 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mr: 4
          }}>
            🛍️ MyShop
          </Typography>

          {/* Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button 
              onClick={() => navigate("/home")}
              sx={{ 
                color: "#1e293b",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  bgcolor: 'primary.main',
                  opacity: 0.06,
                  color: 'primary.main'
                }
              }}
            >
              HOME
            </Button>
            <Button 
              onClick={() => navigate("/about")}
              sx={{ 
                color: "#1e293b",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  bgcolor: 'primary.main',
                  opacity: 0.06,
                  color: 'primary.main'
                }
              }}
            >
              ABOUT
            </Button>
            <Button 
              onClick={() => navigate("/home")}
              sx={{ 
                color: "#1e293b",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  bgcolor: 'primary.main',
                  opacity: 0.06,
                  color: 'primary.main'
                }
              }}
            >
              STORE
            </Button>
            <Button 
              onClick={() => navigate("/cart")}
              sx={{ 
                color: "#1e293b",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  bgcolor: 'primary.main',
                  opacity: 0.06,
                  color: 'primary.main'
                }
              }}
            >
              CART
            </Button>
            <Button 
              onClick={() => navigate("/orders")}
              sx={{ 
                color: "#1e293b",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  bgcolor: 'primary.main',
                  opacity: 0.06,
                  color: 'primary.main'
                }
              }}
            >
              ORDERS
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              placeholder="Search..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ 
                width: 200,
                bgcolor: "#f8f9fa",
                borderRadius: 2,
                display: { xs: "none", lg: "block" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                )
              }}
            />

            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <Button
              variant="contained"
              sx={{ 
                borderRadius: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4
                }
              }}
              onClick={() => navigate("/admin/dashboard")}
            >
              Admin
            </Button>

            <Button
              variant="outlined"
              sx={{
                ml: 1,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main'
              }}
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/');
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION - ENHANCED */}
      <Box
        sx={{
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          py: 8,
          px: 3,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)"
        }} />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip 
                label="🔥 MEGA SALE - UP TO 50% OFF" 
                sx={{ 
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                  mb: 2
                }} 
              />
              <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ 
                fontSize: { xs: "2.5rem", md: "3.5rem" }
              }}>
                Welcome to MyShop
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Discover amazing deals on premium products. Shop the latest trends at unbeatable prices!
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: "white",
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#f8f9fa",
                      transform: "translateY(-2px)",
                      boxShadow: 4
                    },
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => {
                    document.getElementById("products-section").scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Shop Now 🛒
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: "white",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                      borderColor: "white"
                    }
                  }}
                  onClick={() => {
                    document.getElementById("products-section").scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Deals
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h1" sx={{ fontSize: "8rem", opacity: 0.2 }}>
                  🛍️
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: "center",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* PRODUCTS SECTION - ENHANCED */}
      <Container id="products-section" maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Featured Products
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Handpicked items just for you
            </Typography>
          </Box>
          <Button 
            endIcon={<TrendingUp />}
            sx={{ 
              display: { xs: "none", sm: "flex" },
              color: 'primary.main',
              fontWeight: 600
            }}
          >
            View All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ 
                height: "100%",
                borderRadius: 3,
                transition: "all 0.3s ease",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6
                }
              }}>
                {/* Tag */}
                <Chip 
                  label={product.tag}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 1,
                    bgcolor: product.tag === "Trending" ? "#ff9800" : "#4caf50",
                    color: "white",
                    fontWeight: 600
                  }}
                />

                {/* Favorite Button */}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    bgcolor: "white",
                    boxShadow: 2,
                    "&:hover": {
                      bgcolor: "#f8f9fa"
                    }
                  }}
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites.has(product.id) ? (
                    <Favorite sx={{ color: "#ff4081" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>

                <CardMedia
                  component="img"
                  height="220"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    {product.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main' }}>
                      {product.price}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      {product.originalPrice}
                    </Typography>
                    <Chip 
                      label={product.discount}
                      size="small"
                      sx={{ 
                        bgcolor: "#4caf5020",
                        color: "#4caf50",
                        fontWeight: 600
                      }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    onClick={() => addToCart(product)}
                    sx={{ 
                      borderRadius: 2,
                      py: 1.2,
                      background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      fontWeight: 600,
                      "&:hover": {
                        boxShadow: 4
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No products found for "{searchQuery}"
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                  }}
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* FOOTER */}
      <Box sx={{ 
        bgcolor: "#1e293b", 
        color: "white", 
        py: 6,
        mt: 6
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                🛍️ MyShop
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Your one-stop destination for quality products at amazing prices.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["About Us", "Contact", "Terms & Conditions", "Privacy Policy"].map(link => (
                  <Typography 
                    key={link}
                    variant="body2" 
                    sx={{ 
                      opacity: 0.8,
                      cursor: "pointer",
                      "&:hover": { opacity: 1 }
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Email: support@myshop.com<br />
                Phone: +91 1234567890<br />
                Address: Mysuru, Karnataka, IN
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4, pt: 4, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2026 MyShop. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Homepage;