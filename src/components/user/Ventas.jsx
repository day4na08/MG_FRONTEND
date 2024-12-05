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
  const authorId = cookies.get('id'); // Obtener el ID del vendedor desde las cookies

  // Función para obtener las ventas desde la API
  const fetchSales = async () => {
    try {
      const response = await axios.get(
        `https://mgbackend-production.up.railway.app/ventas/${authorId}`
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
    if (authorId) {
      fetchSales();
    }
  }, [authorId]);

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
        <div className="d-flex flex-wrap gap-4">
          {sales.map((sale) => (
            <Card
              key={sale.id_venta}
              className="sale-card shadow-lg border-light rounded-lg p-3"
              style={{
                width: '18rem',
                borderRadius: '10px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-uppercase">{sale.id_venta}</h5>
                  <p className="text-muted">{sale.name_user}</p>
                  <p className="text-muted">{sale.fecha_compra}</p>
                </div>
                <div className="d-flex justify-content-end">
                  <img
                    src={sale.img1Product} // Asegúrate de que el campo de imagen exista
                    alt={sale.name_product}
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
                <h5 className="card-title">{sale.name_product}</h5>
                <p>
                  <strong>Precio:</strong> ${sale.precio_produt}
                </p>
                <p>
                  <strong>Cantidad:</strong> {sale.cant_comprada}
                </p>
                <p>
                  <strong>Categoría:</strong> {sale.categoria_product}
                </p>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button
                  variant="primary"
                  onClick={() => handleShowDetails(sale)}
                  className="me-2 w-100"
                  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                >
                  Ver Detalles
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleProductClick(sale.producto_id)}
                  className="w-100 mt-2"
                >
                  Ir al Producto
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : (
        <p>No tienes ventas registradas.</p>
      )}

      {/* Modal para mostrar detalles de la venta */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSale ? (
            <div className="d-flex justify-content-between align-items-center">
              {/* Información de la venta */}
              <div style={{ flex: 1, marginRight: '20px' }}>
                <p>
                  <strong>Venta ID:</strong> {selectedSale.id_venta}
                </p>
                <p>
                  <strong>Producto:</strong> {selectedSale.name_product}
                </p>
                <p>
                  <strong>Precio:</strong> ${selectedSale.precio_producto}
                </p>
                <p>
                  <strong>Cantidad:</strong> {selectedSale.cant_comprada}
                </p>
                <p>
                  <strong>Categoría:</strong> {selectedSale.categoria_producto}
                </p>
                <p>
                  <strong>Fecha de Venta:</strong> {selectedSale.fecha_compra}
                </p>
                <p>
                  <strong>Cliente:</strong> {selectedSale.name_user}
                </p>
                <p>
                  <strong>Producto ID:</strong> {selectedSale.producto_id}
                </p>
                <p>
                  <strong>Autor:</strong> {selectedSale.authorId}
                </p>
              </div>

              {/* Imagen del producto */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src={selectedSale.img1Product} // Asegúrate de que el campo de imagen exista
                  alt={selectedSale.name_product}
                  style={{
                    width: '180px',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  }}
                />
              </div>
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
