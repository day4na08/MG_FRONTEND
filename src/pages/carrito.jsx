import React, { useContext, useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartContext } from '../components/CartContext';
import CheckoutForm from './Checkout';
import '../css/Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Carrito = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const handlePurchaseComplete = () => {
    console.log('Compra completada');
    setShowModal(false); // Cerrar el modal después de la compra
  };

  return (
    <div className="cart-page">
      <NavBar />
  
      <div className="contentCart">
        <div className="CartContent">
          <h2>Tu Carrito de Compras</h2>
          
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <img src={item.imagen1} alt={item.nombre} className="cart-item-image" />
                    <div>
                      <h3>{item.nombre}</h3>
                      <p>Cantidad: {item.quantity}</p>
                      <p>Precio: ${item.precio.toFixed(2)}</p>
                      <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </button>
                </div>
              ))}

              <div className="cart-summary">
                <h3>Total: ${total}</h3>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Confirmar Compra
                </Button>
              </div>
            </div>
          )}

          {/* Modal de Bootstrap para el formulario de compra */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Detalles de la Compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CheckoutForm onPurchaseComplete={handlePurchaseComplete} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
      
      <div className="footercart">
        <Footer />
      </div>
    </div>
  );
};

export default Carrito;
