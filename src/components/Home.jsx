// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <main className="container">
//       <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
//           <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
//             <h1 style={{ fontSize: '2.5rem', color: '#e23744', marginBottom: '1rem' }}>🍕 QuickBite</h1>
//             <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>Fastest food delivery</p>
//             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Link to="/map" style={{ padding: '15px 40px', background: '#e23744', color: 'white', textDecoration: 'none', borderRadius: '30px', fontWeight: '600' }}>
//                 📍 Set Location
//               </Link>
//               <Link to="/restaurants" style={{ padding: '15px 40px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '30px', fontWeight: '600' }}>
//                 🍽️ Restaurants
//               </Link>
//             </div>
//           </div>
//         </div>
//     </main>
//   );
// };

// export default Home;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  // Get user from storage
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ 
          background: 'white', 
          padding: '3rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
        }}>
          
          <h1 style={{ fontSize: '2.8rem', color: '#e23744', marginBottom: '0.5rem' }}>🍕 QuickBite</h1>

          {/* --- HEADER CONTENT --- */}
          {!user ? (
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>
                Fastest food delivery. Login to discover the best food around you.
              </p>
            </div>
          ) : (
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '1.4rem', color: '#2d3436', fontWeight: '500' }}>
                Hello, <span style={{ color: '#e23744' }}>{user.name || 'User'}</span>! Ready for a meal?
              </p>
              <p style={{ color: '#636e72' }}>Select an option below to get started.</p>
            </div>
          )}

          {/* --- ACTION BUTTONS --- */}
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            
            {/* If Not Logged In */}
            {!user && (
              <>
                <Link to="/login" style={styles.btnRed}>Login to Order</Link>
                <Link to="/register" style={styles.btnDark}>Create Account</Link>
              </>
            )}

            {/* If Logged In (All Users) */}
            {user && (
              <>
                <Link to="/map" style={styles.btnRed}>📍 Set Delivery Location</Link>
                <Link to="/restaurants" style={styles.btnGreen}>🍽️ Browse Restaurants</Link>
                <Link to="/my-orders" style={styles.btnDark}>📦 Track Orders</Link>
              </>
            )}
          </div>

          {/* Logout Utility */}
          {user && (
            <div style={{ marginTop: '3rem' }}>
              <button 
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: '#b2bec3', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
              >
                Sign out of {user.email}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const styles = {
  btnRed: {
    padding: '16px 35px',
    background: '#e23744',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(226, 55, 68, 0.3)',
    minWidth: '180px'
  },
  btnGreen: {
    padding: '16px 35px',
    background: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
    minWidth: '180px'
  },
  btnDark: {
    padding: '16px 35px',
    background: '#2d3436',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    minWidth: '180px'
  }
};

export default Home;