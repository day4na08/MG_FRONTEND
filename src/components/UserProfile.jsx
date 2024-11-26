import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneTable from './user/PhoneTable';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('No se encontró ID de usuario');
        }

        const response = await axios.get(`https://mgbackend-production.up.railway.app/users/${userId}`);
        const data = response.data;

        if (!data) {
          throw new Error('No se encontraron datos del usuario');
        }

        setUserData({
          ...data,
          tarjetasDeCredito: data.tarjetasDeCredito || [],
          telefonos: data.telefonos || {},
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div>;
  }

  if (!userData) {
    return <div className="alert alert-danger">No hay datos de usuario</div>;
  }

  return (
    <div className="container user-profile my-5">
      <h1 className="text-center mb-4">¡Bienvenido, {userData.username}!</h1>
      <div className="row mb-5">
        <div className="col-md-6">
          <p className="fs-4"><strong>Nombre de Usuario:</strong> {userData.username}</p>
          <p className="fs-4"><strong>Apellido:</strong> {userData.apellido}</p>
        </div>
        <div className="col-md-6">
          <p className="fs-4"><strong>Email:</strong> {userData.email}</p>
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <h2 className="mb-4">Actualice sus números de contacto</h2>
        <PhoneTable />
      </div>
    </div>
  );
}

export default UserProfile;
