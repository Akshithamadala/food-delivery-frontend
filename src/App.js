import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import LocationMap from './components/LocatioMap';
import { CartProvider, CartPage,useCart } from './context/CartContext'; // Adjust path
import Home  from './components/Home';
import RestaurantMenu from './components/RestaurantMenu';
import RestaurantsPage from './components/Restaurants';
import Checkout from './components/Checkout';
import OrderTracking from './components/OrderTracking';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import MyOrders from './components/MyOrders';


function App() {
  const [cartCount, setCartCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [userLocation, setUserLocation] = useState();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
  });

  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: '1vh', background: '#f8f9fa', fontFamily: 'Inter, -apple-system, sans-serif' }}>
          
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path='/home' element={<Home/>}/>
              <Route path="/map" element={<LocationMap userLocation={userLocation} setUserLocation={setUserLocation} isLoaded={isLoaded} />} />
              <Route path='/cart' element={<CartPage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path="/restaurants" element={
                <RestaurantsPage activeFilter={activeFilter} setActiveFilter={setActiveFilter} userLocation={userLocation} />
              } />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path='/checkout' element={<Checkout  userLocation={userLocation}/>}/>
              <Route path='/track-order' element={<OrderTracking/>}/>
              <Route path="/track-order/:orderId" element={<OrderTracking />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </main>

          <footer style={{ background: '#111', color: 'white', padding: '3rem 1rem', marginTop: '5rem', textAlign: 'center' }}>
            <p style={{ opacity: 0.7 }}>© 2026 QuickBite • Made with ❤️ in Bengaluru</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
