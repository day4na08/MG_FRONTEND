import React from 'react';
import '../css/Ubicanos.css';

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Ubicanos = () => {
  return (
    <>
      <NavBar />
      <section className="ubicacion-section">
        <h2 className="section-title">Ubícanos</h2>
        <div className="ubicacion-container">
          <div className="map-container">
            <iframe
              title="Mapa de nuestra ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.664280118807!2d-74.12399622591664!3d4.589104096642994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9c507665b4a7%3A0x820b5115db68d4f!2sAv.%20Primera%20de%20Mayo%20%2335a-17%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sus!4v1695337035021!5m2!1ses!2sus"
              allowFullScreen=""
              loading="lazy"
              className="map-frame"
            />
          </div>

          <div className="info-container">
            <div className="info">
              <h3 className="place-title">Nuestra Sede</h3>
              <p className="address">
                <i className="bx bx-map-pin icon" /> Avenida 1 de Mayo #35A-17, Bogotá, Colombia.
              </p>
              <p className="phone">
                <i className="bx bx-phone icon" /> 312 536 5683 - 321 413 8683
              </p>
              <p className="facebook">
                <i className="bx bxl-facebook icon" /> <i className="bx bxl-instagram icon" /> Mega_Muebles_Gabriel
              </p>
            </div>

            <div className="hours">
              <h4>Horarios de atención</h4>
              <ul className="hours-list">
                <li><i className="bx bx-time-five icon" /> Lunes a Viernes: 9:00 AM - 6:00 PM</li>
                <li><i className="bx bx-time-five icon" /> Sábados: 09:00 AM - 9:00 PM</li>
                <li><i className="bx bx-time-five icon" /> Domingos: 6:00 AM - 7:00 PM</li>
              </ul>
            </div>
s
            <div className="social-media">
              <h4>Conéctate con nosotros</h4>
              <div className="social-icons">
                <i className="bx bxl-facebook-circle icon" />
                <i className="bx bxl-instagram icon" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Ubicanos;
