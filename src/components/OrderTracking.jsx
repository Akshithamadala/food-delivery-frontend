// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';

// const OrderTracking = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [step, setStep] = useState(1);

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const response = await fetch(`http://localhost:9090/api/orders/${orderId}`);
//         const data = await response.json();
//         setOrder(data);

//         const statusMap = {
//           "PLACED": 1,
//           "PREPARING": 2,
//           "OUT_FOR_DELIVERY": 3,
//           "DELIVERED": 4
//         };
//         setStep(statusMap[data.status] || 1);
//       } catch (err) {
//         console.error("Error fetching status:", err);
//       }
//     };

//     fetchStatus();
//     const interval = setInterval(fetchStatus, 5000);
//     return () => clearInterval(interval);
//   }, [orderId]);

//   if (!order) return <div style={{textAlign: 'center', padding: '5rem'}}>Loading Order Status...</div>;

//   const steps = [
//     { id: 1, label: 'Order Placed', icon: '📝' },
//     { id: 2, label: 'Preparing', icon: '👨‍🍳' },
//     { id: 3, label: 'On the Way', icon: '🛵' },
//     { id: 4, label: 'Delivered', icon: '✅' }
//   ];

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
//       <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 15px 50px rgba(0,0,0,0.08)', textAlign: 'center' }}>
//         <h2 style={{ color: '#e23744' }}>Order #{orderId}</h2>
//         <p style={{ color: '#666' }}>Status: <strong>{order.status}</strong></p>
        
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', position: 'relative' }}>
//           {steps.map((s) => (
//             <div key={s.id} style={{ zIndex: 2, textAlign: 'center', opacity: step >= s.id ? 1 : 0.3 }}>
//               <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{s.icon}</div>
//               <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
        
//         <Link to="/restaurants" style={{ display: 'inline-block', marginTop: '2rem', color: '#e23744', textDecoration: 'none' }}>
//           ← Back to Browsing
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderTracking;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const OrderTracking = () => {
  // 1. This grabs the ID directly from the URL (e.g., /track-order/1 -> 1)
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // 2. Fetch specific order using the ID from the URL
        const response = await fetch(`http://localhost:9090/api/orders/${orderId}`);
        
        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setOrder(data);

        // Map backend status to step number (1-4)
        const statusMap = {
          "PLACED": 1,
          "PREPARING": 2,
          "OUT_FOR_DELIVERY": 3,
          "DELIVERED": 4
        };
        setStep(statusMap[data.status] || 1);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };

    fetchStatus();
    
    // Poll every 5 seconds to catch status updates from the backend
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (error) {
    return (
      <div style={styles.center}>
        <h2>⚠️ Order Not Found</h2>
        <p>We couldn't find order #{orderId}.</p>
        <Link to="/restaurants" style={styles.browseLink}>Return to Restaurants</Link>
      </div>
    );
  }

  if (!order) return <div style={styles.center}>🔄 Loading Order #{orderId}...</div>;

  const steps = [
    { id: 1, label: 'Order Placed', icon: '📝' },
    { id: 2, label: 'Preparing', icon: '👨‍🍳' },
    { id: 3, label: 'On the Way', icon: '🛵' },
    { id: 4, label: 'Delivered', icon: '✅' }
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      
      <div style={styles.navBar}>
        <button onClick={() => navigate(-1)} style={styles.navBtn}>⬅ Back</button>
        <button onClick={() => navigate('/')} style={styles.navBtn}>🏠 Home</button>
      </div>

      <div style={styles.card}>
        <h2 style={{ color: '#e23744', marginBottom: '0.5rem' }}>Order #{orderId}</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Current Status: <strong style={{ color: '#333' }}>{order.status}</strong>
        </p>
        
        {/* PROGRESS TRACKER */}
        <div style={styles.trackerWrapper}>
          <div style={styles.progressLineBackground} />
          <div style={{ 
            ...styles.progressLineActive, 
            width: `${((step - 1) / (steps.length - 1)) * 100}%` 
          }} />

          <div style={styles.stepsContainer}>
            {steps.map((s) => (
              <div key={s.id} style={{ ...styles.stepItem, opacity: step >= s.id ? 1 : 0.4 }}>
                <div style={{ 
                  ...styles.iconCircle, 
                  background: step >= s.id ? '#e23744' : '#f0f0f0',
                  color: step >= s.id ? 'white' : '#999',
                  border: step === s.id ? '3px solid #f8d7da' : 'none'
                }}>
                  {s.icon}
                </div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: step >= s.id ? '700' : '500',
                  marginTop: '10px'
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Delivery Address</span>
            <p style={styles.infoValue}>{order.deliveryAddress || 'Bengaluru, India'}</p>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Total Amount</span>
            <p style={styles.infoValue}>₹{order.totalAmount}</p>
          </div>
        </div>

        <Link to="/restaurants" style={styles.browseLink}>
          Order something else?
        </Link>
      </div>
    </div>
  );
};

const styles = {
  navBar: { display: 'flex', gap: '10px', marginBottom: '1rem' },
  navBtn: { padding: '8px 15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: '600' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 15px 50px rgba(0,0,0,0.08)', textAlign: 'center' },
  trackerWrapper: { position: 'relative', margin: '3rem 0' },
  stepsContainer: { display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 },
  stepItem: { textAlign: 'center', width: '25%' },
  iconCircle: { width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', margin: '0 auto', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },
  progressLineBackground: { position: 'absolute', top: '22px', left: '12%', right: '12%', height: '3px', background: '#f0f0f0', zIndex: 1 },
  progressLineActive: { position: 'absolute', top: '22px', left: '12%', height: '3px', background: '#e23744', zIndex: 1, transition: 'width 1s ease-in-out' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '2rem', padding: '1.5rem', background: '#fcfcfc', borderRadius: '15px', textAlign: 'left' },
  infoLabel: { fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' },
  infoValue: { margin: '2px 0 0 0', fontSize: '0.9rem', fontWeight: '600' },
  browseLink: { display: 'inline-block', marginTop: '2rem', color: '#e23744', textDecoration: 'none', fontWeight: '700' },
  center: { textAlign: 'center', padding: '5rem' }
};

export default OrderTracking;