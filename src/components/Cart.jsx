import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <main className="container">
      <div className="card">
        <h2>🛒 Shopping Cart</h2>
        <p>Your cart is empty. Add delicious items!</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/restaurants" className="btn btn-primary">🍽️ Restaurants</Link>
          <Link to="/" className="btn btn-outline">🏠 Home</Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
