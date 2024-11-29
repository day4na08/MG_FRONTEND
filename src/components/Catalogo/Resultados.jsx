import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/resultado.css';

function Resultados({ filtros }) {
  const [productos, setProductos] = useState([]);
  const [productosPagina, setProductosPagina] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const productosPorPagina = 12; // Productos por página

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://mgbackend-production.up.railway.app/Catalogo');
        const productosFiltrados = response.data.filter(producto => {
          const cumpleCategoria = !filtros.categoria || producto.categoria === filtros.categoria;
          const cumpleEstilo = !filtros.estilo || producto.estilo === filtros.estilo;
          const cumpleTela = !filtros.tela || producto.tela === filtros.tela;
          const cumpleAcabado = !filtros.acabado || producto.acabado === filtros.acabado;
          const cumpleColor = !filtros.color || producto.color === filtros.color;
          const cumpleTapizMaterial = !filtros.tapizMaterial || producto.tapizMaterial === filtros.tapizMaterial;
          const cumpleMaterialInterno = !filtros.materialInterno || producto.materialInterno === filtros.materialInterno;
          const cumplePrecio = producto.precio >= filtros.minPrecio && producto.precio <= filtros.maxPrecio;

          return cumpleCategoria && cumpleEstilo && cumpleTela && cumpleAcabado && cumpleColor && cumpleTapizMaterial && cumpleMaterialInterno && cumplePrecio;
        });

        setProductos(productosFiltrados);
        setTotalPaginas(Math.ceil(productosFiltrados.length / productosPorPagina)); // Calcular total de páginas
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductos();
  }, [filtros]);

  // Actualiza los productos que se deben mostrar según la página actual
  useEffect(() => {
    const indexOfLast = paginaActual * productosPorPagina;
    const indexOfFirst = indexOfLast - productosPorPagina;
    setProductosPagina(productos.slice(indexOfFirst, indexOfLast));
  }, [paginaActual, productos]);

  const handleProductoClick = (producto) => {
    navigate(`/ProductDetail/${producto.id}`);
  };

  const handlePageChange = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="resultados-container">
      <hr />
      <div className="resultados-grid">
        {productosPagina.map(producto => {
          const imagenPrincipal = producto.imagen1 ? producto.imagen1 : 'default-image-url';
          const precio = typeof producto.precio === 'number' ? producto.precio.toFixed(2) : 'N/A';
          return (
            <div className="producto-card" key={producto.id} onClick={() => handleProductoClick(producto)}>
              <img src={imagenPrincipal} alt={producto.name} className="producto-image" />
              <h4 className="producto-name">{producto.name}</h4>
              <p className="producto-precio">Precio: ${precio}</p>
              <button className='masdetll'>
                <Link className='textodtll' to={`/ProductDetail/${producto.id}`}>
                  Ver más detalles
                </Link>
              </button>
            </div>
          );
        })}
      </div>

      {/* Paginación al pie */}
      <div className="pagination-container text-center mt-4">
        <ul className="pagination" style={{ justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
          <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(paginaActual - 1)} style={buttonStyle}>&laquo;</button>
          </li>
          {[...Array(totalPaginas)].map((_, index) => (
            <li key={index} className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)} style={paginaActual === index + 1 ? activeButtonStyle : buttonStyle}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(paginaActual + 1)} style={buttonStyle}>&raquo;</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#f0f0f0', // Gris claro
  color: '#555555', // Gris oscuro
  border: 'none', // Sin bordes
  boxShadow: 'none', // Sin sombras
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#d6d6d6', // Gris más oscuro para el botón activo
};

export default Resultados;
