import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importar Font Awesome si usas npm/yarn
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CatalogoIndex from './CatalogoIndex';
import Promocion from './Promocion';
import Presentacion from '../images/Presentación Emprendimiento Muebles Moderno Beige y Blanco.png';
import Spline from '@splinetool/react-spline';

// Importar las imágenes del carrusel
import carrusel1 from '../images/carrusel1.png';
import carrusel2 from '../images/carrusel2.png';
import carrusel3 from '../images/carrusel3.jpeg';
import carrusel4 from '../images/carrusel4.png';
import carrusel5 from '../images/carrusel5.png';

function Index() {
  // Imágenes del carrusel
  const carouselImages = [carrusel1, carrusel2, carrusel3, carrusel4, carrusel5];

  // Estado para el índice activo del carrusel
  const [activeIndex, setActiveIndex] = useState(0);

  // Maneja el cambio de imagen en el carrusel
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // Estilos en el mismo archivo
  const styles = {
    pageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
    },
    mainContent: {
      flex: '1',
      padding: '10px',
      marginTop: '100px',
    },
    carouselContainer: {
      margin: '0 auto',
      width: '90%',
      position: 'relative',
    },
    carouselItem: {
      height: '700px',
    },
    carouselImage: {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    carouselIndicators: {
      position: 'absolute',
      bottom: '10px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    dot: {
      backgroundColor: '#bbb',
      borderRadius: '50%',
      height: '10px',
      width: '10px',
      margin: '0 5px',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
    },
    dotActive: {
      backgroundColor: '#717171',
    },
    marqueeContainer: {
      backgroundColor: '#1b1b1b',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      width: '100%',
      boxSizing: 'border-box',
      padding: '10px 0',
      position: 'relative',
    },
    marqueeContent: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      animation: 'marquee 30s linear infinite',
      width: '100%',
    },
    marqueeText: {
      padding: '0 20px',
    },
    separator: {
      borderLeft: '2px solid #fff',
      height: '20px',
      margin: '0 20px',
    },
    newsletterContainer: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
    },
    whatsAppButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #25D366, #128C7E)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '90px', // Tamaño más grande
      height: '90px', // Tamaño más grande
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      fontSize: '50px', // Tamaño más grande del ícono
      zIndex: 1000,
    },
    presentationImage: {
      width: '100%',
      height: '900px', // Ajusta la altura aquí
      objectFit: 'cover', // Opcional: ajusta la imagen para cubrir el área sin distorsionarse
      textAlign: 'center',
      marginTop: '70px', // Espacio añadido entre el catálogo y la imagen
    },
    splineContainer: {
      border: '2px solid #ccc', // Borde del recuadro
      borderRadius: '10px', // Bordes redondeados
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra
      padding: '20px', // Espaciado dentro del recuadro
      margin: '40px auto', // Centrado y margen superior e inferior
      width: '80%', // Ancho del recuadro
      height: '600px', // Ajuste de altura del recuadro
      display: 'flex',
      justifyContent: 'center', // Centrar contenido horizontalmente
      alignItems: 'center', // Centrar contenido verticalmente
    },
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Definición de estilos de animación globales */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div style={styles.navbar}>
        <NavBar />
      </div>
     

      <div style={styles.mainContent}>
        {/* Carrusel de imágenes */}
        <div style={styles.carouselContainer}>
          <Carousel
            activeIndex={activeIndex}
            onSelect={handleSelect}
            interval={3000}
            controls={true}
          >
            {carouselImages.map((image, index) => (
              <Carousel.Item key={index} style={styles.carouselItem}>
                <img
                  src={image}
                  alt={`Imagen del Carrusel ${index + 1}`}
                  style={styles.carouselImage}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          
          {/* Indicadores personalizados sincronizados con el carrusel */}
          <ul style={styles.carouselIndicators}>
            {carouselImages.map((_, index) => (
              <li
                key={index}
                style={{
                  ...styles.dot,
                  ...(activeIndex === index ? styles.dotActive : {}),
                }}
                onClick={() => handleSelect(index)}  // Sincronización con el carrusel
              />
            ))}
            
          </ul>
        </div>
        

        {/* Carrusel de Texto con Movimiento Automático */}
        <div style={styles.marqueeContainer}>
          <div style={styles.marqueeContent}>
            {/* Contenido duplicado para que se repita sin vacío */}
            {Array(2)
              .fill()
              .map((_, i) => (
                <React.Fragment key={i}>
                  <div style={styles.marqueeText}>Envío gratis a Bogotá y Soacha</div>
                  <div style={styles.separator}></div>
                  <div style={styles.marqueeText}>Envío gratis a Bogotá y Soacha</div>
                  <div style={styles.separator}></div>
                  <div style={styles.marqueeText}>Envío gratis a Bogotá y Soacha</div>
                  <div style={styles.separator}></div>
                  <div style={styles.marqueeText}>Envío gratis a Bogotá y Soacha</div>
                  <div style={styles.separator}></div>
                  <div style={styles.marqueeText}>Envío gratis a Bogotá y Soacha</div>
                  <div style={styles.separator}></div>
                  <div style={styles.marqueeText}>Envío gratis a Bogotá y Soacha</div>
                  <div style={styles.separator}></div>
                  <div style={styles.marqueeText}>HASTA 50% OFF CON ENVIO GRATIS</div>
                </React.Fragment>
              ))}
              
          </div>
          
        </div>
        <div>
      {/* <Spline scene= "https://prod.spline.design/UBNcBEkIPDAB0DoJ/scene.splinecode"/> */}
        </div>
        <CatalogoIndex style={{ marginBottom: '40px' }} /> {/* Espacio adicional entre el catálogo y la imagen */}

        {/* Imagen de Presentación con enlace */}
        <a href="https://api.whatsapp.com/send/?phone=%2B573125365683&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
          <img
           src={Presentacion}
           alt="Presentación de Muebles"
           style={{ ...styles.presentationImage, marginBottom: '80px' }}  // Espaciado adicional aquí
         />
       </a>
         
        <Promocion />
      
      </div>

      <Footer />

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/+573125365683"  // Reemplaza con tu número de WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsAppButton}
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default Index;
