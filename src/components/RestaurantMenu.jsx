import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const RestaurantMenu = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  
  // State for API data
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. FETCH MENU DATA FROM API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9090/api/restaurants/${id}/menu`);
        if (!response.ok) throw new Error('Failed to load menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const currentCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 2. EXTRACT RESTAURANT INFO
  // We get the name from the first item's 'restaurant' object
  const restaurantName = menuItems.length > 0 ? menuItems[0].restaurant.name : "Restaurant Menu";

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>👨‍🍳 Loading Menu...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '5rem', color: '#e23744' }}>⚠️ {error}</div>;

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <Link to="/restaurants" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>← Back to Restaurants</Link>
          <h1 style={{ color: '#e23744', margin: '10px 0 0 0', fontSize: '2.2rem' }}>{restaurantName}</h1>
        </div>
        <Link to="/cart" style={{ 
          padding: '12px 24px', background: '#e23744', color: 'white', 
          textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(226, 55, 68, 0.3)'
        }}>
          🛒 View Cart ({currentCartCount})
        </Link>
      </div>

      {/* MENU GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {menuItems.map(item => (
          <div key={item.id} style={{ 
            border: '1px solid #f0f0f0', borderRadius: '20px', padding: '1.2rem', 
            transition: '0.3s', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={`${process.env.PUBLIC_URL}/menu_items_placeholder.jpg`} 
                alt={item.name} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px' }} 
              />
              {/* Using the restaurant's veg property for the item badge as a fallback */}
              {item.restaurant.veg && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '2px', borderRadius: '4px', border: '1px solid #28a745' }}>
                  <div style={{ width: '10px', height: '10px', background: '#28a745', borderRadius: '50%' }}></div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1rem', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>{item.name}</h3>
              <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>
                {item.description}
              </p>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#333', margin: '15px 0' }}>
                ₹{item.price}
              </div>
            </div>

            <button 
              onClick={() => addToCart(item)} 
              style={{
                width: '100%', padding: '14px', background: '#28a745', color: 'white',
                border: 'none', borderRadius: '15px', fontWeight: '700', cursor: 'pointer',
                transition: '0.2s', fontSize: '1rem'
              }}
              onMouseOver={(e) => e.target.style.background = '#218838'}
              onMouseOut={(e) => e.target.style.background = '#28a745'}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;