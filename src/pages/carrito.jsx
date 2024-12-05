import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import NavBar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { CartContext } from '../components/CartContext';
import CheckoutForm from './Checkout';
import '../css/Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Carrito = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  // Calcular el total de la compra
  const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);

  // Función para eliminar un artículo del carrito
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Manejar la finalización de la compra
  const handlePurchaseComplete = () => {
    Swal.fire({
      title: '¡Compra finalizada!',
      text: 'Gracias por tu compra. Recibirás un correo con los detalles.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    setCartItems([]); // Vaciar el carrito
    setShowCheckout(false); // Regresar al carrito
  };

  // Función para mostrar un extracto de la descripción
  const getDescriptionExcerpt = (description) => {
    const maxLength = 50;
    return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
  };

  return (
    <>
      <div className="cart-page">
        <NavBar />

        <div className="contentCart">
          {showCheckout ? (
            // Sección de Checkout
            <div className="checkout-section">
              <h2>Detalles de la Compra</h2>
              <div className="checkout-container">
                {/* Columna para los productos del carrito */}
                <div className="checkout-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-modal">
                      <img src={item.imagen1} alt={item.name} className="cart-item-image-modal" />
                      <div>
                        <h5>{item.name}</h5>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Columna para el formulario de checkout */}
                <div className="checkout-form">
                  <CheckoutForm cartItems={cartItems} onPurchaseComplete={handlePurchaseComplete}  />
                </div>
              </div>
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setShowCheckout(false)}
              >
                Regresar al carrito
              </button>
            </div>
          ) : (
            // Sección del carrito
            <div className="CartContent">
              <h2>Tu Carrito de Compras</h2>
              {cartItems.length === 0 ? (
                <div><p>Tu carrito está vacío.</p>
                  <Link to="/Catalog" className="btn btn-outline-dark" style={{ padding: '10px', marginBottom: '7pc' }}>
                    <i className="bx bx-chevron-left"></i> Ver más productos
                  </Link>
                  
                </div>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.imagen1} alt={item.name} className="cart-item-image" />
                      </div>
                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>{getDescriptionExcerpt(item.descripcion)}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio: ${item.precio.toFixed(2)}</p>
                        <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        Eliminar
                      </button>
                    </div>
                  ))}

                  {/* Resumen de la compra */}
                  <div className="cart-summary">
                    <h3>Total: ${total}</h3>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowCheckout(true)}
                    >
                      Confirmar Compra
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Carrito;
