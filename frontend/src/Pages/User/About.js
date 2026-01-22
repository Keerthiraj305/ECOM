import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Rating,
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ArrowBack,
  LocalShipping,
  Security,
  Support,
  Favorite,
  TrendingUp
} from "@mui/icons-material";

function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "Fast Shipping",
      description: "Free shipping on orders above ₹999. Quick delivery to your doorstep."
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "100% Secure",
      description: "Your payments are encrypted and secured with latest technology."
    },
    {
      icon: <Support sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to help you 24/7."
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "Best Prices",
      description: "We offer the most competitive prices and amazing discounts."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "Great experience shopping here! Fast delivery and excellent customer service."
    },
    {
      name: "Priya Singh",
      rating: 4.5,
      text: "Amazing products and prices. Will definitely shop again!"
    },
    {
      name: "Arjun Verma",
      rating: 5,
      text: "Best online store I've ever used. Highly recommended!"
    }
  ];

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
            ℹ️ About Us
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

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

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
            Welcome to MyShop
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
            Your one-stop online destination for premium products at unbeatable prices. We're committed to providing the best shopping experience.
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              px: 4,
              py: 1.5,
              fontWeight: 600
            }}
            onClick={() => navigate("/home")}
          >
            Start Shopping
          </Button>
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: "center" }}>
            Why Choose Us?
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ borderRadius: 2, textAlign: "center", h: "100%", boxShadow: 1, "&:hover": { boxShadow: 4 } }}>
                  <CardContent sx={{ py: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Mission */}
        <Box sx={{ mb: 8, bgcolor: 'primary.main', opacity: 0.06, p: 4, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            At MyShop, our mission is to revolutionize online shopping by providing an unparalleled selection of high-quality products at affordable prices. We believe every customer deserves the best value for their money.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We are dedicated to:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 1 }}>
            <Typography component="li" color="text.secondary" sx={{ mb: 1 }}>
              Offering a wide variety of products from trusted brands
            </Typography>
            <Typography component="li" color="text.secondary" sx={{ mb: 1 }}>
              Ensuring secure and convenient payment options
            </Typography>
            <Typography component="li" color="text.secondary" sx={{ mb: 1 }}>
              Providing fast and reliable delivery services
            </Typography>
            <Typography component="li" color="text.secondary">
              Delivering exceptional customer service
            </Typography>
          </Box>
        </Box>

        {/* Customer Testimonials */}
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: "center" }}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ borderRadius: 2, boxShadow: 1, "&:hover": { boxShadow: 4 } }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Favorite sx={{ color: "#ff4081", mr: 1 }} />
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2, minHeight: 60 }}>
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'primary.main' }}>
                      {testimonial.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
