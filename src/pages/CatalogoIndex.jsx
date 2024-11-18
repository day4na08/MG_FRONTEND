import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import azulFrente from '../images/azulFrente.png';
import azulperfil from '../images/azulPerfil.png';
import azulOfrente from '../images/azulOfrente.png'; 
import azulOperfil from '../images/azulOperfil.png';
import cafeFrente from '../images/cafeFrente.png';
import cafePerfil from '../images/cafePerfil.png';
import grisFrente from '../images/grisFrente.png';
import grisPerfil from '../images/grisPerfil.png';
import negroPerfil from '../images/negroPerfil.png';
import negroFrente from '../images/negroFrente.png';
import sAclaroFrente from '../images/sAclaroFrente.png';
import sAclaroPerfil from '../images/sAclaroFrente.png';
import sazulFrente from '../images/sazulFrente.png';
import sazulPerfil from '../images/sazulPerfil.png';
import sgrisFrente from '../images/sgrisFrente.png';
import sgrisPerfil from '../images/sgrisPerfil.png';
import snegroPerfil from '../images/snegroPerfil.png';
import snegroFrente from '../images/snegroFrente.png';
import srojoFrente from '../images/srojoFrente.png';
import srojoPerfil from '../images/srojoPerfil.png';
import sblancoPerfil from '../images/sblancoPerfil.png';
import sblancoFrente from '../images/sblancoFrente.png';
import unoPuntoUno from '../images/1.1.png';
import unoPuntoDos from '../images/1.2.png';
import dosUno from '../images/2.1.png';
import dosDos from '../images/2.2.png';
import tresUno from '../images/3.1.png';
import tresDos from '../images/3.2.png';
import cuatroUno from '../images/4.1.png';
import cuatroDos from '../images/4.2.png';
import cincoUno from '../images/5.1.png';
import cincoDos from '../images/5.2.png';
import frente from '../images/frente-removebg-preview.png';
import perfil from '../images/perfil-removebg-preview.png';
import Hover from '../images/hover.png';
import Default from '../images/default.png';
import closetF1 from '../images/closetF1.png';
import closetP1 from '../images/closetP1.png';
import closetF2 from '../images/closetF2.png';
import closetP2 from '../images/closetP2.png';
import closetF3 from '../images/closetF3.png';
import closetP3 from '../images/closetP3.png';
import fala from '../images/ultimo1.png';
import pala from '../images/ultimo2.png';
import v1 from '../images/v1.png';
import v11 from '../images/v11.png';
import v2 from '../images/v2.png';
import v22 from '../images/v22.png';
import v3 from '../images/v33.png';
import v33 from '../images/v33.png';
import k33 from '../images/k33.png';
import k3 from '../images/k3.png';
import k22 from '../images/k22.png';
import k2 from '../images/k2.png';
import k1 from '../images/k1.png';
import k11 from '../images/k11.png';

const products = [
  {
    id: 1,
    name: "Sala En L Sofá Cama Multifuncional",
    price: 1200000,
    discountPrice: 1400000,
    discount: 19,
    description: "Ideal para espacios pequeños. Puede usarse tanto como sofá de sala como cama adicional, con un diseño moderno y práctico.",
    colors: {
      blanco: {
        default: azulFrente,
        hover: azulperfil, 
        hex: "#387f9c", 
      },
      cafe: {
        default: cafeFrente,
        hover: cafePerfil,
        hex: "#8B4513", 
      },
      negro: {
        default: negroFrente,
        hover: negroPerfil,
        hex: "#000000", 
      },
      gris: {
        default: grisFrente,
        hover: grisPerfil,
        hex: "#afb0b1", 
      },
      AzulOscuro: {
        default: azulOfrente,
        hover: azulOperfil,
        hex: "#264563", 
      },
    },
    defaultColor: "blanco",
  },
  {
    id: 2,
    name: "Sillón individual",
    price: 950000,
    discountPrice: 1100000,
    discount: 19,
    description: "Sillón individual de tamaño compacto, ideal para espacios pequeños o como asiento extra.",
    colors: {
      blanco: {
        default: sAclaroFrente,
        hover: sAclaroPerfil, 
        hex: "#387f9c", 
      },
      cafe: {
        default: sazulFrente,
        hover: sazulPerfil,
        hex: "#172554", 
      },
      negro: {
        default: sblancoFrente,
        hover: sblancoPerfil,
        hex: "#ffffff", 
      },
      gris: {
        default: sgrisFrente,
        hover: sgrisPerfil,
        hex: "#afb0b1", 
      },
      AzulOscuro: {
        default: snegroFrente,
        hover: snegroPerfil,
        hex: "#0c0c0c", 
      },
      rojo: {
        default: srojoFrente,
        hover: srojoPerfil,
        hex: "#802635", 
      },
    },
    defaultColor: "rojo",
  },
  {
    id: 3,
    name: "Sofá Cama en L",
    price: 1500050,
    discountPrice: 1900000,
    discount: 19,
    description: "Sofá modular con varias secciones, configurable para adaptarse a diferentes espacios.",
    colors: {
      blanco: {
        default: frente,
        hover: perfil, 
        hex: "#b1b19e", 
      },
    },
    defaultColor: "blanco",
  },
  {
    id: 4,
    name: "Sofá Curvo - Tela antifluidos",
    price: 950000,
    discountPrice: 1100000,
    discount: 19,
    description: "Sofá curvo de diseño moderno, ideal para salas de estar con un toque contemporáneo.",
    colors: {
      blanco: {
        default: unoPuntoUno,
        hover: unoPuntoDos, 
        hex: "#7ba4d0", 
      },
      gris: {
        default: dosUno,
        hover: dosDos, 
        hex: "#b1b19e", 
      },
      cafe: {
        default: tresUno,
        hover: tresDos, 
        hex: "#80b38c", 
      },
      verde: {
        default: cuatroUno,
        hover: cuatroDos, 
        hex: "#c6c6c6", 
      },
      negro: {
        default: cincoUno,
        hover: cincoDos, 
        hex: "#b2703b", 
      },
    },
    defaultColor: "blanco",
  },
  {
    id: 5,
    name: "Juego de Comedor ",
    price: 950000,
    discountPrice: 1100000,
    discount: 19,
    description: "Juego de comedor para cuatro personas con sillas y mesa de estilo escandinavo.",
    colors: {
      blanco: {
        default: Default,
        hover: Hover, 
        hex: "#ae9079", 
      },
    },
    defaultColor: "blanco",
  },
  {
    id: 6,
    name: "Estante de Pared ",
    price: 950000,
    discountPrice: 1100000,
    discount: 19,
    description: "Estantería modular con espacio para almacenamiento, ideal para oficinas o salas de estar.",
    colors: {
      blanco: {
        default: closetF1,
        hover: closetP1, 
        hex: "#ae9079", 
      },
      cafe1: {
        default: closetF2,
        hover: closetP2, 
        hex: "#42342a", 
      },
      blanco1: {
        default: closetF3,
        hover: closetP3, 
        hex: "#cfbfab", 
      },
    },
    defaultColor: "cafe1",
  },
  {
    id: 7,
    name: "Seccional de Esquina",
    price: 950000,
    discountPrice: 1100000,
    discount: 19,
    description: "Sofá seccional de esquina con cojines grandes y cómodos, ideal para familias grandes o salas de estar amplias.",
    colors: {
      blanco: {
        default: fala,
        hover: pala, 
        hex: "#e7dfd5", 
      },
    },
    defaultColor: "blanco",
  },
  {
    id: 8,
    name: "Seccional de Esquina",
    price: 950000,
    discountPrice: 1100000,
    discount: 19,
    description: "Sofá seccional de esquina con cojines grandes y cómodos, ideal para familias grandes o salas de estar amplias.",
    colors: {
      blanco: {
        default: v1,
        hover: v11, 
        hex: "#dad8d5", 
      },
      azul: {
        default: v2,
        hover: v22, 
        hex: "#d0b387", 
      },
      amarillo: {
        default: v3,
        hover: v33, 
        hex: "#94c6bc", 
      },
    },
    defaultColor: "blanco",
  },
  {
    id: 9,
    name: "Seccional de Esquina",
    price: 950000,
    discountPrice: 1100000,
    discount: 19,
    description: "Sofá seccional de esquina con cojines grandes y cómodos, ideal para familias grandes o salas de estar amplias.",
    colors: {
      blanco: {
        default: k1,
        hover: k11, 
        hex: "#e7dfd5", 
      },
      azul: {
        default: k2,
        hover: k22, 
        hex: "#9dd3d9", 
      },
      gris: {
        default: k3,
        hover: k33, 
        hex: "#727373", 
      },
    },
    defaultColor: "gris",
  },
];

const ProductCatalog = () => {
  const [selectedColors, setSelectedColors] = useState({});
  const [hoveredImages, setHoveredImages] = useState({});
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleColorSelect = (productId, color) => {
    setSelectedColors(prev => ({...prev, [productId]: color}));
    setHoveredImages(prev => ({...prev, [productId]: null}));
  };

  const handleMouseEnter = (productId, color) => {
    setHoveredImages(prev => ({
      ...prev,
      [productId]: products.find(p => p.id === productId).colors[color].hover,
    }));
  };

  const handleMouseLeave = (productId) => {
    setHoveredImages(prev => ({...prev, [productId]: null}));
  };

  const handleViewClick = (productId) => {
    navigate('/Catalog'); // Redirige al componente Catalogo
  };

  return (
    <div style={styles.catalogContainer}>
      {products.map((product) => {
        const selectedColor = selectedColors[product.id] || product.defaultColor;
        const currentImage = hoveredImages[product.id] || product.colors[selectedColor].default;

        return (
          <div key={product.id} style={styles.productCard}>
            <div
              style={{
                ...styles.productImage,
                backgroundImage: `url(${currentImage})`,
              }}
              onMouseEnter={() => handleMouseEnter(product.id, selectedColor)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            />
            <div style={styles.productInfo}>
              <h5 style={{ ...styles.productName, textAlign: 'center' }}>{product.name}</h5>
              <p style={styles.productDescription}>{product.description}</p>
              <div style={styles.priceContainer}>
                <span style={styles.discountPrice}>${product.discountPrice.toLocaleString()}</span>
                <span style={styles.price}>${product.price.toLocaleString()}</span>
              </div>
              <div style={styles.colorOptionsContainer}>
                {Object.keys(product.colors).map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(product.id, color)}
                    style={{
                      ...styles.colorButton,
                      backgroundColor: product.colors[color].hex,
                      border: selectedColor === color ? '2px solid #000' : 'none',
                    }}
                  />
                ))}
              </div>
              <button 
                style={styles.addToCartButton}
                onClick={() => handleViewClick(product.id)} // Agrega la función al botón
              >
                ver
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  catalogContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    width: '300px',
    height: '500px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  productInfo: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
    flexGrow: 1,
  },
  priceContainer: {
    marginBottom: '10px',
  },
  discountPrice: {
    textDecoration: 'line-through',
    color: '#888',
    marginRight: '10px',
  },
  price: {
    fontWeight: 'bold',
    color: '#e67e22',
  },
  colorOptionsContainer: {
    display: 'flex',
    justifyContent: 'left',
    marginBottom: '15px',
  },
  colorButton: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: 'none',
    margin: '0 5px',
    cursor: 'pointer',
    boxShadow: '0 0 3px rgba(0,0,0,0.3)',
  },
  addToCartButton: {
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: 'auto',
  },
};

export default ProductCatalog;

