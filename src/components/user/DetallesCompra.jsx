import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetallesCompra = ({ show, handleClose, purchase }) => {
  if (!purchase) {
    return null; // Early return if no purchase is available
  }

  const { id, user = {}, products = {} } = purchase;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Compra ID: {id || 'Desconocida'}</h4>
        <p>Comprador: {user.nombre || 'Desconocido'}</p>
        <h5>Productos:</h5>
        <ul>
          {Object.keys(products).length > 0 ? (
            Object.keys(products).map((productKey) => {
              const product = products[productKey];
              return (
                <li key={product.productId}>
                    <p>Creador: {product.autor}</p>
                  <p>Producto: {product.nombre}</p>
                  <p>Precio: ${product.precio}</p>
                  <p>Cantidad: {product.cantidad}</p>
                </li>
              );
            })
          ) : (
            <p>No hay productos para mostrar.</p>
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetallesCompra;
