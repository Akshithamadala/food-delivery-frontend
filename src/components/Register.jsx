import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:9090/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Registration failed. Try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please check if your backend is running.' });
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
      maxWidth: '450px'
    },
    logo: {
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: '800',
      color: '#2d3436',
      marginBottom: '10px',
      cursor: 'pointer'
    },
    highlight: {
      color: '#e67e22'
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '30px',
      color: '#2d3436'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#636e72'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'border-color 0.3s'
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
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s'
    },
    linkText: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#636e72'
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
        <h2 style={styles.title}>Create your account</h2>

        {message.text && <div style={styles.msg}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              style={styles.input} 
              type="text" name="name" required 
              placeholder="Enter your name"
              value={formData.name} onChange={handleChange}
            />
          </div>

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
            <label style={styles.label}>Phone Number</label>
            <input 
              style={styles.input} 
              type="text" name="phone" required 
              placeholder="1234567890"
              value={formData.phone} onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              style={styles.input} 
              type="password" name="password" required 
              placeholder="••••••••"
              value={formData.password} onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            style={{...styles.btnSubmit, opacity: loading ? 0.7 : 1}}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account? 
          <span 
            style={{...styles.highlight, cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold'}}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;