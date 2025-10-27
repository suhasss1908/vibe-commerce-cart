import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import './App.css';

// Set the base URL for all API requests
const API_URL = 'http://localhost:5001/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // --- API Functions ---

  // 1. Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Fetch the cart contents on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`);
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart.');
    }
  };

  // 3. Add an item to the cart
  const addToCart = async (product) => {
    try {
      const itemToAdd = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1, // Default quantity to 1
      };
      await axios.post(`${API_URL}/cart`, itemToAdd);
      // Refresh cart from server to get updated state
      fetchCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart.');
    }
  };

  // 4. Remove an item from the cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/cart/${itemId}`);
      // Refresh cart from server
      fetchCart();
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart.');
    }
  };

  // 5. Handle checkout
  const handleCheckout = async (customerDetails) => {
    try {
      const res = await axios.post(`${API_URL}/checkout`, {
        customer: customerDetails,
      });
      setReceipt(res.data); // Set the receipt data
      setCart({ items: [], total: 0 }); // Clear cart in UI
      setShowCheckout(false); // Close the checkout form
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('Checkout failed. Is your cart empty?');
    }
  };

  // --- Render ---

  return (
    <div className="App">
      <header className="app-header">
        <h1> Vibe Commerce</h1>
        <button className="cart-toggle-btn" onClick={() => document.getElementById('cart-sidebar').classList.toggle('open')}>
          Cart ({cart.items.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="container">
        <div className="product-container">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <ProductList products={products} onAddToCart={addToCart} />
          )}
        </div>

        <div id="cart-sidebar" className="cart-container">
          <Cart 
            cartItems={cart.items} 
            total={cart.total} 
            onRemoveFromCart={removeFromCart} 
            onCheckout={() => setShowCheckout(true)}
          />
        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal 
          total={cart.total}
          onClose={() => setShowCheckout(false)} 
          onSubmit={handleCheckout} 
        />
      )}

      {/* Receipt Modal */}
      {receipt && (
        <div className="modal-overlay">
          <div className="modal-content receipt-modal">
            <h2> Checkout Successful!</h2>
            <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
            <p><strong>Date:</strong> {new Date(receipt.checkoutTimestamp).toLocaleString()}</p>
            <hr />
            <h4>Items:</h4>
            <ul>
              {receipt.items.map((item, index) => (
                <li key={index}>
                  {item.name} (x{item.qty}) - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <hr />
            <h3 className="receipt-total">Total Paid: ${receipt.total.toFixed(2)}</h3>
            <button className="btn" onClick={() => setReceipt(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;