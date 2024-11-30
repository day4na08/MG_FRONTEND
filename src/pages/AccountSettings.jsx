import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../css/AccountSettings.css';

const cookies = new Cookies();

const AccountSettings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    telefono: ''
  });
  
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');


  const mostrarTelefono = () => {
    const userId = cookies.get('id');  // Obtener el ID del usuario desde las cookies
    if (userId) {
      axios.get(`https://mgbackend-production.up.railway.app/phoneUser/${userId}`)  // Pasamos el ID en la URL
        .then((response) => {
          setPhone(response.data);  // Establecer el teléfono recibido
        })
        .catch((error) => {
          console.error('Error al obtener el teléfono', error);
          setMessage('Error al obtener el teléfono');
        });
    }
  };
  
  useEffect(() => {
    const userId = cookies.get('id');  // Obtener el ID del usuario desde las cookies
    if (userId) {
      // Obtener la información del usuario
      axios.get(`https://mgbackend-production.up.railway.app/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario', error);
          setMessage('No se pudo cargar la información del usuario');
        });
    }
    mostrarTelefono();
  }, []);

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    const userId = cookies.get('id');  // Obtener el ID del usuario desde las cookies
    if (!userId || !newEmail) {
      setMessage('Por favor ingrese un correo electrónico válido');
      return;
    }

    // Enviar la solicitud para actualizar el correo electrónico
    axios.put(`https://mgbackend-production.up.railway.app/users/updateEmail`, {
      userId: userId,
      newEmail: newEmail
    })
    .then(response => {
      setMessage('Correo electrónico actualizado con éxito');
      setUserData(prevState => ({ ...prevState, email: newEmail }));
    })
    .catch(error => {
      console.error('Error al actualizar el correo', error);
      setMessage('Error al actualizar el correo electrónico');
    });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const userId = cookies.get('id');  // Obtener el ID del usuario desde las cookies
    if (!userId || !currentPassword || !newPassword) {
      setMessage('Por favor ingrese la contraseña actual y la nueva contraseña');
      return;
    }

    // Enviar la solicitud para actualizar la contraseña
    axios.put(`https://mgbackend-production.up.railway.app/updatePassword`, {
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    })
    .then(response => {
      setMessage('Contraseña actualizada con éxito');
    })
    .catch(error => {
      console.error('Error al actualizar la contraseña', error);
      setMessage('Error al actualizar la contraseña');
    });
  };

  return (
    <div className="account-settings">
      <h2>Configuración de la Cuenta</h2>

      <div className="user-info">
        <h3>Información de la Cuenta</h3>
        <p><strong>Nombre:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Teléfono:</strong> {phone.telefono}</p>
      </div>

      <form className="email-update-form" onSubmit={handleEmailUpdate}>
        <h3>Actualizar Correo Electrónico</h3>
        <input
          type="email"
          placeholder="Nuevo correo electrónico"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <button type="submit">Actualizar correo</button>
      </form>

      <form className="password-update-form" onSubmit={handlePasswordUpdate}>
        <h3>Actualizar Contraseña</h3>
        <input
          type="password"
          placeholder="Contraseña actual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" >Actualizar Contraseña</button>
      </form>

      <p className="message">{message}</p>
    </div>
  );
};

export default AccountSettings;
