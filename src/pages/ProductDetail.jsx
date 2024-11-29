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
  const [is3DSelected, setIs3DSelected] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Nuevo estado

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await Axios.get(`https://mgbackend-production.up.railway.app/llamarProducto/${id}`);
        setProducto(response.data);
        setSelectedImage(response.data.imagen1 || ''); // Si no hay imagen1, no se selecciona ninguna imagen
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

  const handle3DClick = () => {
    setIs3DSelected(!is3DSelected); // Alternar el estado del 3D
    setSelectedImage(''); // Limpiar imagen seleccionada cuando el usuario elige 3D
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded); // Alternar la visibilidad de la descripción
  };

  return (
    <>
      <NavBar />
      <hr style={{ padding: '10px', marginTop:'4pc' }}/>
      <div className="container mt-5 mb-5"> {/* Aumenta el margen inferior para separar del footer */}
        <div className="row">
          {/* Image and Thumbnails */}
          <div className="col-md-6 d-flex">
            {/* Thumbnails */}
            <div className="d-flex flex-column me-2">
              {[producto.imagen1, producto.imagen2, producto.imagen3, producto.imagen4]
                .filter(img => img) // Solo mostrar imágenes válidas
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-thumbnail mb-2"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              {/* Botón 3D */}
              <button
                className={`btn ${is3DSelected ? 'btn-warning' : 'btn-outline-secondary'} mb-2`}
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={handle3DClick}
              >
                <h6>3D</h6>
              </button>
            </div>

            {/* Product Image */}
            <div className="product-image" style={{ width: '100%', maxHeight: '500px', overflow: 'hidden' }}>
              {is3DSelected && producto.imagen3D ? (
                <iframe
                  title="Modelo Sketchfab"
                  width="100%"
                  height="500px"
                  src={`https://sketchfab.com/models/${producto.imagen3D}/embed`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={selectedImage || producto.imagen1} // Si no se ha seleccionado una imagen, mostrar imagen1
                  alt={producto.name}
                  className="img-fluid"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          {/* Product Info and Cart */}
          <div className="col-md-6">
            <h1>{producto.name}</h1>
            {/* Descripción con "ver más/menos" */}
            <p><i className="bx bx-info-circle"></i> 
              {isDescriptionExpanded ? producto.descripcion : producto.descripcion.slice(0, 500)} 
              {producto.descripcion.length > 500 && (
                <button onClick={toggleDescription} className="btn btn-link p-0">
                  {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </p>
            <hr />
            <p><strong><i className="bx bx-dollar-circle"></i> Precio:</strong> ${producto.precio.toFixed(2)}</p>
            <p><strong><i className="bx bx-category"></i> Categoría:</strong> {producto.categoria}</p>
            <div className="d-flex align-items-center mb-3">
              <button className="btnLR me-2" onClick={handleAddToCart}>
                <i className="bx bx-cart-add"></i> Agregar al carrito
              </button>
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
        <hr style={{ padding: '10px', marginTop:'7pc' }} />
        {/* Product Details Sections */}
        <div className="my-4">
          <div className="btn-group w-100" role="group" style={{ justifyContent: 'center' }}> {/* Centrado de los botones */}
            <button className="btn btn-outline-dark" onClick={() => showSection('descripcion')}>
              <i className="bx bx-book-open"></i> Descripción
            </button>
            <button className="btn btn-outline-dark" onClick={() => showSection('garantia')}>
              <i className="bx bx-shield"></i> Garantía
            </button>
            <button className="btn btn-outline-dark" onClick={() => showSection('tips')}>
              <i className="bx bx-heart"></i> TIPS de Cuidado
            </button>
          </div>
          <hr />
          <div className="mt-3">
            {activeSection === 'descripcion' && (
              <div>
                <h3>{producto.name}</h3>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th><i className="bx bx-cog"></i> Campo</th>
                      <th><i className="bx bx-cogs"></i> Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><i className="bx bx-pencil"></i> Estilo</td><td>{producto.estilo}</td></tr>
                    <tr><td><i className="bx bx-weight"></i> Peso Neto</td><td>{producto.pesoNeto}</td></tr>
                    <tr><td><i className="bx bx-palette"></i> Material</td><td>{producto.material}</td></tr>
                    <tr><td><i className="bx bx-paint"></i> Color</td><td>{producto.color}</td></tr>
                    <tr><td><i className="bx bx-ruler"></i> Medidas</td><td>{producto.alto}x{producto.ancho}x{producto.profundidad} cm</td></tr>
                    <tr><td><i className="bx bx-cube"></i> Requiere armado</td><td>{producto.requiereArmado ? 'Sí' : 'No'}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeSection === 'garantia' && (
              <div>
                <h4>Garantía</h4>
                <p>{producto.garantia}</p>
              </div>
            )}
            {activeSection === 'tips' && (
              <div>
                <h4>Consejos de Cuidado</h4>
                <p>{producto.tipsCuidado}</p>
              </div>
            )}
          </div>
        </div>
                  {/* Product Link */}
  <Link to="/Catalog" className="btn btn-outline-dark" style={{ padding: '10px', marginBottom:'7pc' }}>
    <i className="bx bx-chevron-left"></i> Ver más productos
  </Link >
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
