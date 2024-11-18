import React, { useState, useEffect } from 'react';

const InfoProduct = () => {
  const [activeSection, setActiveSection] = useState('descripcion');

  useEffect(() => {
    setActiveSection('descripcion');
  }, []);

  const showSection = (id) => {
    setActiveSection(id);
  };

  return (
    <div className="F-tecnica">
      <div className="menu">
        <button className="min-var" onClick={() => showSection('descripcion')}>Descripción</button>
        <button className="min-var" onClick={() => showSection('oferta')}>Oferta</button>
        <button className="min-var" onClick={() => showSection('garantia')}>Garantía</button>
        <button className="min-var" onClick={() => showSection('armado')}>Instrucciones de Armado</button>
        <button className="min-var" onClick={() => showSection('tips')}>TIPS de Cuidado</button>
      </div>
      <div className="ficha">
        <div id="oferta" className={`section ${activeSection === 'oferta' ? 'active' : ''}`}>
          <h2>OFERTAS VALIDAS</h2>
        </div>
        <div id="garantia" className={`section ${activeSection === 'garantia' ? 'active' : ''}`}>
          <h2>Garantía</h2>
          <p>Aquí va la información sobre la garantía del producto.</p>
        </div>
        <div id="armado" className={`section ${activeSection === 'armado' ? 'active' : ''}`}>
          <h2>Instrucciones de Armado</h2>
          <p>Aquí van las instrucciones de armado del producto.</p>
        </div>
        <div id="tips" className={`section ${activeSection === 'tips' ? 'active' : ''}`}>
          <h2>TIPS de Cuidado</h2>
          <p>Aquí van los tips de cuidado del producto.</p>
        </div>
        <div id="descripcion" className={`section ${activeSection === 'descripcion' ? 'active' : ''}`}>
          <h1>Nombre del Producto</h1>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Estilo</td>
                <td>Contemporáneo</td>
              </tr>
              <tr>
                <td>Peso de resistencia</td>
                <td>150k por puesto</td>
              </tr>
              <tr>
                <td>Tipo De Relleno</td>
                <td>Espuma Industrial</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>Beige</td>
              </tr>
              <tr>
                <td>Requiere Armado</td>
                <td>Si</td>
              </tr>
              <tr>
                <td>Medidas (en cm)</td>
                <td>Alto: 90 Ancho: 217 Profundidad: 86</td>
              </tr>
              <tr>
                <td>Peso Neto Kg.</td>
                <td>69</td>
              </tr>
              <tr>
                <td>Material del tapiz</td>
                <td>Tela</td>
              </tr>
              <tr>
                <td>Material de la estructura interna</td>
                <td>Madera De Pino</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3>Observacion</h3>
          <p>Queremos que te sientas como en casa, por eso ambientamos las fotografías de los productos en la página para darte una perspectiva de cómo se ven en un espacio, pero esto no incluye ningún adorno, accesorios, ni pieza adicional que lo acompañe.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
