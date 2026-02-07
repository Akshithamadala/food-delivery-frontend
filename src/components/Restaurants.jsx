import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Added default value for userLocation if it's not passed via props
const RestaurantsPage = ({ activeFilter, setActiveFilter, userLocation = { city: 'Bengaluru' } }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Use the prop city or default to Bengaluru
  const currentCity = userLocation?.city || 'Bengaluru';

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/restaurants');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  
  const filteredRestaurants = restaurants.filter(r => {
    // 1. Precise matching for City
    const matchesLocation = r.location?.toLowerCase() === currentCity.toLowerCase();
    
    // 2. Updated Veg/Non-Veg logic (Checking multiple common JSON keys)
    // We check both 'is_veg' and 'veg' to be safe
    const isVegRestaurant = r.is_veg === true || r.veg === true;

    const matchesVeg = activeFilter === 'all' || 
                      (activeFilter === 'veg' && isVegRestaurant) || 
                      (activeFilter === 'nonveg' && !isVegRestaurant);
    
    return matchesLocation && matchesVeg;
  });
  const restaurantImages = [
  // Indian & Asian restaurants
  'https://www.freepik.com/free-vector/modern-restaurant-with-flat-design_2488506.htm#from_element=cross_selling__vector'
];


// Replace the img tag in your restaurant card:



  if (loading) return <div style={styles.centerPad}>🔄 Loading Best Eateries in {currentCity}...</div>;
  if (error) return <div style={{...styles.centerPad, color: '#e23744'}}>⚠️ Error: {error}</div>;

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* TOP NAVIGATION BAR */}
      <div style={styles.navBar}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ⬅ Back
        </button>
        <div style={styles.navLinks}>
          <Link to="/my-orders" style={styles.iconLink}>📦 Orders</Link>
          <Link to="/cart" style={styles.iconLink}>🛒 Cart</Link>
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterCard}>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>Showing restaurants in </span>
          <strong style={{ color: '#e23744', fontSize: '1.1rem' }}>{currentCity}</strong>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {[
            { id: 'all', label: 'All', color: '#666' },
            { id: 'veg', label: '🥬 Pure Veg', color: '#28a745' },
            { id: 'nonveg', label: '🍗 Non Veg', color: '#dc3545' }
          ].map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{
              ...styles.filterBtn,
              background: activeFilter === f.id ? f.color : '#f0f0f0',
              color: activeFilter === f.id ? 'white' : '#555',
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESTAURANT GRID */}
      {filteredRestaurants.length > 0 ? (
        <div style={styles.grid}>
          {filteredRestaurants.map(res => (
            <Link key={res.id} to={`/restaurant/${res.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={styles.card}>
                <div style={styles.imgContainer}>
                 <img 
  src={`${process.env.PUBLIC_URL}/Restaurant.jpg`} 
  alt={res.name} 
  style={styles.image} 
/>

                  {/* <img 
  src={restaurantImages[Math.floor(Math.random() * restaurantImages.length)]} 
  alt={res.name} 
  style={styles.image}  */}
{/* /> */}
                  <div style={styles.cuisineTag}>{res.cuisine}</div>
                </div>

                <div style={{ padding: '1.2rem' }}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.resName}>{res.name}</h3>
                    <span style={styles.ratingBadge}>★ {res.rating ? res.rating.toFixed(1) : 'New'}</span>
                  </div>
                  <p style={styles.locationText}>📍 {res.location}</p>
                  <div style={styles.cardFooter}>
                    <span style={{
                      ...styles.vegTag,
                      background: res.is_veg ? '#e6f4ea' : '#fce8e6',
                      color: res.is_veg ? '#1e7e34' : '#d93025',
                      borderColor: res.is_veg ? '#1e7e34' : '#d93025'
                    }}>
                      {res.is_veg ? 'PURE VEG' : 'NON-VEG'}
                    </span>
                    <span style={{...styles.statusText, color: res.is_open ? '#28a745' : '#999'}}>
                      {res.open ? '● Open' : '○ Closed'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={{ fontSize: '3rem' }}>🏙️</div>
          <h3>No Restaurants found in {currentCity}</h3>
          <p>We are expanding fast! Check back soon or try another city.</p>
          <button onClick={() => navigate('/map')} style={styles.changeCityBtn}>Change City</button>
        </div>
      )}
    </div>
  );
};

// Internal Styles
const styles = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  navLinks: {
    display: 'flex',
    gap: '15px'
  },
  backBtn: {
    padding: '8px 15px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    fontWeight: '600'
  },
  iconLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '600',
    fontSize: '0.9rem'
  },
  centerPad: { textAlign: 'center', padding: '5rem' },
  filterCard: { background: 'white', padding: '1.2rem', borderRadius: '18px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', marginBottom: '2rem' },
  filterBtn: { padding: '10px 20px', borderRadius: '25px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: '0.2s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  card: { background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.06)' },
  imgContainer: { height: '160px', position: 'relative', background: '#eee' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  cuisineTag: { position: 'absolute', bottom: '10px', left: '10px', background: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  resName: { margin: 0, fontSize: '1.1rem', fontWeight: '700' },
  ratingBadge: { background: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' },
  locationText: { margin: '0 0 12px 0', fontSize: '0.85rem', color: '#777' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  vegTag: { fontSize: '0.65rem', fontWeight: '800', padding: '3px 7px', borderRadius: '5px', border: '1px solid' },
  statusText: { fontSize: '0.8rem', fontWeight: '600' },
  emptyState: { textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '25px' },
  changeCityBtn: { marginTop: '15px', padding: '10px 25px', background: '#e23744', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }
};

export default RestaurantsPage;