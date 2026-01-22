import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Paper,
  LinearProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
  Assessment,
  Settings,
  Notifications,
  MoreVert
} from "@mui/icons-material";

function Dashboard() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced mock data matching whiteboard design
  const stats = [
    { 
      title: "Total Sales", 
      value: "$52,000", 
      change: "+12.5%",
      icon: <AttachMoney />,
      color: "#4caf50",
      trend: "up"
    },
    { 
      title: "Orders", 
      value: "1,234", 
      change: "+8.2%",
      icon: <ShoppingCart />,
      color: "#2196f3",
      trend: "up"
    },
    { 
      title: "Customers", 
      value: "567", 
      change: "+15.3%",
      icon: <People />,
      color: "#ff9800",
      trend: "up"
    },
    { 
      title: "Revenue", 
      value: "$45,678", 
      change: "+22.1%",
      icon: <TrendingUp />,
      color: "#9c27b0",
      trend: "up"
    }
  ];

  const recentOrders = [
    { id: "#12345", customer: "John Doe", amount: "$299", status: "Completed" },
    { id: "#12346", customer: "Jane Smith", amount: "$450", status: "Processing" },
    { id: "#12347", customer: "Bob Johnson", amount: "$199", status: "Pending" },
    { id: "#12348", customer: "Alice Brown", amount: "$899", status: "Completed" },
  ];

  const quickActions = [
    { label: "Manage Users", icon: <People />, color: "#2196f3" },
    { label: "Manage Orders", icon: <ShoppingCart />, color: "#4caf50" },
    { label: "Manage Products", icon: <Inventory />, color: "#ff9800" },
    { label: "View Reports", icon: <Assessment />, color: "#9c27b0" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Enhanced AppBar */}
      <AppBar position="static" sx={{ bgcolor: "#1e293b", boxShadow: 3 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            🛍️ Admin Dashboard
          </Typography>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Notifications />
          </IconButton>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Settings />
          </IconButton>
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "#1e293b" }}>
            Welcome Back, Admin! 👋
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here's what's happening with your store today
          </Typography>
        </Box>
        
        {/* Stats Cards - Matching Whiteboard Design */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: "100%",
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                  border: `2px solid ${stat.color}30`,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  transform: hoveredCard === index ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: hoveredCard === index ? 6 : 2,
                  "&:hover": {
                    boxShadow: 6
                  }
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box 
                      sx={{ 
                        bgcolor: stat.color,
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: 2
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Chip 
                      label={stat.change} 
                      size="small" 
                      sx={{ 
                        bgcolor: "#4caf5020",
                        color: "#4caf50",
                        fontWeight: 600
                      }} 
                    />
                  </Box>
                  <Typography color="textSecondary" variant="body2" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    sx={{ 
                      mt: 2, 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: `${stat.color}20`,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: stat.color
                      }
                    }} 
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Chart/Graph Section - Left Side (matching whiteboard) */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Sales Overview
                  </Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                {/* Placeholder for chart - mimicking whiteboard curve */}
                <Box sx={{ 
                  height: 300, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 2,
                  color: "white",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <Box sx={{ 
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50% 50% 0 0 / 20% 20% 0 0"
                  }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, zIndex: 1 }}>
                    📈 Interactive Chart Area
                  </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: "block" }}>
                  Integrate with Recharts or Chart.js for live data visualization
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Quick Actions - Right Side */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          bgcolor: `${action.color}10`,
                          border: `2px solid ${action.color}30`,
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: 3,
                            bgcolor: `${action.color}20`
                          }
                        }}
                      >
                        <Box sx={{ color: action.color, mb: 1 }}>
                          {action.icon}
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {action.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <List dense>
                  {[1, 2, 3].map((item) => (
                    <React.Fragment key={item}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#2196f3" }}>
                            <ShoppingCart fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`New order #1234${item}`}
                          secondary="2 minutes ago"
                        />
                      </ListItem>
                      {item < 3 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Orders Table */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Orders
                </Typography>
                <Box sx={{ overflowX: "auto" }}>
                  <Box component="table" sx={{ width: "100%", mt: 2 }}>
                    <Box component="thead">
                      <Box component="tr" sx={{ borderBottom: "2px solid #e0e0e0" }}>
                        <Box component="th" sx={{ p: 2, textAlign: "left", fontWeight: 600 }}>Order ID</Box>
                        <Box component="th" sx={{ p: 2, textAlign: "left", fontWeight: 600 }}>Customer</Box>
                        <Box component="th" sx={{ p: 2, textAlign: "left", fontWeight: 600 }}>Amount</Box>
                        <Box component="th" sx={{ p: 2, textAlign: "left", fontWeight: 600 }}>Status</Box>
                      </Box>
                    </Box>
                    <Box component="tbody">
                      {recentOrders.map((order) => (
                        <Box 
                          component="tr" 
                          key={order.id}
                          sx={{ 
                            borderBottom: "1px solid #f0f0f0",
                            "&:hover": { bgcolor: "#f5f5f5" }
                          }}
                        >
                          <Box component="td" sx={{ p: 2 }}>{order.id}</Box>
                          <Box component="td" sx={{ p: 2 }}>{order.customer}</Box>
                          <Box component="td" sx={{ p: 2, fontWeight: 600 }}>{order.amount}</Box>
                          <Box component="td" sx={{ p: 2 }}>
                            <Chip 
                              label={order.status}
                              size="small"
                              color={order.status === "Completed" ? "success" : order.status === "Processing" ? "primary" : "warning"}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;