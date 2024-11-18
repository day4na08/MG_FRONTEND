import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

const DetallesVenta = ({ show, handleClose, purchase }) => {
  const cookies = new Cookies();
  const userId = cookies.get('id'); // Get the logged-in user's ID

  if (!purchase) {
    return null; // Early return if no purchase is available
  }

  const { id, user = {}, products = {} } = purchase;

  // Filter products to only include those with the matching userId
  const filteredProducts = Object.values(products).filter(product => product.userId.toString() === userId.toString());

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Venta ID: {id || 'Desconocida'}</h4>
        <p>Comprador: {user.nombre || 'Desconocido'}</p>
        <h5>Productos:</h5>
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map(product => (
              <li key={product.productId}>
                <p>Creador: {product.autor}</p>
                <p>Producto: {product.nombre}</p>
                <p>Precio: ${product.precio}</p>
                <p>Cantidad: {product.cantidad}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetallesVenta;
