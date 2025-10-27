import React from 'react';

function Cart({ cartItems, total, onRemoveFromCart, onCheckout }) {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-item-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-title">{item.title}</span>
                  <span className="cart-item-price">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                </div>
                <button 
                  className="btn-remove"
                  onClick={() => onRemoveFromCart(item._id)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <div className="cart-total">
            <h3>Total:</h3>
            <h3>${total.toFixed(2)}</h3>
          </div>
          <button 
            className="btn btn-primary btn-checkout" 
            onClick={onCheckout}
            disabled={cartItems.length === 0}
          >
            Go to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;