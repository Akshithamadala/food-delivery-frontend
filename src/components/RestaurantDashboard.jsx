import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantDashboard = () => {
  const { resId } = useParams();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://localhost:9090/api/orders/restaurant/${resId}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [resId]);

  const updateStatus = async (orderId, newStatus) => {
    await fetch(`http://localhost:9090/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStatus)
    });
    fetchOrders();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Restaurant Dashboard (ID: {resId})</h1>
      <div style={{ display: 'grid', gap: '15px' }}>
        {orders.length === 0 ? <p>No active orders</p> : orders.map(order => (
          <div key={order.id} style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3>Order #{order.id}</h3>
            <p>Status: <strong>{order.status}</strong></p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => updateStatus(order.id, "PREPARING")}>Prepare</button>
              <button onClick={() => updateStatus(order.id, "OUT_FOR_DELIVERY")}>Ship</button>
              <button onClick={() => updateStatus(order.id, "DELIVERED")}>Complete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDashboard;