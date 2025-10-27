import React, { useState } from 'react';

function CheckoutModal({ total, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit({ name, email });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose}>&times;</button>
        <h2>Checkout</h2>
        <p>Please enter your details to complete the purchase.</p>
        <h3 className="modal-total">Total: ${total.toFixed(2)}</h3>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-submit-checkout">
            Submit Payment (Mock)
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;