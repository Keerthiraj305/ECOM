// Simple in-browser mock backend to intercept fetch requests to the API
// Activates only when REACT_APP_USE_MOCKS=true

const API_BASE = 'http://localhost:3003/api';

const sampleProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { id: 2, name: 'Smart Watch', price: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: 3, name: 'Bluetooth Speaker', price: 1999, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' }
];

// In-memory storage for carts keyed by user id
const carts = {};

function jsonResponse(obj, status = 200) {
  return Promise.resolve(new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' }
  }));
}

async function handleRequest(input, init = {}) {
  const url = typeof input === 'string' ? input : input.url;
  const method = (init && init.method) || 'GET';
  // Only intercept API_BASE calls
  if (!url.startsWith(API_BASE)) return window._originalFetch(input, init);

  const path = url.replace(API_BASE, '');

  // Simulate network latency
  await new Promise(r => setTimeout(r, 120));

  // Routing
  if (path === '/products' && method === 'GET') {
    return jsonResponse({ success: true, products: sampleProducts });
  }

  if (path.startsWith('/products/') && method === 'GET') {
    const id = parseInt(path.split('/')[2], 10);
    const p = sampleProducts.find(x => x.id === id);
    return jsonResponse({ success: !!p, product: p || null });
  }

  if (path === '/cart/add' && method === 'POST') {
    try {
      const bodyText = init && init.body ? init.body : null;
      const body = bodyText ? JSON.parse(bodyText) : {};
      const userId = body.user_id || 1;
      if (!carts[userId]) carts[userId] = [];
      const newItem = {
        id: Date.now(),
        product_id: body.product_id,
        name: sampleProducts.find(p => p.id === body.product_id)?.name || 'Product',
        price: sampleProducts.find(p => p.id === body.product_id)?.price || 0,
        quantity: body.quantity || 1
      };
      carts[userId].push(newItem);
      return jsonResponse({ success: true, message: 'Product added to cart', cartItemId: newItem.id });
    } catch (err) {
      return jsonResponse({ success: false, message: 'Invalid request' }, 400);
    }
  }

  if (path.startsWith('/cart') && method === 'GET') {
    const parts = path.split('/').filter(Boolean);
    // expected /cart/:userId
    const userId = parts[1] ? parseInt(parts[1], 10) : 1;
    const items = carts[userId] || [];
    return jsonResponse({ success: true, cartItems: items });
  }

  if (path.startsWith('/cart/') && method === 'PUT') {
    // update quantity: path /cart/:cartItemId
    const parts = path.split('/').filter(Boolean);
    const cartItemId = parts[1] ? parseInt(parts[1], 10) : null;
    try {
      const body = init && init.body ? JSON.parse(init.body) : {};
      for (const userId of Object.keys(carts)) {
        const items = carts[userId];
        const idx = items.findIndex(it => it.id === cartItemId);
        if (idx !== -1) {
          items[idx].quantity = body.quantity || items[idx].quantity;
          return jsonResponse({ success: true });
        }
      }
      return jsonResponse({ success: false, message: 'Cart item not found' }, 404);
    } catch (err) {
      return jsonResponse({ success: false, message: 'Invalid request' }, 400);
    }
  }

  if (path.startsWith('/cart/') && method === 'DELETE') {
    // delete cart item: /cart/:cartItemId
    const parts = path.split('/').filter(Boolean);
    const cartItemId = parts[1] ? parseInt(parts[1], 10) : null;
    for (const userId of Object.keys(carts)) {
      const items = carts[userId];
      const idx = items.findIndex(it => it.id === cartItemId);
      if (idx !== -1) {
        items.splice(idx, 1);
        return jsonResponse({ success: true });
      }
    }
    return jsonResponse({ success: false, message: 'Cart item not found' }, 404);
  }

  if (path.startsWith('/users/login') && method === 'POST') {
    // return a fake user object
    return jsonResponse({ success: true, user: { id: 1, name: 'Demo User', email: 'demo@example.com' } });
  }

  if (path.startsWith('/users/register') && method === 'POST') {
    return jsonResponse({ success: true, message: 'User registered', user: { id: 2 } });
  }

  // Generic fallback
  return jsonResponse({ success: true, message: 'Mocked response' });
}

// Install the fetch interceptor only once
if (!window._originalFetch) {
  window._originalFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    try {
      return handleRequest(input, init);
    } catch (err) {
      return window._originalFetch(input, init);
    }
  };
  console.info('[mockBackend] mock fetch installed for', API_BASE);
}

// Ensure a demo user exists for demo flows so components that check localStorage work
try {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Demo User', email: 'demo@example.com' }));
    // initialize empty cart for demo user
    carts[1] = [];
  }
} catch (e) {
  // ignore when running in environments without localStorage
}

export default true;
