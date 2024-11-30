import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Restablecer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSendLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://mgbackend-production.up.railway.app/passwordReset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Se ha enviado un enlace para restablecer tu contraseña.');
        setMessageType('success');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error al enviar el enlace. Intenta nuevamente.');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Error al enviar el enlace. Intenta nuevamente.');
      setMessageType('error');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f0f8ff',
      padding: '20px',
      boxSizing: 'border-box',
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    formContainer: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '450px',
      textAlign: 'center',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      borderRadius: '10px',
      padding: '14px',
      border: '2px solid #007bff',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#0056b3',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'background-color 0.3s, color 0.3s',
      marginTop: '20px',
    },
    notification: {
      marginTop: '20px',
      color: messageType === 'success' ? 'green' : 'red',
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h1>Restablecer contraseña</h1>
          <form onSubmit={handleSendLink}>
            <div style={styles.inputGroup}>
              <label>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Dirección de correo electrónico"
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </button>
          </form>

          {message && <div style={styles.notification}>{message}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Restablecer;
