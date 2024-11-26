import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Form } from 'react-bootstrap';

const PhoneTable = () => {
  const cookies = new Cookies();
  const userId = cookies.get('id');
  const [phone, setPhone] = useState('');
  const [phones, setPhones] = useState([]);
  const [editingPhone, setEditingPhone] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const noti = withReactContent(Swal);

  // Fetch user's phones from API
  const getPhones = () => {
    Axios.get(`http://localhost:5001/phones/${userId}`).then((response) => {
      setPhones(response.data);
    });
  };

  // Add new phone to the database
  const addPhone = () => {
    Axios.post('http://localhost:5001/createphone', {
      user_id: userId,
      telefono: phone,
    }).then(() => {
      noti.fire('¡Teléfono añadido!', 'El número fue registrado con éxito.', 'success');
      getPhones();
      closeModal();
    });
  };

  // Update phone number
  const updatePhone = () => {
    Axios.put('http://localhost:5001/updatephone', {
      id,
      telefono: phone,
    }).then(() => {
      noti.fire('¡Actualizado!', 'El número de teléfono se actualizó correctamente.', 'success');
      getPhones();
      closeModal();
    });
  };

  // Delete a phone number
  const deletePhone = (phoneId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:5001/deletePhone/${phoneId}`).then(() => {
          noti.fire('Eliminado', 'El teléfono fue eliminado con éxito.', 'success');
          getPhones();
        });
      }
    });
  };

  // Open modal for adding or editing
  const openModal = (phoneData = null) => {
    if (phoneData) {
      setEditingPhone(true);
      setPhone(phoneData.telefono);
      setId(phoneData.id);
    } else {
      setEditingPhone(false);
      setPhone('');
      setId('');
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setPhone('');
    setId('');
  };

  // Get user's phones on component mount
  useEffect(() => {
    getPhones();
  }, []);

  return (
    <div className="container">
          <Button variant="success" onClick={() => openModal()}>
            Agregar Teléfono
          </Button>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((phone, index) => (
            <tr key={phone.id}>
              <td>{index + 1}</td>
              <td>{phone.telefono}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => openModal(phone)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => deletePhone(phone.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPhone ? 'Actualizar Teléfono' : 'Agregar Teléfono'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPhone">
              <Form.Label>Número de Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese número de teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={editingPhone ? updatePhone : addPhone}>
            {editingPhone ? 'Actualizar Teléfono' : 'Agregar Teléfono'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhoneTable;
