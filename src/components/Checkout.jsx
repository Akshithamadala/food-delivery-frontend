// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';

// const Checkout = ({ userLocation }) => {
//   const { cartItems, totalPrice, clearCart } = useCart();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) return;
//     setLoading(true);
    
//     const orderPayload = {
//       user: { id: 1 }, 
//       restaurant: { id: cartItems[0].restaurantId || 1 }, 
//       totalAmount: totalPrice,
//       status: "PLACED",
//       items: cartItems.map(item => ({
//         menuItem: { id: item.id },
//         quantity: item.quantity,
//         price: item.price
//       }))
//     };

//     try {
//       const response = await fetch('http://localhost:9090/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderPayload)
//       });

//       if (response.ok) {
//         const savedOrder = await response.json();
//         clearCart();
//         navigate(`/track-order/${savedOrder.id}`);
//       }
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Order failed. Make sure your Backend is running on port 9090.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
//       <h2 style={{ textAlign: 'center', color: '#e23744' }}>Checkout</h2>
//       <div style={{ margin: '2rem 0' }}>
//         {cartItems.map(item => (
//           <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <span>{item.name} x {item.quantity}</span>
//             <span>₹{item.price * item.quantity}</span>
//           </div>
//         ))}
//         <hr />
//         <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
//           <span>Total</span>
//           <span>₹{totalPrice}</span>
//         </div>
//       </div>
//       <button 
//         onClick={handlePlaceOrder} 
//         disabled={loading || cartItems.length === 0}
//         style={{
//           width: '100%', padding: '15px', background: '#28a745', color: 'white',
//           border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer'
//         }}
//       >
//         {loading ? "PROCESSING..." : "PLACE ORDER"}
//       </button>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = ({ userLocation }) => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Default address if userLocation is missing city/details
  const deliveryAddress = userLocation?.address || `${userLocation?.city || 'Bengaluru'}, India`;

  // const handlePlaceOrder = async () => {
  //   if (cartItems.length === 0) return;
  //   setLoading(true);
    
  //   // Constructing the payload exactly as your backend expects
  //   const orderPayload = {
  //     totalAmount: totalPrice,
  //     status: "PLACED",
  //     deliveryAddress: deliveryAddress,
  //     user: { id: 1 }, // Note: You might want to get this from localStorage.getItem('user')
  //     restaurant: { id: cartItems[0].restaurantId || 1 }, 
  //     items: cartItems.map(item => ({
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.quantity,
  //       menuItem: { id: item.id }
  //     }))
  //   };

  //   try {
  //     const response = await fetch('http://localhost:9090/api/orders', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(orderPayload)
  //     });

  //     if (response.ok) {
  //       const savedOrder = await response.json();
  //       clearCart();
  //       // Assuming your tracking route is /track-order/:id
  //       navigate(`/track-order/${savedOrder.id}`);
  //     } else {
  //       alert("Server responded with an error. Check console.");
  //     }
  //   } catch (error) {
  //     console.error("Order failed:", error);
  //     alert("Order failed. Make sure your Backend is running on port 9090.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handlePlaceOrder = async () => {
  if (cartItems.length === 0) return;
  setLoading(true);
  const user = JSON.parse(localStorage.getItem('user')) || { id: 2 }; // Fallback to ID 1 for testing
  console.log(user)
  const orderPayload = {
    totalAmount: totalPrice,
    status: "PLACED",
    deliveryAddress: deliveryAddress,
    user: { id: user.user.id },
    restaurant: { id: cartItems[0].restaurantId || 1 },
    items: cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      menuItem: { id: item.id }
    }))
  };

  try {
    const response = await fetch('http://localhost:9090/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });

    if (response.ok) {
      const savedOrder = await response.json();
      console.log("Order Successful:", savedOrder);
      
      clearCart();
      
      // Safety check: only navigate if we have an ID
      if (savedOrder && savedOrder.id) {
        navigate(`/track-order/${savedOrder.id}`);
      } else {
        // Fallback if ID is missing
        navigate('/my-orders');
      }
    } else {
      const errorData = await response.text();
      console.error("Server Error:", errorData);
      alert("Server Error: " + response.status);
    }
  } catch (error) {
    // This ONLY runs if the fetch itself fails (Network error)
    console.error("Fetch failed:", error);
    alert("Network Error: Could not connect to the server.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem' }}>
      
      {/* NAVIGATION HEADER */}
      <div style={styles.navBar}>
        <button onClick={() => navigate(-1)} style={styles.navBtn}>⬅ Back</button>
        <button onClick={() => navigate('/')} style={styles.navBtn}>🏠 Home</button>
      </div>

      <div style={styles.checkoutCard}>
        <h2 style={{ textAlign: 'center', color: '#e23744', marginBottom: '1.5rem' }}>Final Checkout</h2>
        
        {/* DELIVERY SECTION */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>📍 Delivery Address</h4>
          <p style={styles.addressText}>{deliveryAddress}</p>
        </div>

        {/* ITEMS SUMMARY */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>🛒 Order Summary</h4>
          {cartItems.map(item => (
            <div key={item.id} style={styles.orderItem}>
              <span>{item.name} <small style={{color: '#888'}}>x {item.quantity}</small></span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div style={styles.divider} />
        
        <div style={styles.totalRow}>
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>

        <button 
          onClick={handlePlaceOrder} 
          disabled={loading || cartItems.length === 0}
          style={{
            ...styles.placeOrderBtn,
            background: loading ? '#ccc' : '#28a745'
          }}
        >
          {loading ? "PROCESSING..." : "CONFIRM & PLACE ORDER"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  navBar: { display: 'flex', gap: '10px', marginBottom: '1.5rem' },
  navBtn: { padding: '8px 15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: '600' },
  checkoutCard: { background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' },
  section: { marginBottom: '1.5rem' },
  sectionTitle: { margin: '0 0 8px 0', fontSize: '0.9rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' },
  addressText: { margin: 0, fontWeight: '600', color: '#333' },
  orderItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '1rem' },
  divider: { height: '1px', background: '#eee', margin: '1.5rem 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.3rem', marginBottom: '2rem' },
  placeOrderBtn: { 
    width: '100%', padding: '18px', color: 'white', border: 'none', 
    borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem',
    boxShadow: '0 5px 15px rgba(40, 167, 69, 0.3)', transition: '0.3s'
  }
};

export default Checkout;