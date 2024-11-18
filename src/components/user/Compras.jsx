import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Accordion, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DetallesCompra from './DetallesCompra.jsx'; // Ensure this path is correct
import Cookies from 'universal-cookie';

const Compras = () => {
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const userId = cookies.get('id');
      if (!userId) {
        console.error('User ID not found in cookies');
        return;
      }
  
      const response = await axios.get('https://mgbackend-production.up.railway.app/purchases');
      if (response.status === 200) {
        const userPurchases = response.data.filter(purchase => purchase.user.IdUser.toString() === userId.toString());
        setPurchases(userPurchases);
      } else {
        console.error('Failed to fetch purchases:', response.statusText);
      }
    } catch (error) {
      console.error('Error al encontrar la compra:', error);
    }
  };
  
  const handleShowDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPurchase(null);
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Historial de Compras</h2>

      <h3 className="mb-3">Lista de Compras</h3>
      <div className="d-flex flex-wrap gap-3">
        {purchases.map(purchase => (
          <Card key={purchase.id} className="purchase-card shadow-sm border-light rounded">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">Compra ID: {purchase.id}</h4>
                <p className="mb-0">Comprador: {purchase.user.nombre}</p>
              </div>
              <Button variant="primary" onClick={() => handleShowDetails(purchase)}>
                Ver Más Detalles
              </Button>
            </Card.Header>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Ver Productos</Accordion.Header>
                <Accordion.Body className="p-3">
                  {Object.keys(purchase.products).map((productKey) => {
                    const product = purchase.products[productKey];
                    return (
                      <Card
                        key={product.productId}
                        className="mb-3 product-card border-light shadow-sm"
                        onClick={() => handleProductClick(product.productId)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Card.Body>
                          <Card.Title>{product.nombre}</Card.Title>
                          <Card.Text>Precio: ${product.precio}</Card.Text>
                          <Card.Text>Cantidad: {product.cantidad}</Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        ))}
      </div>

      {selectedPurchase && (
        <DetallesCompra
          show={showModal}
          handleClose={handleCloseModal}
          purchase={selectedPurchase}
        />
      )}
    </div>
  );
};

export default Compras;
