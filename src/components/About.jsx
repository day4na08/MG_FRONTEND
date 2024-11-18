import React, { useState } from 'react';
import { FaCouch, FaTools, FaTruck, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import NavBar from '../components/Navbar'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/Footer'; // Asegúrate de que la ruta sea correcta

// Importa las imágenes
import logo from '../images/imagenlogin.png'; // Reemplaza con la ruta correcta
import nuestroEquipo from '../images/equipo.png'; // Reemplaza con la ruta correcta
import proteccionDatos from '../images/seguridad.png'; // Reemplaza con la ruta correcta
import terminosCondiciones from '../images/terminos.png'; // Reemplaza con la ruta correcta

const SobreNosotros = () => {
  const [activeSection, setActiveSection] = useState('about');

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div>
            <h2 style={styles.title}>Sobre Nosotros</h2>
            <p style={styles.description}>
              En <strong>Muebles Bogotá</strong>, nos especializamos en la fabricación de muebles de alta calidad, diseñados para transformar espacios en hogares acogedores y funcionales. Con más de 20 años de experiencia, nuestra empresa familiar ha crecido hasta convertirse en uno de los líderes en la industria del mobiliario en Bogotá.
            </p>
            <img src={nuestroEquipo} alt="Nuestro equipo" style={styles.image} />
            <p style={styles.description}>
              Nuestro objetivo es ofrecer productos duraderos, innovadores y elegantes que se adapten a las necesidades de nuestros clientes. Cada pieza de mobiliario es diseñada y fabricada con materiales seleccionados por nuestros expertos artesanos.
            </p>
            <div style={styles.valuesContainer}>
              <div style={styles.valueItem}>
                <FaTools style={styles.icon} />
                <h3 style={styles.valueTitle}>Calidad Artesanal</h3>
                <p style={styles.valueDescription}>
                  Cada mueble es fabricado con atención al detalle, utilizando materiales de primera calidad y procesos artesanales para asegurar la mejor experiencia.
                </p>
              </div>
              <div style={styles.valueItem}>
                <FaTruck style={styles.icon} />
                <h3 style={styles.valueTitle}>Entrega a Tiempo</h3>
                <p style={styles.valueDescription}>
                  Nos comprometemos a cumplir con los plazos de entrega, asegurando que tus muebles lleguen en perfecto estado, directamente a tu hogar.
                </p>
              </div>
              <div style={styles.valueItem}>
                <FaCouch style={styles.icon} />
                <h3 style={styles.valueTitle}>Diseños Modernos</h3>
                <p style={styles.valueDescription}>
                  Innovamos constantemente para ofrecer una amplia gama de diseños modernos y funcionales que se adapten a cualquier estilo de vida.
                </p>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div>
            <h2 style={styles.title}>Política de Privacidad</h2>
            <p style={styles.description}>
              En <strong>Muebles Bogotá</strong>, valoramos la privacidad de nuestros clientes. Toda la información personal que recolectamos es tratada con el máximo cuidado y seguridad. No compartimos ni vendemos datos a terceros.
            </p>
            <p style={styles.description}>
              Los datos recolectados a través de nuestra página web son utilizados únicamente para mejorar nuestros servicios y procesar tus pedidos. Cumplimos con todas las normativas legales vigentes en materia de protección de datos.
            </p>
            <img src={proteccionDatos} alt="Protección de datos" style={styles.image} />
          </div>
        );
      case 'terms':
        return (
          <div>
            <h2 style={styles.title}>Términos y Condiciones</h2>
            <p style={styles.description}>
              Al utilizar nuestra tienda en línea, aceptas los siguientes términos y condiciones. Recomendamos leer atentamente las siguientes disposiciones:
            </p>
            <ul style={styles.description}>
              <li>Los productos adquiridos deben ser pagados en su totalidad antes de la entrega.</li>
              <li>El plazo de entrega puede variar según la ubicación del cliente.</li>
              <li>Muebles Bogotá no se responsabiliza por daños causados por el mal uso de los productos.</li>
              <li>Para devoluciones, por favor contacta a nuestro equipo de atención al cliente.</li>
            </ul>
            <img src={terminosCondiciones} alt="Términos y Condiciones" style={styles.image} />
          </div>
        );
      case 'faq':
        return (
          <div>
            <h2 style={styles.title}>Preguntas Frecuentes</h2>
            <p style={styles.description}>
              Encuentra respuestas a las preguntas más comunes de nuestros clientes. Si no encuentras la respuesta que buscas, contáctanos directamente.
            </p>
            <ul style={styles.faqList}>
              <li><FaQuestionCircle style={styles.iconFaq} /> <strong>¿Realizan envíos a todo el país?</strong> Sí, realizamos envíos a nivel nacional. Los tiempos y costos de envío pueden variar según la ubicación.</li>
              <li><FaQuestionCircle style={styles.iconFaq} /> <strong>¿Qué métodos de pago aceptan?</strong> Aceptamos tarjetas de crédito, débito y transferencias bancarias.</li>
              <li><FaQuestionCircle style={styles.iconFaq} /> <strong>¿Ofrecen garantía en los productos?</strong> Sí, ofrecemos una garantía de 1 año por defectos de fabricación.</li>
              <li><FaQuestionCircle style={styles.iconFaq} /> <strong>¿Puedo personalizar mis muebles?</strong> Sí, ofrecemos opciones de personalización en varios de nuestros productos. Contáctanos para más información.</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Navbar */}
      <NavBar />

      <section style={styles.section}>
        <div style={styles.container}>
          {/* Logo de la empresa */}
          <div style={styles.logoContainer}>
            <Link to="/">
              <img src={logo} alt="Muebles Bogotá Logo" style={styles.logo} />
            </Link>
          </div>
          {/* Navegación */}
          <div style={styles.menu}>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <a href="#about" style={styles.link} onClick={() => setActiveSection('about')}>Sobre Nosotros</a>
              </li>
              <li style={styles.listItem}>
                <a href="#privacy" style={styles.link} onClick={() => setActiveSection('privacy')}>Política de Privacidad</a>
              </li>
              <li style={styles.listItem}>
                <a href="#terms" style={styles.link} onClick={() => setActiveSection('terms')}>Términos y Condiciones</a>
              </li>
              <li style={styles.listItem}>
                <a href="#faq" style={styles.link} onClick={() => setActiveSection('faq')}>Preguntas Frecuentes</a>
              </li>
            </ul>
          </div>

          {/* Renderizado dinámico de la sección activa */}
          {renderSection()}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

// Estilos embebidos
const styles = {
  section: {
    backgroundColor: '#f7f7f7',
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  container: {
    maxWidth: '1200px',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    marginBottom: '20px',
  },
  logo: {
    width: '200px',
    height: 'auto',
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    padding: '0',
  },
  listItem: {
    display: 'inline-block',
  },
  link: {
    fontSize: '1.2rem',
    color: '#00796b',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#e0f7fa',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#666',
    marginBottom: '40px',
  },
  image: {
    width: '15%',
    height: 'auto',
    marginBottom: '30px',
    borderRadius: '10px',
  },
  valuesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  valueItem: {
    width: '250px',
    textAlign: 'center',
  },
  valueTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  valueDescription: {
    fontSize: '1rem',
    color: '#555',
  },
  icon: {
    fontSize: '2.5rem',
    color: '#00796b',
    marginBottom: '15px',
  },
  faqList: {
    textAlign: 'left',
  },
  iconFaq: {
    fontSize: '1.2rem',
    color: '#00796b',
    marginRight: '10px',
  },
};

export default SobreNosotros;
