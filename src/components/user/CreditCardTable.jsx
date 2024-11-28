import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Form } from 'react-bootstrap';

function CreditCardManagement() {
  const cookies = new Cookies();
  const userId = cookies.get('id');
  const [numero, setNumero] = useState('');
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('inactiva');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [creditCards, setCreditCards] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const noti = withReactContent(Swal);

  const getCards = () => {
    Axios.get(`https://mgbackend-production.up.railway.app/creditCards/${userId}`).then((response) => {
      setCreditCards(response.data);
    });
  };

  const addCard = () => {
    Axios.post('http://localhost:5001/createCreditCard', {
      numero: numero,
      nombre: nombre,
      fecha_vencimiento: fechaVencimiento,
      codigo_seguridad: codigoSeguridad,
      user_id: userId,
      estado:estado,
    }).then(() => {
      noti.fire('¡Tarjeta añadida!', 'La tarjeta fue registrada con éxito.', 'success');
      getCards();
      closeModal();
    });
  };

  const updateCard = () => {
    Axios.put('http://localhost:5001/updateCreditCard', {
      id: id,
      numero: numero,
      nombre: nombre,
      fecha_vencimiento: fechaVencimiento,
      codigo_seguridad: codigoSeguridad,
      estado:estado
    }).then(() => {
      noti.fire('¡Actualizado!', 'Los datos de la tarjeta se actualizaron correctamente.', 'success');
      getCards();
      closeModal();
    });
  };

  const deleteCard = (cardId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarla',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://mgbackend-production.up.railway.app/deleteCreditCard/${cardId}`).then(() => {
          noti.fire('Eliminada', 'La tarjeta fue eliminada con éxito.', 'success');
          getCards();
        });
      }
    });
  };

  const setCardActive = (phoneId) => {
    Axios.put('http://localhost:5001/updateCardStatus', {
      user_id: userId,
      card_id: phoneId,
    }).then(() => {
      noti.fire('¡Teléfono activado!', 'El teléfono ahora está activo.', 'success');
      getCards();
    }).catch((error) => {
      console.error('Error al actualizar el estado del teléfono:', error);
    });
  };
  const openModal = (card = null) => {
    if (card) {
      setEditar(true);
      setNumero(card.numero);
      setNombre(card.nombre);
      setFechaVencimiento(card.fecha_vencimiento);
      setCodigoSeguridad(card.codigo_seguridad);
      setId(card.id);
    } else {
      setEditar(false);
      setNumero('');
      setNombre('');
      setFechaVencimiento('');
      setCodigoSeguridad('');
      setId('');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="container">
      <h5>Tarjetas de Crédito</h5>
      <Button variant="success" onClick={() => openModal()}>
        Agregar Tarjeta
      </Button>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Número</th>
            <th>Nombre</th>
            <th>Fecha de Vencimiento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {creditCards.map((card, index) => (
            <tr key={card.id}>
              <td>{index + 1}</td>
              <td>**** **** **** {card.numero.slice(-4)}</td>
              <td>{card.nombre}</td>
              <td>{card.fecha_vencimiento}</td>
              <td>
                <Button 
                  variant={card.estado === 'activa' ? 'success' : 'secondary'} 
                  onClick={() => setCardActive(card.id, card.estado)}>
                  {card.estado === 'inactiva' ? 'inactiva' : 'Activa'}
                </Button>
              </td>
              <td>
              {card.estado === 'inactivo' && (
                  <Button variant="success" className="me-2" onClick={() => setCardActive(card.id)}>
                    Activar
                  </Button>
                )}
                <Button variant="warning" className="me-2" onClick={() => openModal(card)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => deleteCard(card.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editar ? 'Editar Tarjeta' : 'Agregar Tarjeta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNumero">
              <Form.Label>Número de Tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número de la tarjeta"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre en la Tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre en la tarjeta"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFechaVencimiento">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control
                type="date"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCodigoSeguridad">
              <Form.Label>Código de Seguridad (CVV)</Form.Label>
              <Form.Control
                type="text"
                placeholder="CVV"
                value={codigoSeguridad}
                onChange={(e) => setCodigoSeguridad(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={editar ? updateCard : addCard}>
            {editar ? 'Actualizar Tarjeta' : 'Agregar Tarjeta'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreditCardManagement;
