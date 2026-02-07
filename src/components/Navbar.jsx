import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, cartCount, setUser, location }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🍕 QuickBite</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/restaurants">🍽️ Restaurants</Link>
        {user && <Link to="/profile">👤 Profile</Link>}
        <Link to="/cart" className="cart-link">
          🛒 Cart({cartCount || 0})
        </Link>
        {user ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      
      {location && (
        <div className="location-info">
          📍 {location.lat?.toFixed(2)}, {location.lng?.toFixed(2)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
