import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/resultado.css';

function Resultados({ filtros }) {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://mgbackend-production.up.railway.app/llamarProductos');
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
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductos();
  }, [filtros]);

  const handleProductoClick = (producto) => {
    navigate(`/ProductDetail/${producto.id}`);
  };

  return (
    <div className="resultados-container">
      <h3>Resultados de la Búsqueda</h3>
      <div className="resultados-grid">
        {productos.map(producto => {
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

      <style jsx>{`
        .resultados-container {
          padding: 20px;
          text-align: center;
        }

        .resultados-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .producto-card {
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          padding: 15px;
          cursor: pointer;
          text-align: left;
        }

        .producto-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .producto-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .producto-name {
          font-size: 1.2em;
          margin: 10px 0;
          font-weight: bold;
        }

        .producto-precio {
          font-size: 1.1em;
          color: #333;
        }

        .masdetll {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 1em;
          margin-top: 10px;
          transition: background-color 0.3s;
        }

        .masdetll:hover {
          background-color: #0056b3;
        }

        h3 {
          margin: 20px 0;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 1.8em;
        }
      `}</style>
    </div>
  );
}

export default Resultados;
