import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Ventas = () => {
  // Estados para manejar las ventas y el modal
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const userId = cookies.get('id'); // Obtener el ID del vendedor desde las cookies

  // Función para obtener las ventas desde la API
  const fetchSales = async () => {
    try {
      const response = await axios.get(
        `https://mgbackend-production.up.railway.app/ventas/${userId}`
      );
      if (response.status === 200) {
        setSales(response.data);
      }
    } catch (error) {
      console.error(
        'Error al obtener las ventas:',
        error.response ? error.response.data : error.message
      );
    }
  };

  // useEffect para cargar las ventas cuando el componente se monta
  useEffect(() => {
    if (userId) {
      fetchSales();
    }
  }, [userId]);

  // Función para manejar la selección de una venta
  const handleShowDetails = (sale) => {
    setSelectedSale(sale);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSale(null);
  };

  // Función para navegar a los detalles de un producto
  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Historial de Ventas</h2>

      {sales.length > 0 ? (
        <div className="d-flex flex-wrap gap-3">
          {sales.map((sale) => (
            <Card
              key={sale.id_venta}
              className="sale-card shadow-sm border-light rounded"
              style={{ width: '18rem' }}
            >
              <Card.Header>
                <h5>Venta ID: {sale.id_venta}</h5>
                <p>
                  <strong>Cliente:</strong> {sale.cliente_nombre}
                </p>
                <p>
                  <strong>Fecha:</strong> {sale.fecha_venta}
                </p>
              </Card.Header>
              <Card.Body>
                <h5>{sale.producto_nombre}</h5>
                <p>
                  <strong>Precio:</strong> ${sale.precio}
                </p>
                <p>
                  <strong>Cantidad:</strong> {sale.cantidad_vendida}
                </p>
                <p>
                  <strong>Categoría:</strong> {sale.categoria}
                </p>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetails(sale)}
                  className="me-2"
                >
                  Ver Detalles
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleProductClick(sale.producto_id)}
                >
                  Ir al Producto
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No tienes ventas registradas.</p>
      )}

      {/* Modal para mostrar detalles de la venta */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSale ? (
            <div>
              <p>
                <strong>Venta ID:</strong> {selectedSale.id_venta}
              </p>
              <p>
                <strong>Producto:</strong> {selectedSale.producto_nombre}
              </p>
              <p>
                <strong>Precio:</strong> ${selectedSale.precio}
              </p>
              <p>
                <strong>Cantidad:</strong> {selectedSale.cantidad_vendida}
              </p>
              <p>
                <strong>Categoría:</strong> {selectedSale.categoria}
              </p>
              <p>
                <strong>Fecha de Venta:</strong> {selectedSale.fecha_venta}
              </p>
              <p>
                <strong>Cliente:</strong> {selectedSale.cliente_nombre}
              </p>
              <p>
                <strong>Producto ID:</strong> {selectedSale.producto_id}
              </p>
              <p>
                <strong>Autor:</strong> {selectedSale.autor}
              </p>
            </div>
          ) : (
            <p>No se encontraron detalles para esta venta.</p>
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

export default Ventas;
