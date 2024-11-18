import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const PromocionMuebles = () => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const goToUbicanos = () => {
    navigate('/ubicanos'); // Redirigir al componente "Ubícanos"
  };

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.header}>
          ¡Muebles esenciales para tu hogar a un nuevo precio más bajo!
        </h1>
      </div>
      <div style={styles.contentSection}>
        <p style={styles.paragraph}>
          ¡Esto no es solo una oferta, es una realidad transformadora! En{' '}
          <strong>MegaMuebles</strong>, nos comprometemos a ofrecer una amplia
          variedad de muebles a precios realmente accesibles, porque creemos que
          todos merecen disfrutar de un hogar acogedor y funcional. Hemos
          reducido nuevamente los precios en cientos de productos, lo que
          significa que ahora puedes crear esos espacios soñados sin que tu
          bolsillo se resienta. Desde sofás elegantes hasta mesas de comedor
          versátiles, nuestra colección está diseñada para adaptarse a cada
          estilo y necesidad, permitiéndote personalizar cada rincón de tu hogar.
        </p>
        <h2 style={styles.subHeader}>Tus espacios siempre listos para el descanso</h2>
        <p style={styles.paragraph}>
          El dormitorio es más que solo un lugar para dormir; es un refugio de
          paz y descanso, donde cada elemento debe contribuir a tu bienestar. En
          MegaMuebles, encontrarás una extensa selección de productos diseñados
          para asegurar noches de descanso profundo y comodidad.
        </p>
      </div>
      <div style={styles.ctaSection}>
        <h2 style={styles.subHeader}>¡Descubre nuestras promociones!</h2>
        <p style={styles.ctaText}>
          Visítanos en <strong>MegaMuebles</strong> y comienza a crear el espacio
          que siempre has deseado. ¡Aprovecha nuestras ofertas y renueva tu hogar!
        </p>
        <button style={styles.ctaButton} onClick={goToUbicanos}>
          ¡Encuentranos en Bogotá!
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#f0f0f5',
    padding: '20px',
    color: '#333',
  },
  banner: {
    backgroundColor: '#808080', 
    color: 'white',
    padding: '50px 20px',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    margin: 0,
  },
  contentSection: {
    marginTop: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
    margin: '15px 0',
    textAlign: 'justify',
  },
  subHeader: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#808080',
    marginTop: '20px',
  },
  ctaSection: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  ctaText: {
    fontSize: '20px',
    margin: '10px 0',
  },
  ctaButton: {
    backgroundColor: '#808080',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
  ctaButtonHover: {
    backgroundColor: '#666666',
  },
};

export default PromocionMuebles;

