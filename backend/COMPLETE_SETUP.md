# Complete Backend-Frontend Integration Setup Guide

## Step 1: Backend Setup

### 1.1 Start Backend Server
```bash
cd backend
npm start
```

Expected output:
```
E-commerce Backend running on port 3003...
```

### 1.2 Verify Backend is Running
Open browser and test:
```
http://localhost:3003/api/health
```

Should return:
```json
{
  "success": true,
  "status": "E-commerce backend is running!"
}
```

---

## Step 2: Frontend Setup

### 2.1 Start Frontend
```bash
cd frontend
npm start
```

Frontend runs on: `http://localhost:3000`

---

## Step 3: Database Setup

### 3.1 Verify Database Tables
The backend expects these tables in MySQL database `ecom`:

```sql
-- Check if all tables exist
SHOW TABLES;

-- Should show:
-- users
-- product
-- category
-- cart_items
-- orders
-- order_transactions
-- payment
```

### 3.2 Insert Sample Data (Optional)

```sql
-- Add a test user
INSERT INTO users (name, email, password, phone, address) 
VALUES ('Test User', 'test@test.com', 'password123', '1234567890', '123 Test St');

-- Add categories
INSERT INTO category (name, description) 
VALUES 
('Electronics', 'Electronic devices'),
('Clothing', 'Apparel and fashion'),
('Books', 'Books and magazines');

-- Add sample products
INSERT INTO product (name, description, price, category_id, stock) 
VALUES 
('Wireless Headphones', 'High quality headphones', 2999, 1, 50),
('Smart Watch', 'Latest smartwatch', 4999, 1, 45),
('Cotton T-Shirt', 'Comfortable shirt', 499, 2, 100);
```

---

## Step 4: Test Login Flow

### 4.1 Register New User

Open frontend and go to Register page:
```
http://localhost:3000/Register
```

Fill in:
- Name: John Doe
- Email: john@test.com
- Password: password123
- Phone: 1234567890

Click Register → User saved to database ✓

### 4.2 Login

Go to Login page:
```
http://localhost:3000
```

Fill in:
- Email: john@test.com
- Password: password123

Click Login → User data stored in localStorage ✓

### 4.3 Verify in Browser Console

Open DevTools (F12) → Console:
```javascript
// View stored user
console.log(JSON.parse(localStorage.getItem('user')));
```

Should show:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@test.com",
  "phone": "1234567890",
  "address": "..."
}
```

---

## Step 5: Test Cart Functionality

### 5.1 Add Product to Cart

1. Login and go to Homepage
2. Click "Add to Cart" on any product
3. Check browser console for success message

### 5.2 View Cart

Click Cart icon (🛒) in header → See cart items from database ✓

### 5.3 Verify in Database

```sql
-- Check cart items
SELECT c.*, p.name FROM cart_items c JOIN product p ON c.product_id = p.id WHERE c.user_id = 1;
```

---

## Step 6: Test Checkout & Orders

### 6.1 Proceed to Checkout

1. Click "Proceed to Checkout"
2. Fill delivery address
3. Select payment method
4. Click "Place Order"

### 6.2 Verify Order in Database

```sql
-- Check orders
SELECT * FROM orders WHERE user_id = 1;

-- Check order items
SELECT * FROM order_transactions WHERE order_id = 1;

-- Check payments
SELECT * FROM payment WHERE order_id = 1;
```

---

## Step 7: Test Orders Page

### 7.1 View Orders

Click "ORDERS" in navigation → See all your orders from database ✓

---

## API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/products` | Get all products |
| GET | `/api/cart/:userId` | Get cart items |
| POST | `/api/cart/add` | Add to cart |
| DELETE | `/api/cart/:id` | Remove from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/user/:userId` | Get user orders |
| POST | `/api/payments` | Record payment |

---

## Troubleshooting

### Issue: "Connection error" in frontend

**Solution:**
1. Check backend is running: `npm start` in backend folder
2. Check backend is on port 3003
3. Check no firewall blocking port 3003
4. Check URL is `http://localhost:3003/api`

### Issue: "User not found" during login

**Solution:**
1. Register first at `/Register`
2. Check user exists in database:
   ```sql
   SELECT * FROM users WHERE email = 'your-email@test.com';
   ```

### Issue: Cart shows empty

**Solution:**
1. Make sure you're logged in
2. Check localStorage has user data:
   ```javascript
   console.log(localStorage.getItem('user'));
   ```
3. Verify cart items in database:
   ```sql
   SELECT * FROM cart_items WHERE user_id = 1;
   ```

### Issue: Order not showing

**Solution:**
1. Check order was created:
   ```sql
   SELECT * FROM orders;
   ```
2. Check user_id matches logged-in user:
   ```sql
   SELECT * FROM orders WHERE user_id = <your-user-id>;
   ```

---

## Data Flow Diagram

```
Frontend (React)
     ↓
     ├→ Login/Register → Backend API → MySQL users table
     ├→ View Products → Backend API → MySQL product table
     ├→ Add to Cart → Backend API → MySQL cart_items table
     ├→ View Cart → Backend API → MySQL cart_items table
     ├→ Checkout → Backend API → MySQL orders + order_transactions
     ├→ Payment → Backend API → MySQL payment table
     └→ View Orders → Backend API → MySQL orders table
```

---

## Key Implementation Notes

1. **User Authentication**
   - User data stored in `localStorage` after login
   - Used for all subsequent requests
   - Clear localStorage on logout

2. **Cart Management**
   - Cart persisted in database per user
   - Cart items linked to user via `user_id`
   - Cart cleared after successful order placement

3. **Order Processing**
   - Orders created with all line items
   - order_transactions table stores item details
   - Payments recorded separately

4. **Database Relationships**
   - users (id) → cart_items (user_id)
   - users (id) → orders (user_id)
   - product (id) → cart_items (product_id)
   - orders (id) → order_transactions (order_id)
   - orders (id) → payment (order_id)

---

## Next Steps

1. ✅ Backend running on port 3003
2. ✅ Frontend running on port 3000
3. ✅ Database connected
4. ✅ User login/register working
5. ✅ Cart functionality working
6. ✅ Checkout & orders working
7. ✅ View orders working

**Your e-commerce app is now fully functional!** 🎉

---

## Commands Reference

```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start

# Backend health check
curl http://localhost:3003/api/health

# Check MySQL connection
mysql -u root -p ecom -e "SHOW TABLES;"

# View users
mysql -u root -p ecom -e "SELECT * FROM users;"

# View cart
mysql -u root -p ecom -e "SELECT * FROM cart_items;"

# View orders
mysql -u root -p ecom -e "SELECT * FROM orders;"
```

---

All set! Your backend and frontend are fully integrated! 🚀
