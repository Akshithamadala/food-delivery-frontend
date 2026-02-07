import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <main className="container">
      <div className="card">
        <h2>👤 My Profile</h2>
        <p>Your order history will appear here</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/restaurants" className="btn btn-primary">🍽️ Order Food</Link>
          <Link to="/" className="btn btn-outline">🏠 Home</Link>
        </div>
      </div>
    </main>
  );
};

export default Profile;
