


import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate, Link } from 'react-router-dom';

const LocationMap = ({ userLocation, setUserLocation }) => {
  const navigate = useNavigate();
  
  const cityCoordinates = {
    "Bengaluru": { lat: 12.9716, lng: 77.5946 },
    "Mumbai": { lat: 19.0760, lng: 72.8777 },
    "Delhi": { lat: 28.6139, lng: 77.2090 }
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API 
  });

  const onMapClick = (e) => {
    setUserLocation({ 
      ...userLocation,
      lat: e.latLng.lat(), 
      lng: e.latLng.lng()
    });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const coords = cityCoordinates[selectedCity];
    setUserLocation({
      city: selectedCity,
      lat: coords.lat,
      lng: coords.lng
    });
  };

  if (loadError) return <div style={styles.centerText}>⚠️ Map Error</div>;
  if (!isLoaded) return <div style={styles.centerText}>🔄 Loading Map...</div>;

  return (
    <div style={{ padding: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
      
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

      <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ color: '#e23744', margin: '0 0 1rem 0', fontSize: '1.8rem' }}>📍 Set Delivery Location</h1>
        
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '600' }}>Select Your City:</span>
          <select 
            value={userLocation?.city || "Bengaluru"}
            onChange={handleCityChange}
            style={styles.select}
          >
            {Object.keys(cityCoordinates).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee' }}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={{ lat: userLocation?.lat || 12.9716, lng: userLocation?.lng || 77.5946 }}
            zoom={12}
            onClick={onMapClick}
            options={{ streetViewControl: false, mapTypeControl: false }}
          >
            {(userLocation?.lat && userLocation?.lng) && (
              <Marker position={{ lat: userLocation.lat, lng: userLocation.lng }} />
            )}
          </GoogleMap>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => navigate('/restaurants')}
            style={styles.confirmBtn}
          >
            Confirm & View Restaurants in {userLocation?.city || "Bengaluru"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    padding: '0 5px'
  },
  navLinks: {
    display: 'flex',
    gap: '20px'
  },
  backBtn: {
    padding: '8px 18px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    transition: '0.2s'
  },
  iconLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '600',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  select: {
    padding: '10px 15px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    outline: 'none',
    background: '#f9f9f9'
  },
  confirmBtn: { 
    padding: '16px 40px', 
    background: '#28a745', 
    color: 'white', 
    border: 'none', 
    borderRadius: '35px', 
    fontWeight: '700', 
    cursor: 'pointer',
    fontSize: '1rem', 
    boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
    width: '100%',
    maxWidth: '500px'
  },
  centerText: { 
    textAlign: 'center', 
    padding: '5rem', 
    fontFamily: 'sans-serif' 
  }
};

export default LocationMap;