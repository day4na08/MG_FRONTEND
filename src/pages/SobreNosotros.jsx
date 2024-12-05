
import React from 'react'
import '../css/SobreNosotros.css';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';


const SobreNosotros = () => {
  return (
    <>
        <NavBar />
   <div className='loprimero'>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Experiencia</title>
 
 
  <section className="experiencia">
    <div className="titulo">
      <h2>Experiencia MegaMuebles</h2>
      <h4>NUESTRO OBJETIVO</h4>
      <p>Sorprenderte, cumplir tus sueños y que el buen diseño sea para todos.</p>
      <h3>SIENTETE A GUSTO</h3>
    </div>
    <div className="progreso">
      <div className="step">
        <div className="icono">
          <img src="https://th.bing.com/th/id/R.86e619a62ca3889fe20e2a76d712e3ec?rik=JvYKkd%2fSKCqdZA&pid=ImgRaw&r=0" alt="Icono Inspirate" />
        </div>
        <h4>INSPÍRATE</h4>
        <p>con nuestros estilos. ¡Elige el tuyo!</p>
      </div>
      <div className="step">
        <div className="icono">
          <img src="https://th.bing.com/th/id/R.83b4cbb1fee08d54e966d83d57c37eba?rik=opojNsE%2bO7hEiA&pid=ImgRaw&r=0" alt="Icono Infórmate" />
        </div>
        <h4>INFÓRMATE</h4>
        <p>con nuestra experiencia única en decoración y mobiliario.</p>
      </div>
      <div className="step">
        <div className="icono">
          <img src="https://cdn-icons-png.flaticon.com/512/929/929256.png" alt="Icono Crea" />
        </div>
        <h4>CREA</h4>
        <p>con nuestras herramientas de diseño interior.</p>
      </div>
      <div className="step">
        <div className="icono">
          <img src="https://cdn.icon-icons.com/icons2/37/PNG/512/compare_4222.png" alt="Icono Compara" />
        </div>
        <h4>COMPARA</h4>
        <p>con nuestra variedad en productos y constante innovación.</p>
      </div>
      <div className="step">
        <div className="icono">
          <img src="https://cdn-icons-png.flaticon.com/512/3361/3361950.png" alt="Icono Decide" />
        </div>
        <h4>DECIDE</h4>
        <p>con nuestra disponibilidad inmediata, respaldo y garantía.</p>
      </div>
    </div>
  </section>
  <section className="diferencia">
    <h2>¿Qué nos hace diferentes?</h2>
    <div className="contenedor-caracteristicas">
      <div className="caracteristica">
        <img src="https://cdn-icons-png.flaticon.com/512/1829/1829892.png" alt="Icono Diseño e innovación" />
        <h4>Diseño e innovación</h4>
        <p>Nos enfocamos en ofrecer productos que combinan innovación y elegancia,
          manteniéndonos al día con las últimas tendencias en decoración.
          Renovamos nuestras colecciones frecuentemente para brindarte lo mejor en diseño, 
          siempre con un toque moderno y auténtico de la capital.</p>
      </div>
      <div className="caracteristica">
        <img src="https://static.vecteezy.com/system/resources/previews/000/642/316/original/vector-24-hours-service-available-icon.jpg" alt="Icono Disponibilidad inmediata" />
        <h4>Disponibilidad inmediata</h4>
        <p>Encuentra el mobiliario y accesorios ideales sin largas esperas. Si el artículo está en stock, 
          garantizamos una entrega rápida para que puedas disfrutarlo cuanto antes..</p>
      </div>
      <div className="caracteristica">
        <img src="https://gutpt.co.id/wp-content/uploads/2019/10/high-quality-products-from-top-brands-icon-2.png" alt="Icono Garantía de hasta 2 años" />
        <h4>Garantía de hasta 2 años</h4>
        <p>Te brindamos productos de alta calidad, respaldados por una garantía de hasta 2 años, 
          para que compres con total confianza y seguridad.</p>
      </div>
      <div className="caracteristica">
        <img src="https://th.bing.com/th/id/R.53d83368fb8300287ace498cc81fecfa?rik=2bKR3pWsTthRnQ&pid=ImgRaw&r=0" alt="Icono Servicio e instalación" />
        <h4>Servicio e instalación</h4>
        <p>Confía el montaje de tus muebles a nuestros profesionales, 
          asegurándote de que cada detalle esté correctamente 
          instalado para que puedas disfrutar de tu compra sin preocupaciones.</p>
      </div>
    </div>
  </section>
  <Footer />
</div>
</>

  )
}

export default SobreNosotros