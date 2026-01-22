import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Card,
  CardContent,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ArrowBack,
  Visibility,
  LocalShipping
} from "@mui/icons-material";

function Orders() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const [orders] = useState([
    {
      id: "ORD-001234",
      date: "2024-01-15",
      total: "₹9,999",
      status: "Delivered",
      items: 2,
      estimatedDelivery: "Delivered on Jan 18"
    },
    {
      id: "ORD-001235",
      date: "2024-01-18",
      total: "₹4,999",
      status: "Shipped",
      items: 1,
      estimatedDelivery: "Expected by Jan 22"
    },
    {
      id: "ORD-001236",
      date: "2024-01-19",
      total: "₹14,999",
      status: "Processing",
      items: 3,
      estimatedDelivery: "Expected by Jan 25"
    },
    {
      id: "ORD-001237",
      date: "2024-01-20",
      total: "₹2,999",
      status: "Pending",
      items: 1,
      estimatedDelivery: "Will process soon"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered":
        return "#4caf50";
      case "Shipped":
        return "#2196f3";
      case "Processing":
        return "#ff9800";
      case "Pending":
        return "#f44336";
      default:
        return "#5b6ef8";
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetails(true);
  };

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
            📦 My Orders
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {orders.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <LocalShipping sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No orders yet
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}
              onClick={() => navigate("/home")}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Your Orders ({orders.length})
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: 'primary.main', opacity: 0.06 }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Items</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Total</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                      <TableCell>
                        <Typography fontWeight={600} sx={{ color: 'primary.main' }}>
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{order.date}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={`${order.items} item${order.items > 1 ? 's' : ''}`} size="small" />
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>{order.total}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={order.status}
                          sx={{
                            bgcolor: `${getStatusColor(order.status)}20`,
                            color: getStatusColor(order.status),
                            fontWeight: 600
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                          <Button
                          size="small"
                          startIcon={<Visibility />}
                          sx={{ color: 'primary.main' }}
                          onClick={() => handleViewDetails(order)}
                        >
                          View
                        </Button>
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
          </Box>
        )}
      </Container>

      {/* Order Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", bgcolor: 'primary.main', opacity: 0.06 }}>
          Order Details
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedOrder && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order ID
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {selectedOrder.id}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedOrder.status}
                  sx={{
                    bgcolor: `${getStatusColor(selectedOrder.status)}20`,
                    color: getStatusColor(selectedOrder.status),
                    fontWeight: 600,
                    mt: 1
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Date
                </Typography>
                <Typography variant="body1">{selectedOrder.date}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main' }}>
                  {selectedOrder.total}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Delivery Status
                </Typography>
                <Typography variant="body1">{selectedOrder.estimatedDelivery}</Typography>
              </Box>

              <Card sx={{ bgcolor: "#f5f5f5", mt: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalShipping sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="600">
                        Free Shipping
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        On all orders
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Orders;
