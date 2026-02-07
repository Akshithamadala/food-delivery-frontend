import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || { id: 2 }; // Fallback to ID 1 for testing
    console.log(user)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/orders');
        if (response.ok) {
          const allOrders = await response.json();
          
          // 2. Filter orders belonging only to this user
          const userOrders = allOrders.filter(order => order.user.id === user.user.id);
          
          // Sort by newest first
          userOrders.sort((a, b) => new Array(b.orderTime) - new Array(a.orderTime));
          
          setOrders(userOrders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  if (loading) return <div style={styles.centerText}>⏳ Loading your order history...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <button onClick={() => navigate('/')} style={styles.navBtn}>🏠 Home</button>
        <h2 style={{ margin: 0, color: '#333' }}>My Orders</h2>
        <div style={{ width: '80px' }} /> {/* Spacer for centering */}
      </div>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={{ fontSize: '4rem', margin: 0 }}>🍱</p>
          <h3>No orders yet!</h3>
          <p>Hungry? Order something delicious now.</p>
          <Link to="/restaurants" style={styles.browseBtn}>Browse Restaurants</Link>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {orders.map(order => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.cardTop}>
                <div>
                  <h3 style={styles.resName}>{order.restaurant.name || "Restaurant"}</h3>
                  <p style={styles.orderDate}>{new Date(order.orderTime).toLocaleString()}</p>
                </div>
                <span style={{ 
                  ...styles.statusTag, 
                  backgroundColor: order.status === 'DELIVERED' ? '#e6f4ea' : '#fff5f5',
                  color: order.status === 'DELIVERED' ? '#1e7e34' : '#e23744'
                }}>
                  {order.status}
                </span>
              </div>

              <div style={styles.itemsList}>
                {order.items.map(item => (
                  <div key={item.id} style={styles.itemRow}>
                    <span>{item.menuItem.name} x {item.quantity}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div style={styles.cardBottom}>
                <div style={styles.totalBox}>
                  <span style={styles.totalLabel}>Total Paid</span>
                  <span style={styles.totalAmount}>₹{order.totalAmount}</span>
                </div>
                <button 
                  onClick={() => navigate(`/track-order/${order.id}`)}
                  style={styles.trackBtn}
                >
                  {order.status === 'DELIVERED' ? 'View Details' : 'Track Order 🛵'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  navBtn: { padding: '8px 15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: '600' },
  orderCard: { background: 'white', borderRadius: '20px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed #eee', paddingBottom: '1rem', marginBottom: '1rem' },
  resName: { margin: '0 0 4px 0', fontSize: '1.2rem', color: '#1a1a1a' },
  orderDate: { margin: 0, fontSize: '0.8rem', color: '#999' },
  statusTag: { padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' },
  itemsList: { marginBottom: '1rem' },
  itemRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', marginBottom: '5px' },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f8f8f8' },
  totalBox: { display: 'flex', flexDirection: 'column' },
  totalLabel: { fontSize: '0.7rem', color: '#999', textTransform: 'uppercase' },
  totalAmount: { fontSize: '1.1rem', fontWeight: '800', color: '#333' },
  trackBtn: { padding: '10px 20px', background: 'white', border: '2px solid #e23744', color: '#e23744', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: '0.2s' },
  emptyState: { textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '30px' },
  browseBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '12px 30px', background: '#e23744', color: 'white', textDecoration: 'none', borderRadius: '12px', fontWeight: '700' },
  centerText: { textAlign: 'center', padding: '5rem' }
};

export default MyOrders;