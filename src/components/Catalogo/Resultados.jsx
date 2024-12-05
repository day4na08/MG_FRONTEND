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
  
          // Validar el filtro de precios solo si están habilitados (valores definidos)
          const maxPrecio = filtros.maxPrecio && !isNaN(filtros.maxPrecio) ? parseFloat(filtros.maxPrecio) : 100000000;
          const cumplePrecio =
          (filtros.minPrecio === '0' && maxPrecio === '100000000') || // Filtro deshabilitado
            (producto.precio >= (filtros.minPrecio || 0) && producto.precio <= (filtros.maxPrecio || Infinity));
  
          return (
            cumpleCategoria &&
            cumpleEstilo &&
            cumpleTela &&
            cumpleAcabado &&
            cumpleColor &&
            cumpleTapizMaterial &&
            cumpleMaterialInterno &&
            cumplePrecio
          );
        });
  
        setProductos(productosFiltrados);
        setTotalPaginas(Math.ceil(productosFiltrados.length / productosPorPagina));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProductos();
  }, [filtros]);

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
      {productos.length === 0 ? (
        <div className="container-noR">
          <p className="no-resultados">No se encontraron muebles con esas características.</p>
        </div>
      ) : (
        <div className="resultados-grid">
          {productosPagina.map(producto => {
            const imagenPrincipal = producto.imagen1 || 'default-image-url';
            const precio = typeof producto.precio === 'number' ? producto.precio.toFixed(2) : 'N/A';
            return (
              <div className="producto-card" key={producto.id} onClick={() => handleProductoClick(producto)}>
                <img src={imagenPrincipal} alt={producto.name} className="producto-image" />
                <h4 className="producto-name">{producto.name}</h4>
                <p className="producto-precio">Precio: ${precio}</p>
                <button className="masdetll">
                  <Link className="textodtll" to={`/ProductDetail/${producto.id}`}>
                    Ver más detalles
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      )}

<div className="pagination-container text-center mt-4">
  <ul className="pagination justify-content-center">
    <li
      className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}
      style={paginaActual === 1 ? { pointerEvents: 'none', opacity: 0.6 } : {}}
    >
      <button
        className="page-link"
        onClick={() => handlePageChange(paginaActual - 1)}
        style={{
          backgroundColor: '#fff',
          color: '#313131',
          borderColor: '#d6d6d6',
        }}
      >
        &laquo;
      </button>
    </li>
    {[...Array(totalPaginas)].map((_, index) => (
      <li
        key={index}
        className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}
        style={
          paginaActual === index + 1
            ? { backgroundColor: '#6c757d' } // Fondo gris oscuro
            : {}
        }
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(index + 1)}
          style={
            paginaActual === index + 1
              ? {
                  backgroundColor: '#6c757d', // Fondo gris oscuro
                  color: '#fff', // Texto blanco
                  borderColor: '#fff',
                }
              : {
                  color: '#313131', // Texto gris oscuro
                  backgroundColor: '#fff', // Fondo blanco
                  borderColor: '#d6d6d6', // Bordes gris claro
                }
          }
        >
          {index + 1}
        </button>
      </li>
    ))}
    <li
      className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}
      style={paginaActual === totalPaginas ? { pointerEvents: 'none', opacity: 0.6 } : {}}
    >
      <button
        className="page-link"
        onClick={() => handlePageChange(paginaActual + 1)}
        style={{
          backgroundColor: '#fff',
          color: '#313131',
          borderColor: '#d6d6d6',
        }}
      >
        &raquo;
      </button>
    </li>
  </ul>
</div>

    </div>
  );
}

export default Resultados;
