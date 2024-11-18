import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserProfile.css'
import { Navigate } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPhone, setNewPhone] = useState('');
  const [editMode, setEditMode] = useState({ type: null, index: null });
  const [showEditModal, setShowEditModal] = useState(false);

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
          telefonos: data.telefonos || {}
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

  const handleSaveChanges = async (updatedData) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('No se encontró ID de usuario');
      }
      await axios.put(`https://mgbackend-production.up.railway.app/users/${userId}`, updatedData);
      setUserData(updatedData);
      alert('Datos actualizados exitosamente');
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert('Hubo un problema al actualizar los datos. Por favor, inténtelo de nuevo.');
    }
  };

  const handleAddPhone = () => {
    if (!newPhone) {
      alert('Por favor, ingrese un número de teléfono.');
      return;
    }

    const phoneKey = `telefono${Object.keys(userData.telefonos).length + 1}`;
    const updatedPhones = { ...userData.telefonos, [phoneKey]: newPhone };
    handleSaveChanges({ ...userData, telefonos: updatedPhones });

    setNewPhone('');
    setShowEditModal(false);
  };

  const handleEdit = (index) => {
    setEditMode({ type: 'phone', index });
    setNewPhone(userData.telefonos[index]);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    const updatedPhones = { ...userData.telefonos, [`telefono${editMode.index + 1}`]: newPhone };
    handleSaveChanges({ ...userData, telefonos: updatedPhones });

    setEditMode({ type: null, index: null });
    setNewPhone('');
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedPhones = Object.fromEntries(
      Object.entries(userData.telefonos).filter(([key]) => key !== `telefono${index + 1}`)
    );
    handleSaveChanges({ ...userData, telefonos: updatedPhones });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No hay datos de usuario</div>;
  }

  return (
    <div>
      <h2>Bienvenido ¡{userData.username}!</h2>
      <h4>Que necesitas hoy?</h4>
      <p>Apellido: {userData.apellido}</p>
      <p>Email: {userData.email}</p>
<hr />
      <h3>Actualice sus numeros de contacto aqui!</h3>
      <table>
        <thead>
          <tr>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userData.telefonos).map(([key, telefono], index) => (
            <tr key={index}>
              <td>{telefono}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(index)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(index)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="primary" onClick={() => { setEditMode({ type: 'phone', index: null }); setShowEditModal(true); }}>
        Agregar Teléfono
      </Button>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode.index === null ? 'Agregar Teléfono' : 'Actualizar Teléfono'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formInput">
              <Form.Label>Número de teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese número de teléfono"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={editMode.index === null ? handleAddPhone : handleUpdate}>
            {editMode.index === null ? 'Agregar Teléfono' : 'Actualizar Teléfono'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserProfile;
