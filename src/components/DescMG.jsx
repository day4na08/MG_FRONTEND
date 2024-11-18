import React from 'react'
import { Link } from 'react-router-dom'
import '../css/descmg.css'

const DescMG = () => {
  return (
<div>
  <div className="alg-prod">
    <hr />
    <h1>Productos Similares</h1>
    <hr />
    <div className="catalog">
      <hr />
      <div className="product">
        <h3>Mueble</h3>
        <p>Descripcion</p>
        <p className="price">$3.50 (200g), $6.00 (500g)</p>
        <button onclick="addToCart('gomas frutas', 3.50)" className="add-to-cart">Agregar al carrito</button>
      </div>
      <div className="product">
        <h3>Mueble</h3>
        <p>Descripcion</p>
        <p className="price">$3.50 (200g), $6.00 (500g)</p>
        <button onclick="addToCart('gomas frutas', 3.50)" className="add-to-cart">Agregar al carrito</button>
      </div>
      <div className="product">
        <h3>Mueble</h3>
        <p>Descripcion</p>
        <p className="price">$3.50 (200g), $6.00 (500g)</p>
        <button onclick="addToCart('gomas frutas', 3.50)" className="add-to-cart">Agregar al carrito</button>
      </div>
    </div>
    {/*COMPONENTE 4*/}
  </div>

  <div className="Infor">
    <div className="Infor-items">
      <div className="Infor-item">
        <hr />
        <ul className="itemfor">
          <li><h5>MegaMuebles</h5></li>
          <hr />
          <li><Link to="#">Sobre Nosotros</Link></li>
          <li><Link to="#">Trabaje con Nosotros</Link></li>
          <li><Link to="#">Garantias</Link></li>
          <li><Link to="#">Contactanos</Link></li>
        </ul>
        <ul className="itemfor">
          <li><h5>FINANCIAMIENTO</h5></li>
          <hr />
          <li><Link to="#">Nequi</Link></li>
          <li><Link to="#">DaviPlata</Link></li>
        </ul>
        <ul className="itemfor">
          <li><h5>CONTÁCTANOS</h5></li>
          <hr />
          <li><Link to="#">Linea Nacional: 310 7928363</Link></li>
          <li><h6>Horario</h6></li>
          <li><Link>Lun a Vie: 8 AM a 6 PM</Link></li>
          <li><Link>Sáb: 8 AM a 1 PM</Link></li>
          <li><Link>Dom y fest: 9 AM a 1 PM</Link></li>
          <li><Link to="#">Whatsapp</Link></li>
          <li><Link to="#">3107928363</Link></li>
        </ul>
      </div>
    </div>
  </div>
</div>

  )
}

export default DescMG