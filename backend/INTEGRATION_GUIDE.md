# Backend Integration Guide - Frontend to Database

## Backend API Endpoints

### Base URL
```
http://localhost:3003/api
```

---

## 1. USER MANAGEMENT

### Register User
**Endpoint:** `POST /users/register`
```javascript
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}

// Response
{
  "success": true,
  "message": "User registered successfully.",
  "userId": 1,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St"
  }
}
```

### Login User
**Endpoint:** `POST /users/login`
```javascript
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St"
  }
}
```

### Get User Profile
**Endpoint:** `GET /users/:id`
```javascript
// Response
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St"
  }
}
```

### Update User Profile
**Endpoint:** `PUT /users/:id`
```javascript
// Request
{
  "name": "Jane Doe",
  "phone": "0987654321",
  "address": "456 Oak Ave"
}

// Response
{
  "success": true,
  "message": "User updated successfully."
}
```

---

## 2. PRODUCTS

### Get All Products
**Endpoint:** `GET /products`
```javascript
// Response
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "High quality headphones",
      "price": 2999,
      "category_id": 1,
      "stock": 50,
      "category_name": "Electronics"
    }
  ]
}
```

### Get Single Product
**Endpoint:** `GET /products/:id`
```javascript
// Response
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 2999,
    "category_name": "Electronics"
  }
}
```

---

## 3. SHOPPING CART

### Get User Cart
**Endpoint:** `GET /cart/:userId`
```javascript
// Response
{
  "success": true,
  "cartItems": [
    {
      "id": 1,
      "user_id": 1,
      "product_id": 1,
      "quantity": 2,
      "name": "Wireless Headphones",
      "price": 2999
    }
  ]
}
```

### Add to Cart
**Endpoint:** `POST /cart/add`
```javascript
// Request
{
  "user_id": 1,
  "product_id": 5,
  "quantity": 2
}

// Response
{
  "success": true,
  "message": "Item added to cart successfully.",
  "cartId": 1
}
```

### Update Cart Item Quantity
**Endpoint:** `PUT /cart/:id`
```javascript
// Request
{
  "quantity": 3
}

// Response
{
  "success": true,
  "message": "Cart item updated successfully."
}
```

### Delete Cart Item
**Endpoint:** `DELETE /cart/:id`
```javascript
// Response
{
  "success": true,
  "message": "Item removed from cart."
}
```

### Clear Cart
**Endpoint:** `DELETE /cart/clear/:userId`
```javascript
// Response
{
  "success": true,
  "message": "Cart cleared successfully."
}
```

---

## 4. ORDERS

### Create Order (Checkout)
**Endpoint:** `POST /orders`
```javascript
// Request
{
  "user_id": 1,
  "total_amount": 11796,
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 2999
    },
    {
      "product_id": 2,
      "quantity": 1,
      "price": 4999
    }
  ]
}

// Response
{
  "success": true,
  "message": "Order placed successfully.",
  "orderId": 123
}
```

### Get User Orders
**Endpoint:** `GET /orders/user/:userId`
```javascript
// Response
{
  "success": true,
  "orders": [
    {
      "id": 123,
      "user_id": 1,
      "total_amount": 11796,
      "status": "pending",
      "created_at": "2024-01-20T10:30:00"
    }
  ]
}
```

### Get Order Details
**Endpoint:** `GET /orders/:orderId`
```javascript
// Response
{
  "success": true,
  "order": {
    "id": 123,
    "user_id": 1,
    "total_amount": 11796,
    "status": "pending"
  },
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 2999,
      "name": "Wireless Headphones"
    }
  ]
}
```

---

## 5. PAYMENTS

### Create Payment
**Endpoint:** `POST /payments`
```javascript
// Request
{
  "order_id": 123,
  "amount": 11796,
  "method": "card",
  "status": "completed"
}

// Response
{
  "success": true,
  "message": "Payment recorded successfully.",
  "paymentId": 1
}
```

### Get Payment by Order
**Endpoint:** `GET /payments/:orderId`
```javascript
// Response
{
  "success": true,
  "payment": {
    "id": 1,
    "order_id": 123,
    "amount": 11796,
    "method": "card",
    "status": "completed"
  }
}
```

---

## 6. CATEGORIES

### Get All Categories
**Endpoint:** `GET /categories`
```javascript
// Response
{
  "success": true,
  "categories": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic products"
    }
  ]
}
```

---

## Frontend Implementation Examples

### Login with Backend
```javascript
// In Login.js
const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3003/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### Add to Cart with Backend
```javascript
// In Homepage.js or Product component
const handleAddToCart = async (productId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  try {
    const response = await fetch('http://localhost:3003/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        product_id: productId,
        quantity: 1
      })
    });
    
    const data = await response.json();
    if (data.success) {
      setCartCount(prev => prev + 1);
      alert('Added to cart!');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
```

### Get Cart Items
```javascript
// In Cart.js
useEffect(() => {
  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      const response = await fetch(`http://localhost:3003/api/cart/${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setCartItems(data.cartItems);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  
  fetchCart();
}, []);
```

### Place Order
```javascript
// In Checkout.js
const handlePlaceOrder = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const cartItems = await fetchCart(); // Get current cart items
  
  try {
    const response = await fetch('http://localhost:3003/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        total_amount: totalPrice,
        items: cartItems
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Record payment
      await recordPayment(data.orderId, paymentMethod);
      alert('Order placed successfully!');
      navigate('/orders');
    }
  } catch (error) {
    console.error('Error placing order:', error);
  }
};
```

### Get User Orders
```javascript
// In Orders.js
useEffect(() => {
  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      const response = await fetch(`http://localhost:3003/api/orders/user/${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  fetchOrders();
}, []);
```

---

## Key Points

1. **User Authentication**: Store user info in `localStorage` after login
2. **User ID**: Always send `user_id` with cart and order operations
3. **Error Handling**: Check `success` field in response
4. **CORS**: Backend is configured with CORS, no extra headers needed
5. **Base URL**: Change to `http://localhost:3003/api` in all requests

---

## Database Schema

- **users** - User accounts
- **product** - Products catalog
- **category** - Product categories
- **cart_items** - User shopping carts
- **orders** - Customer orders
- **order_transactions** - Order items details
- **payment** - Payment records

All tables are connected with proper foreign keys! ✅
