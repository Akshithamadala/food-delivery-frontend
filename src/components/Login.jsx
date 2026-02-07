import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // State for visibility
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:9090/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token',userData.token);
        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => navigate('/home'), 1500);

      } else {
        setMessage({ type: 'error', text: 'Invalid email or password.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection failed. Check backend.' });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      padding: '20px'
    },
    card: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      width: '100%',
      maxWidth: '400px'
    },
    logo: {
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: '800',
      color: '#2d3436',
      marginBottom: '10px',
      cursor: 'pointer'
    },
    highlight: { color: '#e67e22' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#636e72' },
    passwordWrapper: {
      position: 'relative', // Necessary for absolute positioning of the icon
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      paddingRight: '45px', // Space for the icon
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      boxSizing: 'border-box',
      outline: 'none'
    },
    eyeIcon: {
      position: 'absolute',
      right: '15px',
      cursor: 'pointer',
      fontSize: '18px',
      userSelect: 'none'
    },
    btnSubmit: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#e67e22',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    msg: {
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '20px',
      fontSize: '14px',
      textAlign: 'center',
      backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
      color: message.type === 'success' ? '#155724' : '#721c24',
      display: message.text ? 'block' : 'none'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          Quick<span style={styles.highlight}>Bite</span>
        </div>
        
        {message.text && <div style={styles.msg}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              style={styles.input} 
              type="email" name="email" required 
              placeholder="name@example.com"
              value={formData.email} onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                style={styles.input} 
                type={showPassword ? "text" : "password"} // Dynamic input type
                name="password" required 
                placeholder="••••••••"
                value={formData.password} onChange={handleChange}
              />
              <span style={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>
          </div>

          <button type="submit" style={styles.btnSubmit} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;