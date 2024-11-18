import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../components/CartContext';
import Cookies from 'universal-cookie';
import '../css/FormularioCompra.css';

const CheckoutForm = ({ onPurchaseComplete }) => {
    const cookies = new Cookies();
    const { cartItems, setCartItems } = useContext(CartContext);
    const [userData, setUserData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        tarjeta: '',
        vencimiento: '',
        cvv: ''
    });
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState('');
    const [cvvError, setCvvError] = useState('');

    useEffect(() => {
        const userId = cookies.get('id');
        if (userId) {
            axios.get(`http://localhost:3001/users/${userId}`)
                .then(response => {
                    const user = response.data;
                    setUserData({
                        nombre: user.username,
                        email: user.email,
                        telefono: user.telefonos?.telefono1 || '',
                        direccion: user.direcciones?.direccion1 || '',
                        ciudad: '',
                        codigoPostal: '',
                        tarjeta: user.tarjetasDeCredito?.tarjeta1?.numero || '',
                        vencimiento: user.tarjetasDeCredito?.tarjeta1?.fechaVencimiento || '',
                        cvv: user.tarjetasDeCredito?.tarjeta1?.codigoSeguridad || ''
                    });
                })
                .catch(error => console.error('Error al obtener datos del usuario:', error));
        }
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
        setCardError('');
        setCvvError('');
    };

    const validateCard = (cardNumber) => {
        const cleaned = cardNumber.replace(/\D/g, '');
        return cleaned.length >= 13 && cleaned.length <= 19 ? '' : 'El número de tarjeta debe tener entre 13 y 19 dígitos.';
    };

    const validateCvv = (cvv) => (cvv.replace(/\D/g, '').length === 3 ? '' : 'El CVV debe tener exactamente 3 dígitos.');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const cardValidationError = validateCard(userData.tarjeta);
        const cvvValidationError = validateCvv(userData.cvv);
        
        if (cardValidationError) {
            setCardError(cardValidationError);
            setLoading(false);
            return;
        }
        if (cvvValidationError) {
            setCvvError(cvvValidationError);
            setLoading(false);
            return;
        }

        try {
            if (cartItems.length === 0) {
                alert('El carrito está vacío. Por favor, agrega productos antes de comprar.');
                setLoading(false);
                return;
            }

            // Lógica para completar la compra...
            alert('Compra realizada con éxito');
            setCartItems([]);
            onPurchaseComplete();
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            alert('Hubo un error al completar la compra.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="checkout-form row" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="col-12 mb-4">Detalles de la Compra</h2>

            <div className="col-md-6 form-group">
                <label>Nombre Completo:</label>
                <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} placeholder="Tu nombre completo" required />
            </div>
            
            <div className="col-md-6 form-group">
                <label>Email:</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Tu correo electrónico" required />
            </div>

            <div className="col-md-6 form-group">
                <label>Teléfono:</label>
                <input type="tel" name="telefono" value={userData.telefono} onChange={handleChange} placeholder="Su número de teléfono" required />
            </div>

            <div className="col-md-6 form-group">
                <label>Ciudad:</label>
                <input type="text" name="ciudad" value={userData.ciudad} onChange={handleChange} placeholder="Ciudad" required />
            </div>

            <div className="col-md-6 form-group">
                <label>Código Postal:</label>
                <input type="text" name="codigoPostal" value={userData.codigoPostal} onChange={handleChange} placeholder="Su código postal" required />
            </div>

            <div className="col-md-6 form-group">
                <label>Dirección:</label>
                <input type="text" name="direccion" value={userData.direccion} onChange={handleChange} placeholder="Su dirección de envío" required />
            </div>

            <div className="col-md-6 form-group">
                <label>Tarjeta de Crédito:</label>
                <input type="text" name="tarjeta" value={userData.tarjeta} onChange={handleChange} placeholder="Número de la tarjeta" required maxLength={19} pattern="\d*" />
                {cardError && <div className="error">{cardError}</div>}
            </div>

            <div className="col-md-3 form-group">
                <label>Vencimiento:</label>
                <input type="text" name="vencimiento" value={userData.vencimiento} onChange={handleChange} placeholder="MM/AA" required />
            </div>

            <div className="col-md-3 form-group">
                <label>CVV:</label>
                <input type="text" name="cvv" value={userData.cvv} onChange={handleChange} placeholder="CVV" required maxLength={3} />
                {cvvError && <div className="error">{cvvError}</div>}
            </div>

            <div className="col-12">
                <button type="submit" className="submit-btn btn btn-primary" disabled={loading}>
                    {loading ? 'Procesando...' : 'Confirmar Compra'}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
