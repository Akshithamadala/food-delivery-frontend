import React, { createContext, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (menuItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity,clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};


export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  // Navigation Header Component
  const CartHeader = () => (
    <div style={styles.navBar}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate(-1)} style={styles.navBtn}>
          ⬅ Back
        </button>
        <button onClick={() => navigate('/')} style={styles.navBtn}>
          🏠 Home
        </button>
      </div>
      <div style={styles.navTitle}>My Cart</div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
        <CartHeader />
        <div style={styles.emptyContainer}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
          <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>Your cart is empty</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/restaurants" style={styles.exploreBtn}>
            Explore Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <CartHeader />

      <h1 style={styles.mainTitle}>
        Your Order 
        <span style={styles.itemBadge}>{cartItems.length} Items</span>
      </h1>
      
      <div style={styles.cartCard}>
        {cartItems.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <img 
              src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100`}  
              alt={item.name} 
              style={styles.itemImg} 
            />
            
            <div style={{ flex: 1 }}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemPrice}>₹{item.price}</p>
            </div>

            <div style={styles.quantityControls}>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={styles.qtyBtn}
              >-</button>
              <span style={styles.qtyValue}>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={styles.qtyBtn}
              >+</button>
            </div>

            <button 
              onClick={() => removeFromCart(item.id)}
              style={styles.removeBtn}
            >✕</button>
          </div>
        ))}

        <div style={styles.summarySection}>
          <div style={styles.summaryRow}>
            <span style={{ color: '#666' }}>Item Total</span>
            <span style={{ fontWeight: '600' }}>₹{totalPrice}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={{ color: '#666' }}>Delivery Fee</span>
            <span style={{ color: '#28a745', fontWeight: '700' }}>FREE</span>
          </div>
          
          <div style={styles.divider}></div>

          <div style={styles.footerRow}>
            <div>
              <p style={styles.toPayLabel}>To Pay</p>
              <h2 style={styles.finalAmount}>₹{totalPrice}</h2>
            </div>
            <Link to="/checkout" style={styles.checkoutBtn}>
              Proceed to Checkout →
            </Link>
          </div>
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
    padding: '10px 0'
  },
  navBtn: {
    padding: '8px 15px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem'
  },
  navTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#e23744'
  },
  emptyContainer: {
    textAlign: 'center', 
    padding: '80px 20px', 
    background: 'white', 
    borderRadius: '24px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
  },
  exploreBtn: { 
    padding: '15px 35px', 
    background: '#e23744', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '12px', 
    fontWeight: '700',
    display: 'inline-block'
  },
  mainTitle: { 
    marginBottom: '2rem', 
    color: '#1a1a1a', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px',
    fontSize: '1.8rem'
  },
  itemBadge: { 
    fontSize: '0.9rem', 
    background: '#eee', 
    padding: '4px 12px', 
    borderRadius: '20px',
    fontWeight: 'normal'
  },
  cartCard: { 
    background: 'white', 
    borderRadius: '24px', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.05)', 
    overflow: 'hidden' 
  },
  cartItem: { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '1.5rem', 
    borderBottom: '1px solid #f0f0f0', 
    gap: '1.5rem' 
  },
  itemImg: { 
    width: '80px', 
    height: '80px', 
    borderRadius: '16px', 
    objectFit: 'cover' 
  },
  itemName: { 
    margin: '0 0 5px 0', 
    fontSize: '1.1rem', 
    color: '#333' 
  },
  itemPrice: { 
    color: '#e23744', 
    fontWeight: '800', 
    margin: 0, 
    fontSize: '1rem' 
  },
  quantityControls: { 
    display: 'flex', 
    alignItems: 'center', 
    background: '#f8f9fa', 
    borderRadius: '12px', 
    padding: '6px' 
  },
  qtyBtn: { 
    border: 'none', 
    background: 'white', 
    width: '28px', 
    height: '28px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)' 
  },
  qtyValue: { 
    padding: '0 12px', 
    fontWeight: '700', 
    textAlign: 'center' 
  },
  removeBtn: { 
    border: 'none', 
    background: 'none', 
    color: '#ff4d4d', 
    cursor: 'pointer', 
    fontSize: '1.1rem', 
    padding: '5px' 
  },
  summarySection: { 
    padding: '2rem', 
    background: '#fafafa' 
  },
  summaryRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    marginBottom: '1rem' 
  },
  divider: { 
    height: '1px', 
    background: '#eee', 
    margin: '1.5rem 0' 
  },
  footerRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  toPayLabel: { 
    margin: 0, 
    color: '#999', 
    fontSize: '0.8rem', 
    textTransform: 'uppercase' 
  },
  finalAmount: { 
    margin: 0, 
    color: '#1a1a1a', 
    fontSize: '1.8rem' 
  },
  checkoutBtn: { 
    padding: '16px 35px', 
    background: '#e23744', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '15px', 
    fontWeight: '800',
    boxShadow: '0 8px 20px rgba(226, 55, 68, 0.2)'
  }
};