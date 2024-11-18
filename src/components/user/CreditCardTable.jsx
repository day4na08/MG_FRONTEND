import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/CreditCardTable.css';

const CreditCardTable = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newCard, setNewCard] = useState({
    numero: '',
    nombre: '',
    fechaVencimiento: '',
    codigoSeguridad: ''
  });

  const [editMode, setEditMode] = useState({ key: null });
  const [showModal, setShowModal] = useState(false);

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
          tarjetasDeCredito: data.tarjetasDeCredito || {},
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

  const generateCardKey = () => {
    const currentKeys = Object.keys(userData.tarjetasDeCredito);
    return `tarjeta${currentKeys.length + 1}`;
  };

  const handleAddCard = () => {
    if (!newCard.numero || !newCard.nombre || !newCard.fechaVencimiento || !newCard.codigoSeguridad) {
      alert('Por favor, complete todos los campos de la tarjeta de crédito.');
      return;
    }

    const fecha = new Date(newCard.fechaVencimiento);
    const hoy = new Date();
    if (fecha < hoy) {
      alert('La fecha de vencimiento no puede ser pasada.');
      return;
    }

    const newCardKey = generateCardKey();
    const updatedCards = { ...userData.tarjetasDeCredito, [newCardKey]: newCard };
    handleSaveChanges({ ...userData, tarjetasDeCredito: updatedCards });

    setNewCard({
      numero: '',
      nombre: '',
      fechaVencimiento: '',
      codigoSeguridad: ''
    });
    setShowModal(false);
  };

  const handleEdit = (key) => {
    setEditMode({ key });
    setNewCard(userData.tarjetasDeCredito[key]);
    setShowModal(true);
  };

  const handleUpdate = () => {
    const updatedCards = { ...userData.tarjetasDeCredito, [editMode.key]: newCard };
    handleSaveChanges({ ...userData, tarjetasDeCredito: updatedCards });
    setEditMode({ key: null });
    setNewCard({ numero: '', nombre: '', fechaVencimiento: '', codigoSeguridad: '' });
    setShowModal(false);
  };

  const handleDelete = (key) => {
    const updatedCards = { ...userData.tarjetasDeCredito };
    delete updatedCards[key];
    handleSaveChanges({ ...userData, tarjetasDeCredito: updatedCards });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="credit-card-table">
      <h3>Tarjetas de Crédito</h3>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nombre</th>
            <th>Fecha de Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userData.tarjetasDeCredito).map(([key, tarjeta]) => (
            <tr key={key}>
              <td>**** **** **** {tarjeta.numero.slice(-4)}</td>
              <td>{tarjeta.nombre}</td>
              <td>{tarjeta.fechaVencimiento}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(key)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(key)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Tarjeta
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode.key ? 'Actualizar Tarjeta' : 'Agregar Tarjeta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Número de tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número de tarjeta"
                value={newCard.numero}
                onChange={(e) => setNewCard({ ...newCard, numero: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCardName">
              <Form.Label>Nombre del titular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del titular"
                value={newCard.nombre}
                onChange={(e) => setNewCard({ ...newCard, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCardExpiry">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control
                type="date"
                value={newCard.fechaVencimiento}
                onChange={(e) => setNewCard({ ...newCard, fechaVencimiento: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCardCVV">
              <Form.Label>Código de seguridad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código de seguridad"
                value={newCard.codigoSeguridad}
                onChange={(e) => setNewCard({ ...newCard, codigoSeguridad: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={editMode.key ? handleUpdate : handleAddCard}
          >
            {editMode.key ? 'Actualizar Tarjeta' : 'Agregar Tarjeta'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreditCardTable;
