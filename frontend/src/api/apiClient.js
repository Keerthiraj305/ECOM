// API Base URL
export const API_BASE_URL = 'http://localhost:3003/api';

// Helper function to get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ============ USER API CALLS ============

export const userAPI = {
  // Register user
  register: async (name, email, password, phone, address) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, address })
      });
      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Get user profile
  getProfile: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Update profile
  updateProfile: async (userId, name, phone, address) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, address })
      });
      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Connection error' };
    }
  }
};

// ============ PRODUCT API CALLS ============

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      return await response.json();
    } catch (error) {
      console.error('Get products error:', error);
      return { success: false, message: 'Connection error', products: [] };
    }
  },

  // Get single product
  getProduct: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      return await response.json();
    } catch (error) {
      console.error('Get product error:', error);
      return { success: false, message: 'Connection error' };
    }
  }
};

// ============ CART API CALLS ============

export const cartAPI = {
  // Get cart items
  getCart: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Get cart error:', error);
      return { success: false, message: 'Connection error', cartItems: [] };
    }
  },

  // Add to cart
  addToCart: async (userId, productId, quantity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, product_id: productId, quantity })
      });
      return await response.json();
    } catch (error) {
      console.error('Add to cart error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Update cart item
  updateCart: async (cartItemId, quantity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      return await response.json();
    } catch (error) {
      console.error('Update cart error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Delete from cart
  deleteFromCart: async (cartItemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Delete from cart error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear/${userId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Clear cart error:', error);
      return { success: false, message: 'Connection error' };
    }
  }
};

// ============ ORDER API CALLS ============

export const orderAPI = {
  // Create order
  createOrder: async (userId, totalAmount, items) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, total_amount: totalAmount, items })
      });
      return await response.json();
    } catch (error) {
      console.error('Create order error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Get user orders
  getUserOrders: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Get orders error:', error);
      return { success: false, message: 'Connection error', orders: [] };
    }
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      return await response.json();
    } catch (error) {
      console.error('Get order details error:', error);
      return { success: false, message: 'Connection error' };
    }
  }
};

// ============ PAYMENT API CALLS ============

export const paymentAPI = {
  // Create payment
  createPayment: async (orderId, amount, method, status = 'completed') => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, amount, method, status })
      });
      return await response.json();
    } catch (error) {
      console.error('Create payment error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Get payment by order
  getPayment: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${orderId}`);
      return await response.json();
    } catch (error) {
      console.error('Get payment error:', error);
      return { success: false, message: 'Connection error' };
    }
  }
};

// ============ CATEGORY API CALLS ============

export const categoryAPI = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      return await response.json();
    } catch (error) {
      console.error('Get categories error:', error);
      return { success: false, message: 'Connection error', categories: [] };
    }
  }
};
