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
  const [estado, setEstado] = useState('inactivo') 
  const [editingPhone, setEditingPhone] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const noti = withReactContent(Swal);

  // Fetch user's phones from API
  const getPhones = () => {
    Axios.get(`https://mgbackend-production.up.railway.app/phones/${userId}`).then((response) => {
      setPhones(response.data);
    });
  };

  // Add new phone to the database
  const addPhone = () => {
    Axios.post('https://mgbackend-production.up.railway.app/createphone', {
      user_id: userId,
      telefono: phone,
      estado: estado
    }).then(() => {
      noti.fire('¡Teléfono añadido!', 'El número fue registrado con éxito.', 'success');
      getPhones();
      closeModal();
    });
  };

  // Update phone number
  const updatePhone = () => {
    Axios.put('https://mgbackend-production.up.railway.app/updatephone', {
      id,
      telefono: phone,
      estado: estado
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
        Axios.delete(`https://mgbackend-production.up.railway.app/deletePhone/${phoneId}`).then(() => {
          noti.fire('Eliminado', 'El teléfono fue eliminado con éxito.', 'success');
          getPhones();
        });
      }
    });
  };

  // Set phone as active
  const setPhoneActive = (phoneId) => {
    Axios.put('https://mgbackend-production.up.railway.app/updatePhoneStatus', {
      user_id: userId,
      phone_id: phoneId,
    }).then(() => {
      noti.fire('¡Teléfono activado!', 'El teléfono ahora está activo.', 'success');
      getPhones();
    }).catch((error) => {
      console.error('Error al actualizar el estado del teléfono:', error);
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
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((phone, index) => (
            <tr
              key={phone.id}
            >
              <td 
              className={phone.estado === 'activo' ? 'bg-light' : 'inactivo' ? 'bg-secondary text-white':''}
              >{index + 1}</td>
              <td
              className={phone.estado === 'activo' ? 'bg-light' : 'inactivo' ? 'bg-secondary text-white':''}
              >{phone.telefono}</td>
              <td
              className={phone.estado === 'activo' ? 'bg-light' : 'inactivo' ? 'bg-secondary text-white':''}
              >{phone.estado}</td>
              <td className={phone.estado === 'activo' ? 'bg-light' : 'inactivo' ? 'bg-secondary text-white':''} >
                {phone.estado === 'inactivo' && (
                  <Button variant="success" className="me-2" onClick={() => setPhoneActive(phone.id)}>
                    Activar
                  </Button>
                )}
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
