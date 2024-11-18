import React from 'react';

function Footer() {
  // Estilos en el mismo archivo
  const styles = {
    footerContainer: {
      backgroundColor: '#2c3e50',
      color: '#fff',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      textAlign: 'left',
      marginTop: '20px',
    },
    section: {
      flex: '1 1 30%',
      marginBottom: '20px',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '10px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#f39c12',
    },
    socialIcons: {
      display: 'flex',
      marginTop: '15px',
    },
    socialIcon: {
      color: '#fff',
      marginRight: '10px',
      fontSize: '20px',
      transition: 'color 0.3s',
    },
    socialIconHover: {
      color: '#f39c12',
    },
    copyright: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      borderTop: '1px solid #fff',
      paddingTop: '10px',
    },
  };

  return (
    <footer style={styles.footerContainer}>
      {/* Sección de contacto */}
      <div style={styles.section}>
        <h4 style={styles.title}>Contáctanos</h4>
        <ul style={styles.list}>
          <li style={styles.listItem}>Teléfono: +34 123 456 789</li>
          <li style={styles.listItem}>Correo: contacto@megamuebles.com</li>
          <li style={styles.listItem}>Dirección: Avenida 2 de mayo #35A-17</li>
        </ul>
      </div>

      {/* Sección de información */}
      <div style={styles.section}>
        <h4 style={styles.title}>Información</h4>
        <ul style={styles.list}>
          <li style={styles.listItem}><a href="/about" style={styles.link}>Sobre Nosotros</a></li>
          <li style={styles.listItem}><a href="/privacy" style={styles.link}>Política de Privacidad</a></li>
          <li style={styles.listItem}><a href="/about#privacy" style={styles.link}>Términos y Condiciones</a></li>
          <li style={styles.listItem}><a href="/faq" style={styles.link}>Preguntas Frecuentes</a></li>
        </ul>
      </div>

      {/* Sección de redes sociales */}
      <div style={styles.section}>
        <h4 style={styles.title}>Síguenos</h4>
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" style={styles.socialIcon} target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" style={styles.socialIcon} target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" style={styles.socialIcon} target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        &copy; 2024 Megamuebles. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
