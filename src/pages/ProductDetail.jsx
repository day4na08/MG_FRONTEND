import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { CartContext } from '../components/CartContext.jsx';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const [activeSection, setActiveSection] = useState('descripcion');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/llamarProducto/${id}`);
        setProducto(response.data);
        setSelectedImage(response.data.imagen1 || '');
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>No product found.</p>;

  const handleAddToCart = () => {
    const productWithQuantity = { ...producto, quantity: cantidad };
    addToCart(productWithQuantity);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setCantidad(Math.max(newQuantity, 1));
  };

  const showSection = (sectionId) => setActiveSection(sectionId);

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          {/* Image and Thumbnails */}
          <div className="col-md-6">
            <div className="product-image">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={producto.name}
                  className="img-fluid"
                />
              ) : (
                <iframe
                  title="Modelo Sketchfab"
                  width="100%"
                  height="480"
                  src={`https://sketchfab.com/models/${producto.imagen3D}/embed`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="mt-2 d-flex">
              {[producto.imagen1, producto.imagen2, producto.imagen3, producto.imagen4]
                .filter(img => img)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-thumbnail me-2"
                    style={{ width: '100px', cursor: 'pointer' }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              <div
                className="img-thumbnail me-2"
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={() => setSelectedImage('')}
              >
                <h6>___3D___</h6>
              </div>
            </div>
          </div>

          {/* Product Info and Cart */}
          <div className="col-md-6">
            <h1>{producto.name}</h1>
            <p>{producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio.toFixed(2)}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-primary me-2" onClick={handleAddToCart}>Agregar al carrito</button>
              <div className="input-group" style={{ width: '180px', padding: '10px' }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setCantidad(Math.max(cantidad - 1, 1))}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={cantidad}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button className="btn btn-outline-secondary" onClick={() => setCantidad(cantidad + 1)}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Sections */}
        <div className="my-4">
          <div className="btn-group" role="group">
            <button className="btn btn-outline-dark" onClick={() => showSection('descripcion')}>Descripción</button>
            <button className="btn btn-outline-dark" onClick={() => showSection('garantia')}>Garantía</button>
            <button className="btn btn-outline-dark" onClick={() => showSection('tips')}>TIPS de Cuidado</button>
          </div>

          <div className="mt-3">
            {activeSection === 'descripcion' && (
              <div>
                <h3>{producto.name}</h3>
                <table className="table">
                  <thead>
                    <tr><th>Campo</th><th>Valor</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Estilo</td><td>{producto.estilo}</td></tr>
                    <tr><td>Peso Neto</td><td>{producto.pesoNeto}</td></tr>
                    <tr><td>Material</td><td>{producto.material}</td></tr>
                    <tr><td>Color</td><td>{producto.color}</td></tr>
                    <tr><td>Requiere Armado</td><td>{producto.requiereArmado}</td></tr>
                    <tr><td>Alto</td><td>{producto.alto}</td></tr>
                    <tr><td>Ancho</td><td>{producto.ancho}</td></tr>
                    <tr><td>Profundidad</td><td>{producto.profundidad}</td></tr>
                    <tr><td>Material del tapiz</td><td>{producto.tapizMaterial}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeSection === 'garantia' && (
              <div>
                <h2>Garantía</h2>
                <p>La Garantía Estándar de Nuestros Productos es de dos Años.</p>
              </div>
            )}
            {activeSection === 'tips' && (
              <div>
                <h2>TIPS de Cuidado</h2>
                <p>Mantén tus muebles limpios y libres de polvo.</p>
              </div>
            )}
          </div>
        </div>

        {/* Uncomment for Similar Products Section
        <h2>Productos Similares</h2>
        <div className="row">
          {productosSimilares.map((simil, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img src={simil.imagen1} className="card-img-top" alt={simil.name} />
                <div className="card-body">
                  <h5 className="card-title">{simil.name}</h5>
                  <p className="card-text">Precio: ${simil.precio.toFixed(2)}</p>
                  <Link to={`/product/${simil.id}`} className="btn btn-primary">Ver Detalles</Link>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
