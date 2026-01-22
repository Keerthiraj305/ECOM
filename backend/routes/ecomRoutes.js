const express = require('express');
const router = express.Router();
const db = require('../db');

// ============ USER ROUTES ============

// Register User
router.post('/users/register', async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  try {
    // Check if user already exists
    const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists.' });
    }

    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone || null, address || null]
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      userId: result.insertId,
      user: { id: result.insertId, name, email, phone, address }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login User
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const [user] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
    if (user.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Remove password from response
    const userData = { ...user[0] };
    delete userData.password;

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: userData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get User Profile
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.execute('SELECT id, name, email, phone, address FROM users WHERE id = ?', [id]);

    if (user.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, user: user[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update User Profile
router.put('/users/:id', async (req, res) => {
  const { name, phone, address } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      'UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?',
      [name, phone || null, address || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ PRODUCT ROUTES ============

// Get All Products
router.get('/products', async (req, res) => {
  try {
    const [products] = await db.execute(
      'SELECT id, pname as name, description, price, image FROM product'
    );
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get Product by ID
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await db.execute(
      'SELECT id, pname as name, description, price, image FROM product WHERE id = ?',
      [id]
    );

    if (product.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.status(200).json({ success: true, product: product[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ CART ROUTES ============

// Get Cart Items for User
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [cartItems] = await db.execute(
      'SELECT c.id, c.user_id, c.product_id, c.quantity, p.pname as name, p.price FROM cart_items c JOIN product p ON c.product_id = p.id WHERE c.user_id = ?',
      [userId]
    );

    res.status(200).json({ success: true, cartItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add Item to Cart
router.post('/cart/add', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ success: false, message: 'User ID, product ID, and quantity are required.' });
  }

  try {
    // Check if item already in cart
    const [existing] = await db.execute(
      'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (existing.length > 0) {
      // Update quantity if already exists
      await db.execute(
        'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, user_id, product_id]
      );
      res.status(200).json({ success: true, message: 'Cart updated successfully.' });
    } else {
      const [result] = await db.execute(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [user_id, product_id, quantity]
      );
      res.status(201).json({
        success: true,
        message: 'Item added to cart successfully.',
        cartId: result.insertId
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Cart Item Quantity
router.put('/cart/:id', async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ success: false, message: 'Valid quantity is required.' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE cart_items SET quantity = ? WHERE id = ?',
      [quantity, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }

    res.status(200).json({ success: true, message: 'Cart item updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Cart Item
router.delete('/cart/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM cart_items WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }

    res.status(200).json({ success: true, message: 'Item removed from cart.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Clear Cart
router.delete('/cart/clear/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    await db.execute('DELETE FROM cart_items WHERE user_id = ?', [userId]);
    res.status(200).json({ success: true, message: 'Cart cleared successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ ORDER ROUTES ============

// Create Order
router.post('/orders', async (req, res) => {
  const { user_id, total_amount, items } = req.body;

  if (!user_id || !total_amount) {
    return res.status(400).json({ success: false, message: 'User ID and total amount are required.' });
  }

  try {
    // Insert main order
    const [orderResult] = await db.execute(
      'INSERT INTO orders (user_id, total_amount, status, created_at) VALUES (?, ?, ?, NOW())',
      [user_id, total_amount, 'pending']
    );

    const orderId = orderResult.insertId;

    // Insert order items
    if (items && items.length > 0) {
      for (const item of items) {
        await db.execute(
          'INSERT INTO order_transactions (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
        );
      }
    }

    // Clear cart after order
    await db.execute('DELETE FROM cart_items WHERE user_id = ?', [user_id]);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      orderId: orderId
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get User Orders
router.get('/orders/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get Order Details
router.get('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const [order] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);

    if (order.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const [items] = await db.execute(
      'SELECT ot.*, p.name FROM order_transactions ot JOIN product p ON ot.product_id = p.id WHERE ot.order_id = ?',
      [orderId]
    );

    res.status(200).json({ success: true, order: order[0], items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ PAYMENT ROUTES ============

// Create Payment
router.post('/payments', async (req, res) => {
  const { order_id, amount, method, status } = req.body;

  if (!order_id || !amount || !method) {
    return res.status(400).json({ success: false, message: 'Order ID, amount, and payment method are required.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO payment (order_id, amount, method, status, created_at) VALUES (?, ?, ?, ?, NOW())',
      [order_id, amount, method, status || 'completed']
    );

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully.',
      paymentId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get Payment by Order ID
router.get('/payments/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const [payment] = await db.execute('SELECT * FROM payment WHERE order_id = ?', [orderId]);

    if (payment.length === 0) {
      return res.status(404).json({ success: false, message: 'Payment not found.' });
    }

    res.status(200).json({ success: true, payment: payment[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ CATEGORY ROUTES ============

// Get All Categories
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT * FROM category');
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
