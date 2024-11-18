import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function UserCartFavorites() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/1/favorites');
        setFavoriteItems(response.data);
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      }
    };

    fetchFavoriteItems();
  }, []);

  const handleRemoveFromFavorites = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/users/1/favorites/${productId}`);
      setFavoriteItems(favoriteItems.filter(item => item.id !== productId));
      setMessage('Artículo eliminado de favoritos.');
    } catch (error) {
      console.error('Error removing item from favorites:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        {message && <p style={styles.message}>{message}</p>}
        <h2 style={styles.title}>Productos Favoritos</h2>
        <ul style={styles.list}>
          {favoriteItems.length > 0 ? (
            favoriteItems.map(item => (
              <li key={item.id} style={styles.item}>
                {item.nombre}
                <button style={styles.button} onClick={() => handleRemoveFromFavorites(item.id)}>
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <p>No hay productos favoritos.</p>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
  },
  message: {
    color: 'green',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #eee',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default UserCartFavorites;
