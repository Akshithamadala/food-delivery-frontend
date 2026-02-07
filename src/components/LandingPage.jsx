// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   // Style Objects
//   const styles = {
//     container: {
//       margin: 0,
//       padding: 0,
//       fontFamily: "'Segoe UI', Roboto, sans-serif",
//       color: '#333',
//       backgroundColor: '#fff',
//       minHeight: '100vh'
//     },
//     navbar: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '20px 5%',
//       boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//     },
//     logo: {
//       fontSize: '28px',
//       fontWeight: '800',
//       color: '#2d3436'
//     },
//     highlight: {
//       color: '#e67e22'
//     },
//     navButtons: {
//       display: 'flex',
//       gap: '15px'
//     },
//     btnSecondary: {
//       background: 'none',
//       border: 'none',
//       color: '#555',
//       fontWeight: '600',
//       cursor: 'pointer',
//       padding: '10px 20px'
//     },
//     btnPrimary: {
//       backgroundColor: '#e67e22',
//       border: 'none',
//       color: 'white',
//       padding: '10px 25px',
//       borderRadius: '8px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: '0.3s'
//     },
//     hero: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '60px 5%',
//       maxWidth: '1200px',
//       margin: '0 auto'
//     },
//     heroContent: {
//       flex: '1',
//       minWidth: '300px',
//       paddingRight: '20px'
//     },
//     title: {
//       fontSize: 'clamp(32px, 5vw, 56px)',
//       lineHeight: '1.2',
//       marginBottom: '20px'
//     },
//     subtitle: {
//       fontSize: '18px',
//       color: '#636e72',
//       marginBottom: '30px',
//       lineHeight: '1.6'
//     },
//     heroImageContainer: {
//       flex: '1',
//       minWidth: '300px',
//       display: 'flex',
//       justifyContent: 'center',
//       marginTop: '40px'
//     },
//     image: {
//       width: '100%',
//       maxWidth: '500px',
//       borderRadius: '20px',
//       boxShadow: '20px 20px 60px #ededed'
//     },
//     ctaGroup: {
//       display: 'flex',
//       gap: '15px'
//     },
//     mainCta: {
//       padding: '15px 35px',
//       backgroundColor: '#2d3436',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '16px',
//       fontWeight: 'bold',
//       cursor: 'pointer'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Navbar */}
//       <nav style={styles.navbar}>
//         <div style={styles.logo}>
//           Quick<span style={styles.highlight}>Bite</span>
//         </div>
//         <div style={styles.navButtons}>
//           <button style={styles.btnSecondary} onClick={() => navigate('/login')}>
//             Login
//           </button>
//           <button style={styles.btnPrimary} onClick={() => navigate('/register')}>
//             Register
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main style={styles.hero}>
//         <div style={styles.heroContent}>
//           <h1 style={styles.title}>
//             Fresh Food <br />
//             <span style={styles.highlight}>Delivered Fast.</span>
//           </h1>
//           <p style={styles.subtitle}>
//             Order from the best local restaurants and track your meal in real-time. 
//             Satisfy your cravings with just a few clicks.
//           </p>
//           <div style={styles.ctaGroup}>
//             <button style={styles.mainCta} onClick={() => navigate('/register')}>
//               Order Now
//             </button>
//           </div>
//         </div>

//         <div style={styles.heroImageContainer}>
//           <img 
//             src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600" 
//             alt="Food Bowl" 
//             style={styles.image}
//           />
//         </div>
//       </main>

//       {/* Features Bar */}
//       <div style={{
//         display: 'flex', 
//         justifyContent: 'space-around', 
//         padding: '40px 5%', 
//         backgroundColor: '#fdfdfd', 
//         textAlign: 'center',
//         borderTop: '1px solid #eee'
//       }}>
//         <div>
//           <h3 style={{color: '#e67e22', margin: '0'}}>100% Fresh</h3>
//           <p style={{fontSize: '14px', color: '#777'}}>Quality Guaranteed</p>
//         </div>
//         <div>
//           <h3 style={{color: '#e67e22', margin: '0'}}>Fast Delivery</h3>
//           <p style={{fontSize: '14px', color: '#777'}}>Under 30 Minutes</p>
//         </div>
//         <div>
//           <h3 style={{color: '#e67e22', margin: '0'}}>Easy Pay</h3>
//           <p style={{fontSize: '14px', color: '#777'}}>Secure Checkout</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: '#333',
      backgroundColor: '#fff',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden' // Prevents horizontal scroll on small screens
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 5%',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      flexWrap: 'wrap', // Wrap nav items on very small screens
      gap: '10px'
    },
    logo: {
      fontSize: 'clamp(20px, 4vw, 28px)',
      fontWeight: '800',
      color: '#2d3436'
    },
    highlight: {
      color: '#e67e22'
    },
    navButtons: {
      display: 'flex',
      gap: '10px'
    },
    btnPrimary: {
      backgroundColor: '#e67e22',
      border: 'none',
      color: 'white',
      padding: '8px clamp(12px, 2vw, 25px)',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px'
    },
    hero: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap', // This makes it stack on mobile
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(40px, 8vw, 80px) 5%',
      maxWidth: '1200px',
      margin: '0 auto',
      gap: '40px'
    },
    heroContent: {
      flex: '1 1 400px', // Grow, shrink, and base width of 400px
      textAlign: 'left',
    },
    title: {
      fontSize: 'clamp(32px, 6vw, 60px)', // Auto-scales based on screen width
      lineHeight: '1.1',
      marginBottom: '20px',
      fontWeight: '800'
    },
    subtitle: {
      fontSize: 'clamp(16px, 2vw, 18px)',
      color: '#636e72',
      marginBottom: '30px',
      lineHeight: '1.6',
      maxWidth: '550px'
    },
    heroImageContainer: {
      flex: '1 1 400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: '100%',
      height: 'auto',
      maxWidth: '550px',
      borderRadius: '24px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
      objectFit: 'cover'
    },
    featuresBar: {
      display: 'flex',
      flexWrap: 'wrap', // Stacks features on mobile
      justifyContent: 'space-around',
      padding: '40px 5%',
      backgroundColor: '#fafafa',
      textAlign: 'center',
      gap: '30px',
      marginTop: '40px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          Quick<span style={styles.highlight}>Bite</span>
        </div>
        <div style={styles.navButtons}>
          <button 
            style={{...styles.btnPrimary, backgroundColor: 'transparent', color: '#555'}} 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button style={styles.btnPrimary} onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Fresh Food <br />
            <span style={styles.highlight}>Delivered Fast.</span>
          </h1>
          <p style={styles.subtitle}>
            Order from the best local restaurants and track your meal in real-time. 
            Deliciousness is just one click away.
          </p>
          <button 
            style={{...styles.btnPrimary, padding: '15px 40px', fontSize: '16px', borderRadius: '12px'}} 
            onClick={() => navigate('/register')}
          >
            Order Now
          </button>
        </div>

        <div style={styles.heroImageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800" 
            alt="Fresh Food" 
            style={styles.image}
          />
        </div>
      </main>

      {/* Features Bar */}
      <div style={styles.featuresBar}>
        <FeatureItem title="100% Fresh" desc="Quality Guaranteed" />
        <FeatureItem title="Fast Delivery" desc="Under 30 Minutes" />
        <FeatureItem title="Easy Pay" desc="Secure Checkout" />
      </div>
    </div>
  );
};

// Helper component for the features to keep code clean
const FeatureItem = ({ title, desc }) => (
  <div style={{ minWidth: '150px' }}>
    <h3 style={{ color: '#e67e22', margin: '0 0 5px 0', fontSize: '20px' }}>{title}</h3>
    <p style={{ fontSize: '14px', color: '#777', margin: 0 }}>{desc}</p>
  </div>
);

export default LandingPage;