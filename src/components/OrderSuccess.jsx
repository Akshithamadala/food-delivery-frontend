import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Try location.state first
    let orderData = location.state?.order;
    
    // 2. If not found, check localStorage (SURVIVES REFRESH!)
    if (!orderData || !orderData.id) {
      orderData = JSON.parse(localStorage.getItem('lastOrder') || 'null');
    }
    
    // 3. If STILL no order, check sessionStorage (new session)
    if (!orderData || !orderData.id) {
      orderData = JSON.parse(sessionStorage.getItem('lastOrder') || 'null');
    }
    
    if (orderData && orderData.id) {
      setOrder(orderData);
      // Always save to localStorage for persistence
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
    }
  }, [location.state]);

  const handleHome = () => {
    // Clear order data when leaving page
    localStorage.removeItem('lastOrder');
    sessionStorage.removeItem('lastOrder');
    navigate('/');
  };

  const handleNewOrder = () => {
    localStorage.removeItem('lastOrder');
    sessionStorage.removeItem('lastOrder');
    navigate('/restaurants');
  };

  // LOADING SCREEN (prevents flash)
  if (order === null) {
    return (
      <div style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', minHeight: '60vh', textAlign: 'center' 
      }}>
        <div style={{ 
          width: '50px', height: '50px', border: '4px solid #f3f3f3', 
          borderTop: '4px solid #ff6b35', borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading order...</p>
      </div>
    );
  }

  // NO ORDER FOUND
  if (!order || !order.id) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ color: '#666' }}>📭 No Recent Orders</h2>
        <p>Your order details are no longer available.</p>
        <button 
          onClick={handleNewOrder} 
          style={{
            padding: '15px 30px', background: '#ff6b35', color: 'white',
            border: 'none', borderRadius: '12px', fontSize: '16px', cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          🍽️ Start New Order
        </button>
      </div>
    );
  }

  // SUCCESS SCREEN
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      {/* SUCCESS HEADER */}
      <div style={{ 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white', padding: '40px', borderRadius: '20px', marginBottom: '30px'
      }}>
        <div style={{ fontSize: '4em', marginBottom: '10px' }}>🎉</div>
        <h1 style={{ fontSize: '2.5em', margin: '0 0 10px' }}>Order Confirmed!</h1>
        <p style={{ fontSize: '1.2em', opacity: 0.9 }}>Order #{order.id}</p>
      </div>

      {/* ORDER SUMMARY */}
      <div style={{ 
        background: 'white', borderRadius: '20px', padding: '30px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '30px'
      }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>Order Summary</h2>
        <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🍕 Restaurant:</span>
            <strong>{order.restaurantName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>📦 Items:</span>
            <strong>{order.items.length} items</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>💰 Total:</span>
            <strong>₹{order.totalAmount}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>💳 Payment:</span>
            <strong>{order.paymentMethod || 'Cash'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🏠 Delivery:</span>
            <strong>{order.deliveryAddress}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>⏱️ ETA:</span>
            <strong>25-35 mins 🚚</strong>
          </div>
        </div>

        {/* ITEMS LIST */}
        <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '2px solid #f0f0f0' }}>
          <h3 style={{ marginTop: 0 }}>Your Order:</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {order.items.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', justifyContent: 'space-between', 
                padding: '12px 0', borderBottom: '1px solid #f8f9fa'
              }}>
                <span style={{ fontSize: '16px' }}>{item.name}</span>
                <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>
                  ₹{item.price} x{item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          onClick={handleNewOrder}
          style={{
            padding: '15px 30px', background: '#28a745', color: 'white',
            border: 'none', borderRadius: '12px', fontSize: '16px', cursor: 'pointer',
            minWidth: '160px'
          }}
        >
          🍽️ New Order
        </button>
        <button 
          onClick={() => navigate('/track-order', { state: { orderId: order.id } })}
          style={{
            padding: '15px 30px', background: '#ff6b35', color: 'white',
            border: 'none', borderRadius: '12px', fontSize: '16px', cursor: 'pointer',
            minWidth: '160px'
          }}
        >
          📱 Track Order
        </button>
        <button 
          onClick={handleHome}
          style={{
            padding: '15px 30px', background: '#007bff', color: 'white',
            border: 'none', borderRadius: '12px', fontSize: '16px', cursor: 'pointer',
            minWidth: '160px'
          }}
        >
          🏠 Home
        </button>
      </div>

      <div style={{ 
        textAlign: 'center', padding: '20px', background: '#f8f9fa', 
        borderRadius: '15px', marginTop: '30px'
      }}>
        <p>Need help? Call <strong>1800-FOOD-DELIVERY</strong></p>
        <p>Order support available 24/7 🚚</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
