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
// function App() {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState({});
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });

//   return (
//     <Router>
//       <div style={{
//         minHeight: '100vh', 
//         background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//         fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
//       }}>
//         {/* LOCATION BAR WITH FIXED MINI MAP */}
//         <div style={{ 
//           background: '#e23744', color: 'white', padding: '1rem 2rem', 
//           position: 'sticky', top: 0, zIndex: 1000 
//         }}>
//           <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
//               <div style={{ fontSize: '1rem', fontWeight: '500' }}>
//                 📍 Bengaluru Central • 1.2km
//               </div>
//               <Link to="/map" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
//                 Change Location →
//               </Link>
//             </div>
//             <LoadScript googleMapsApiKey="xxxxxxx">
//               <GoogleMap
//                 mapContainerStyle={{ height: '120px', width: '350px', borderRadius: '12px' }}
//                 center={userLocation}
//                 zoom={14}
//                 options={{ 
//                   streetViewControl: false, 
//                   mapTypeControl: false,
//                   fullscreenControl: false,
//                   zoomControl: false,
//                   draggable: false,
//                   scrollwheel: false,
//                   disableDefaultUI: true
//                 }}
//               >
//                 <Marker position={userLocation} />
//               </GoogleMap>
//             </LoadScript>
//           </div>
//         </div>

//         {/* NAVBAR */}
//         <header style={{
//           background: 'white', padding: '1rem 2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//           position: 'sticky', top: '8rem', zIndex: 999
//         }}>
//           <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#e23744', textDecoration: 'none' }}>
//               🍕 QuickBite
//             </Link>
//             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//               <Link to="/restaurants" style={{ color: '#666', textDecoration: 'none', fontWeight: '500' }}>Restaurants</Link>
//               <Link to="/cart" style={{
//                 background: '#e23744', color: 'white', padding: '10px 20px', 
//                 borderRadius: '25px', textDecoration: 'none', fontWeight: '600'
//               }}>
//                 🛒 ({cartCount})
//               </Link>
//             </div>
//           </div>
//         </header>

//         <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/map" element={<LocationMap userLocation={userLocation} setUserLocation={setUserLocation} />} />
            // <Route path="/restaurants" element={
            //   <RestaurantsPage cartItems={cartItems} setCartItems={setCartItems} setCartCount={setCartCount} 
            //     activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            // } />
            // <Route path="/restaurant/:id" element={
            //   <RestaurantMenu cartItems={cartItems} setCartItems={setCartItems} setCartCount={setCartCount} cartCount={cartCount} />
            // } />
//             <Route path="/cart" element={<CartPage cartCount={cartCount} cartItems={cartItems} />} />
//             <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
//             <Route path="/track-order" element={<TrackOrder />} />
//             <Route path="/order-success" element={<OrderSuccess />} />
//           </Routes>
//         </main>

//         <footer style={{
//           background: '#1a1a1a', color: 'white', textAlign: 'center', padding: '2rem',
//           marginTop: '4rem'
//         }}>
//           <p>© 2026 QuickBite • Fastest Food Delivery in Bengaluru</p>
//         </footer>
//       </div>
//     </Router>
//   );
// }


const Navbar = ({ cartCountProp }) => {
  const { cartItems } = useCart();
  // We use context count if items exist, otherwise fallback to the prop
  const displayCount = cartItems.length > 0 
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0) 
    : cartCountProp;

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Link to="/restaurants" style={{ color: '#444', textDecoration: 'none', fontWeight: '600' }}>
        Restaurants
      </Link>
      <Link to="/cart" style={{
        background: '#e23744', color: 'white', padding: '8px 20px', 
        borderRadius: '12px', textDecoration: 'none', fontWeight: '700',
        boxShadow: '0 4px 10px rgba(226, 55, 68, 0.3)'
      }}>
        🛒 {displayCount}
      </Link>
    </div>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [userLocation, setUserLocation] = useState();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBAjOrf2nE6gtatLwXPghKCTOPzmnYBPgg"
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

// function App() {
//   const [cartCount, setCartCount] = useState(0);
//   // const [cartItems, setCartItems] = useState({});
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 });

//   // LOAD GOOGLE MAPS SCRIPT ONCE AT THE ROOT
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyBAjOrf2nE6gtatLwXPghKCTOPzmnYBPgg"
//   });
  

//   return (
//   <CartProvider>
    

//     <Router>
//       <div style={{
//         minHeight: '100vh', 
//         background: '#f8f9fa',
//         fontFamily: 'Inter, -apple-system, sans-serif'
//       }}>
        
//         {/* COMPACT LOCATION & NAVIGATION HEADER */}
//         <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
//           <div style={{ background: '#e23744', color: 'white', padding: '8px 20px' }}>
//             <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
//                   <span>📍 Delivering to: <strong>Bengaluru Central</strong></span>
//                   <Link to="/map" style={{ color: 'white', textDecoration: 'underline', fontSize: '0.8rem', opacity: 0.9 }}>Change</Link>
//                </div>
//                <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>⚡ 25-30 mins</div>
//             </div>
//           </div>

//           <nav style={{ padding: '1rem 2rem' }}>
//             <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Link to="/" style={{ fontSize: '1.6rem', fontWeight: '800', color: '#e23744', textDecoration: 'none', letterSpacing: '-1px' }}>
//                 🍕 QuickBite
//               </Link>
              
//               <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                
                
//                 <Link to="/restaurants" style={{ color: '#444', textDecoration: 'none', fontWeight: '600', transition: '0.2s' }}>Restaurants</Link>
//                 <Link to="/cart" style={{
//                   background: '#e23744', color: 'white', padding: '8px 20px', 
//                   borderRadius: '12px', textDecoration: 'none', fontWeight: '700',
//                   boxShadow: '0 4px 10px rgba(226, 55, 68, 0.3)'
//                 }}>
//                   🛒 {cartCount}
//                 </Link>
//               </div>
//             </div>
//           </nav>
//         </header>

//         <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/map" element={<LocationMap userLocation={userLocation} setUserLocation={setUserLocation} isLoaded={isLoaded} />} />
//             {/* ... other routes ... */}
//             <Route path='/cart' element={<CartPage/>}/>
//             <Route path="/restaurants" element={
//               <RestaurantsPage activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
//             } />
//             <Route path="/restaurant/:id" element={<RestaurantMenu />} />
//           </Routes>
//         </main>

//         <footer style={{ background: '#111', color: 'white', padding: '3rem 1rem', marginTop: '5rem', textAlign: 'center' }}>
//           <p style={{ opacity: 0.7 }}>© 2026 QuickBite • Made with ❤️ in Bengaluru</p>
//         </footer>
//       </div>
//     </Router>
//   </CartProvider>
//   );
// }



// // RESTAURANTS
// const RestaurantsPage = ({ cartItems, setCartItems, setCartCount, activeFilter, setActiveFilter }) => {
//   const restaurants = [
//     { id: 1, name: "🍕 Domino's Pizza", veg: false, rating: 4.5, time: 25, fee: "FREE", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", tag: "Pizza", distance: "1.2km" },
//     { id: 2, name: "🍕 Pizza Hut", veg: false, rating: 4.4, time: 28, fee: "₹20", img: "https://images.unsplash.com/photo-1569319833968-7e91549e8fe6?w=400", tag: "Pizza", distance: "2.1km" },
//     { id: 3, name: "🍛 Biryani Blues", veg: false, rating: 4.7, time: 30, fee: "FREE", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", tag: "Biryani", distance: "1.8km" },
//     { id: 4, name: "🥗 FreshMenu", veg: true, rating: 4.6, time: 25, fee: "FREE", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", tag: "Healthy", distance: "0.9km" },
//     { id: 5, name: "🍔 McDonald's", veg: false, rating: 4.2, time: 18, fee: "FREE", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400", tag: "Fast Food", distance: "1.5km" },
//     { id: 6, name: "🥘 A2B", veg: true, rating: 4.5, time: 25, fee: "FREE", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", tag: "South Indian", distance: "2.3km" },
//     { id: 7, name: "🍗 KFC", veg: false, rating: 4.1, time: 22, fee: "FREE", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", tag: "Chicken", distance: "1.1km" },
//     { id: 8, name: "🍛 Haldiram's", veg: true, rating: 4.4, time: 28, fee: "₹15", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400", tag: "Pure Veg", distance: "3.2km" }
//   ];

//   const filteredRestaurants = restaurants.filter(r => 
//     activeFilter === 'all' || (activeFilter === 'veg' && r.veg) || (activeFilter === 'nonveg' && !r.veg)
//   );

//   return (
//     <div>
//       <div style={{ background: 'white', padding: '1rem', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
//         <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
//           {[
//             { id: 'all', label: 'All', color: '#e23744' },
//             { id: 'veg', label: '🥬 Veg', color: '#28a745' },
//             { id: 'nonveg', label: '🍗 Non Veg', color: '#dc3545' }
//           ].map(filter => (
//             <button key={filter.id} onClick={() => setActiveFilter(filter.id)} style={{
//               padding: '8px 16px', borderRadius: '20px', border: `2px solid ${activeFilter === filter.id ? filter.color : '#eee'}`,
//               background: activeFilter === filter.id ? filter.color : 'white', 
//               color: activeFilter === filter.id ? 'white' : '#333',
//               fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer'
//             }}>
//               {filter.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
//         {filteredRestaurants.map(restaurant => (
//           <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} style={{ textDecoration: 'none' }}>
//             <div style={{
//               background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
//               <div style={{ position: 'relative', height: '140px' }}>
//                 <img src={restaurant.img} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                 <div style={{
//                   position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: 'white',
//                   padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem'
//                 }}>
//                   {restaurant.tag}
//                 </div>
//               </div>
//               <div style={{ padding: '1rem' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
//                   <h3 style={{ margin: 0, fontSize: '1rem', color: '#1a1a1a' }}>{restaurant.name}</h3>
//                   <div style={{ color: '#28a745', fontWeight: 'bold', fontSize: '0.9rem' }}>★{restaurant.rating}</div>
//                 </div>
//                 <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
//                   {restaurant.time} min • {restaurant.fee} • {restaurant.distance}
//                 </div>
//                 <div style={{
//                   padding: '4px 12px', background: restaurant.veg ? '#d4edda' : '#f8d7da', borderRadius: '12px',
//                   fontSize: '0.7rem', fontWeight: '600', color: restaurant.veg ? '#28a745' : '#dc3545'
//                 }}>
//                   {restaurant.veg ? 'PURE VEG' : 'NON-VEG'}
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// // RESTAURANT MENU
// const RestaurantMenu = ({ cartItems, setCartItems, setCartCount, cartCount }) => {
//   const { id } = useParams();
//   const menuData = {
//     1: { name: "🍕 Domino's Pizza", items: [
//       { id: 'p1', name: "Margherita Pizza", price: 299, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300", veg: true },
//       { id: 'p2', name: "Pepperoni Pizza", price: 349, img: "https://images.unsplash.com/photo-1569319833968-7e91549e8fe6?w=300", veg: false },
//       { id: 'p3', name: "Veggie Supreme", price: 399, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300", veg: true }
//     ]},
//     2: { name: "🍕 Pizza Hut", items: [
//       { id: 'ph1', name: "Paneer Tikka Pizza", price: 429, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", veg: true },
//       { id: 'ph2', name: "Chicken Supreme", price: 499, img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300", veg: false }
//     ]}
//   };

//   const restaurant = menuData[id] || menuData[1];

//   const addToCart = (item) => {
//     const newCart = { ...cartItems };
//     if (newCart[item.id]) {
//       newCart[item.id].quantity += 1;
//     } else {
//       newCart[item.id] = { ...item, quantity: 1 };
//     }
//     setCartItems(newCart);
//     setCartCount(Object.values(newCart).reduce((total, item) => total + item.quantity, 0));
//   };

//   return (
//     <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//         <h1 style={{ color: '#e23744', margin: 0 }}>{restaurant.name}</h1>
//         <Link to="/cart" style={{ padding: '10px 20px', background: '#e23744', color: 'white', textDecoration: 'none', borderRadius: '25px' }}>
//           🛒 View Cart ({cartCount})
//         </Link>
//       </div>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
//         {restaurant.items.map(item => (
//           <div key={item.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
//             <img src={item.img} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
//             <h3 style={{ margin: '1rem 0 0.5rem 0' }}>{item.name}</h3>
//             <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e23744', marginBottom: '1rem' }}>
//               ₹{item.price}
//             </div>
//             <button onClick={() => addToCart(item)} style={{
//               width: '100%', padding: '12px', background: '#28a745', color: 'white',
//               border: 'none', borderRadius: '25px', fontWeight: '600', cursor: 'pointer'
//             }}>
//               ADD TO CART
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const RestaurantMenu = () => {
//   const { id } = useParams();
  
//   // 1. GET CART LOGIC FROM CONTEXT
//   const { addToCart, cartItems } = useCart();

//   // Calculate current cart count from context for the "View Cart" button
//   const currentCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const menuData = {
//     1: { name: "🍕 Domino's Pizza", items: [
//       { id: 'p1', name: "Margherita Pizza", price: 299, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300", veg: true },
//       { id: 'p2', name: "Pepperoni Pizza", price: 349, image: "https://images.unsplash.com/photo-1569319833968-7e91549e8fe6?w=300", veg: false },
//       { id: 'p3', name: "Veggie Supreme", price: 399, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300", veg: true }
//     ]},
//     2: { name: "🍕 Pizza Hut", items: [
//       { id: 'ph1', name: "Paneer Tikka Pizza", price: 429, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", veg: true },
//       { id: 'ph2', name: "Chicken Supreme", price: 499, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300", veg: false }
//     ]}
//   };

//   const restaurant = menuData[id] || menuData[1];

//   return (
//     <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//         <h1 style={{ color: '#e23744', margin: 0 }}>{restaurant.name}</h1>
//         <Link to="/cart" style={{ 
//           padding: '10px 20px', 
//           background: '#e23744', 
//           color: 'white', 
//           textDecoration: 'none', 
//           borderRadius: '25px',
//           fontWeight: 'bold'
//         }}>
//           🛒 View Cart ({currentCartCount})
//         </Link>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
//         {restaurant.items.map(item => (
//           <div key={item.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
//             <img src={item.image} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
//             <h3 style={{ margin: '1rem 0 0.5rem 0' }}>{item.name}</h3>
//             <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e23744', marginBottom: '1rem' }}>
//               ₹{item.price}
//             </div>
            
//             {/* 2. CALL addToCart FROM CONTEXT */}
//             <button 
//               onClick={() => addToCart(item)} 
//               style={{
//                 width: '100%', padding: '12px', background: '#28a745', color: 'white',
//                 border: 'none', borderRadius: '25px', fontWeight: '600', cursor: 'pointer',
//                 transition: '0.2s',
//               }}
//               onMouseOver={(e) => e.target.style.background = '#218838'}
//               onMouseOut={(e) => e.target.style.background = '#28a745'}
//             >
//               ADD TO CART
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // CHECKOUT
// const Checkout = ({ cartItems }) => {
//   const total = Object.values(cartItems).reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h1 style={{ textAlign: 'center', color: '#e23744' }}>💳 Checkout</h1>
//       <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
//         <div style={{ marginBottom: '2rem' }}>
//           <h3>Total: ₹{total.toLocaleString()}</h3>
//           <p>Delivery to: Bengaluru Central</p>
//         </div>
//         <div style={{ marginBottom: '2rem' }}>
//           <input placeholder="Name" style={{ width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd' }} />
//           <input placeholder="Phone" style={{ width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd' }} />
//           <input placeholder="Address" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
//         </div>
//         <Link to="/track-order" style={{
//           width: '100%', padding: '15px', background: '#28a745', color: 'white',
//           textDecoration: 'none', borderRadius: '25px', fontWeight: '600', textAlign: 'center', display: 'block'
//         }}>
//           PLACE ORDER
//         </Link>
//       </div>
//     </div>
//   );
// };

// TRACK ORDER
const TrackOrder = () => (
  <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
    <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#e23744' }}>📦 Order Tracking</h1>
      <div style={{ margin: '2rem 0' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Order #1234</div>
        <div style={{ color: '#28a745', fontSize: '1.2rem', fontWeight: 'bold' }}>Preparing Food</div>
        <div style={{ height: '4px', background: '#eee', borderRadius: '2px', margin: '2rem 0' }}>
          <div style={{ height: '4px', background: '#28a745', width: '40%', borderRadius: '2px' }}></div>
        </div>
      </div>
      <Link to="/order-success" style={{
        padding: '15px 40px', background: '#28a745', color: 'white',
        textDecoration: 'none', borderRadius: '30px', fontWeight: '600'
      }}>
        Refresh Status
      </Link>
    </div>
  </div>
);

// SUCCESS
const OrderSuccess = () => (
  <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
    <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
      <div style={{ fontSize: '4rem', color: '#28a745', marginBottom: '1rem' }}>✅</div>
      <h1 style={{ color: '#28a745', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        Your order #1234 has been placed. We'll notify you when it's ready.
      </p>
      <Link to="/" style={{
        padding: '15px 40px', background: '#e23744', color: 'white',
        textDecoration: 'none', borderRadius: '30px', fontWeight: '600'
      }}>
        Order More
      </Link>
    </div>
  </div>
);

export default App;
