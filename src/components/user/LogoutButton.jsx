import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../../css/LogoutButton.css';

const cookies = new Cookies();

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    // Elimina las cookies relacionadas con la sesión
    cookies.remove('id', { path: '/' });
    cookies.remove('username', { path: '/' });
    cookies.remove('email', { path: '/' });
    cookies.remove('role', { path: '/' });

    // Redirige a la página de inicio de sesión
    navigate('/Login');
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  // Verifica si el usuario está autenticado
  const isAuthenticated = cookies.get('id') !== undefined;

  // Estilos en línea
  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    confirmButton2: {
      margin: '5px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#0056b3',
      color: 'white',
    },
    cancelButton1: {
      margin: '5px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#e0e0e0',
    },
  };

  // Renderiza el botón solo si el usuario está autenticado
  return (
    <>
      {isAuthenticated && (
        <>
          <button onClick={() => setIsModalOpen(true)} className="logout-button">
            Cerrar Sesión
          </button>

          {isModalOpen && (
            <div style={styles.modalOverlay}>
              <div style={styles.modalContent}>
                <h2>Confirmar Cierre de Sesión</h2>
                <p>¿Está seguro de que desea cerrar sesión?</p>
                <button onClick={handleConfirmLogout} style={styles.confirmButton2}>Sí</button>
                <button onClick={handleCancelLogout} style={styles.cancelButton1}>No</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LogoutButton;
