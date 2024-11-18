import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Cookies from 'universal-cookie'; // Importar cookies
import '../css/AccountSettings.css'; 

const cookies = new Cookies();

const AccountSettings = () => {
  const [userData, setUserData] = useState({
    username: cookies.get('username') || '',
    email: cookies.get('email') || '',
    telefono: '', // Asigna un valor inicial adecuado si es necesario
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState(cookies.get('email') || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = cookies.get('id');
        if (!userId) {
          console.error('No hay usuario logueado');
          return;
        }

        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEmailChange = (e) => setNewEmail(e.target.value);
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  // URL base del servidor Express
  const BASE_URL = 'http://localhost:3002';

// Función para actualizar el correo electrónico
const updateEmail = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const userId = cookies.get('id');
    if (!userId) {
      setMessage('No hay usuario logueado');
      return;
    }

    await axios.put(`${BASE_URL}/users/${userId}/email`, { email: newEmail });
    setUserData((prevData) => ({ ...prevData, email: newEmail }));
    setMessage('Correo electrónico actualizado exitosamente');
  } catch (error) {
    console.error('Error updating email:', error);
    setMessage('Error al actualizar el correo electrónico');
  } finally {
    setLoading(false);
  }
};

// Función para actualizar la contraseña
const updatePassword = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const userId = cookies.get('id');
    if (!userId) {
      setMessage('No hay usuario logueado');
      return;
    }

    await axios.put(`${BASE_URL}/users/${userId}/password`, { password: newPassword });
    setMessage('Contraseña actualizada exitosamente');
    setCurrentPassword('');
    setNewPassword('');
  } catch (error) {
    console.error('Error updating password:', error);
    setMessage('Error al actualizar la contraseña');
  } finally {
    setLoading(false);
  }
};


  return (
    <>
           <NavBar />
      <div className="account-settings">
 
        <h2>Configuración de la Cuenta</h2>

        <div className="user-info">
          <h3>Información de la Cuenta</h3>
          <p><strong>Nombre:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Teléfono:</strong> {userData.telefono}</p>
        </div>

        <form onSubmit={updateEmail} className="email-update-form">
          <h3>Actualizar Correo Electrónico</h3>
          <input
            type="email"
            placeholder="Nuevo correo electrónico"
            value={newEmail}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar Correo'}
          </button>
        </form>

        <form onSubmit={updatePassword} className="password-update-form">
          <h3>Actualizar Contraseña</h3>
          <input
            type="password"
            placeholder="Contraseña actual"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default AccountSettings;
