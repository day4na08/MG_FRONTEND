import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal, Row, Col } from 'react-bootstrap';
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
      <h2 className="mb-4 text-center">Historial de Compras</h2>

      {purchases.length > 0 ? (
        <div className="d-flex flex-wrap gap-4">
          {purchases.map((purchase) => (
            <Card
              key={purchase.id_compra}
              className="purchase-card shadow-lg border-light rounded-lg p-3"
              style={{
                width: '18rem',
                borderRadius: '10px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-uppercase">{purchase.id_compra}</h5>
                  <p className="text-muted">{purchase.name_user}</p>
                  <p className="text-muted">{purchase.fecha_compra}</p>
                </div>
                <div className="d-flex justify-content-end">
                  <img
                    src={purchase.img1Product} // Asegúrate de que el campo de imagen exista
                    alt={purchase.name_product}
                    style={{
                      width: '100px',
                      height: '130px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>
              </Card.Header>
              <Card.Body>
                <h5 className="card-title">{purchase.name_product}</h5>
                <p>
                  <strong>Precio:</strong> ${purchase.precio}
                </p>
                <p>
                  <strong>Cantidad:</strong> {purchase.cant_comprada}
                </p>
                <p>
                  <strong>Categoría:</strong> {purchase.categoria_product}
                </p>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button
                  variant="primary"
                  onClick={() => handleShowDetails(purchase)}
                  className="me-2 w-100"
                  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                >
                  Ver Detalles
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleProductClick(purchase.producto_id)}
                  className="w-100 mt-2"
                >
                  Ir al Producto
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : (
        <p>No tienes compras registradas.</p>
      )}

      {/* Modal para mostrar detalles de la compra */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPurchase ? (
            <Row>
              {/* Información de la compra */}
              <Col md={8}>
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
              </Col>

              {/* Imagen del producto */}
              <Col md={4} className="d-flex justify-content-center align-items-center">
                <img
                  src={selectedPurchase.img1Product} // Asegúrate de que el campo de imagen exista
                  alt={selectedPurchase.name_product}
                  style={{
                    width: '180px',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  }}
                />
              </Col>
            </Row>
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
