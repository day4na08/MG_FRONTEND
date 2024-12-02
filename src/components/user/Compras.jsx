import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Compras = () => {
  // State para almacenar las compras del usuario
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null); // Compra seleccionada
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  const cookies = new Cookies();
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const userId = cookies.get('id'); // Obtiene el ID del usuario desde las cookies

  // Función para obtener las compras del usuario desde la API
  const getPurchases = () => {
    axios
      .get(`https://mgbackend-production.up.railway.app/compras/${userId}`)
      .then((response) => {
        setPurchases(response.data);
      })
      .catch((error) => {
        console.error(
          'Error al obtener las compras:',
          error.response ? error.response.data : error.message
        );
      });
  };

  // Usar useEffect para obtener las compras cuando el componente se monta
  useEffect(() => {
    if (userId) {
      getPurchases();
    }
  }, [userId]);

  // Función para manejar la selección de una compra y mostrar el modal
  const handleShowDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPurchase(null);
  };

  // Función para manejar el clic en un producto y navegar a su página de detalles
  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Historial de Compras</h2>

      <h3 className="mb-3">Lista de Compras</h3>
      <div className="d-flex flex-wrap gap-3">
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <Card
              key={purchase.id_compra}
              className="purchase-card shadow-sm border-light rounded"
              style={{ width: '18rem' }}
            >
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-1">Compra ID: {purchase.id_compra}</h4>
                  <p className="mb-0">Comprador: {purchase.name_user}</p>
                  <p className="mb-0">Fecha: {purchase.fecha_compra}</p>
                </div>
              </Card.Header>
              <Card.Body>
                <h5>Producto: {purchase.name_product}</h5>
                <p>
                  <strong>Precio:</strong> ${purchase.precio}
                </p>
                <p>
                  <strong>Cantidad:</strong> {purchase.cant_comprada}
                </p>
                <p>
                  <strong>Categoría:</strong> {purchase.categoria_product}
                </p>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetails(purchase)}
                >
                  Ver Detalles
                </Button>
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={() => handleProductClick(purchase.producto_id)}
                >
                  Ir al Producto
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No tienes compras registradas.</p>
        )}
      </div>

      {/* Modal para mostrar detalles de la compra */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPurchase ? (
            <div>
              <p>
                <strong>Compra ID:</strong> {selectedPurchase.id_compra}
              </p>
              <p>
                <strong>Producto:</strong> {selectedPurchase.name_product}
              </p>
              <p>
                <strong>Precio:</strong> ${selectedPurchase.precio}
              </p>
              <p>
                <strong>Cantidad:</strong> {selectedPurchase.cant_comprada}
              </p>
              <p>
                <strong>Categoría:</strong> {selectedPurchase.categoria_product}
              </p>
              <p>
                <strong>Autor:</strong> {selectedPurchase.autor}
              </p>
              <p>
                <strong>Fecha de Compra:</strong> {selectedPurchase.fecha_compra}
              </p>
              <p>
                <strong>Comprador:</strong> {selectedPurchase.name_user}
              </p>
              <p>
                <strong>Producto ID:</strong> {selectedPurchase.producto_id}
              </p>
            </div>
          ) : (
            <p>No se encontraron detalles para esta compra.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Compras;
