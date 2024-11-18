import React from 'react'
import '../css/contentProduct.css'

const ContentProduct = () => {
  return (
<div>
  <div className="cont-center">
    <div className="listimg">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1">
        <img src="https://mueblesparahogar.com/wp-content/uploads/2023/04/Banner-3-500X600-2-jpg.webp" className="d-block w-100" alt="..." />
      </button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2">
        <img src="https://mueblesparahogar.com/wp-content/uploads/2023/04/Banner-3-500X600-2-jpg.webp" className="d-block w-100" alt="..." />
      </button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHRDJhFxdeYqWN9xHC-qUN9SODYy05xOYNA&s" className="d-block w-100" alt="..." />
      </button>
    </div>
    <div className="Product-info ">
      <div className="cont-img item-p">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHRDJhFxdeYqWN9xHC-qUN9SODYy05xOYNA&s" className="d-block" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://mueblesparahogar.com/wp-content/uploads/2023/04/Banner-3-500X600-2-jpg.webp" className="d-block" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHRDJhFxdeYqWN9xHC-qUN9SODYy05xOYNA&s" className="d-block" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="infoProd item-p">
        <h1>NOMBRE DEL PRODUCTO</h1>
        <h6>REF:</h6>
        <hr />
        <p>descripcion breve del producto</p>
        <hr />
        <div className="transport">
          <p>TRANSPORTE</p>
        </div>
        <hr />
        <div>
          <h6>Colores:</h6>
          <div className="color-picker">
            <button className="color-button" style={{backgroundColor: 'rgb(216, 134, 134)'}} data-color="Color1" />
            <button className="color-button" style={{backgroundColor: 'rgb(29, 64, 85)'}} data-color="Color2" />
            <button className="color-button" style={{backgroundColor: 'rgb(238, 204, 181)'}} data-color="Color3" />
            <button className="color-button" style={{backgroundColor: 'rgb(213, 176, 255)'}} data-color="Color4" />
          </div>
        </div>
        <hr />
        <div className="metodocomp">
          <ul>
            <li className="botoncomp">
              <button type="button" className="btn btn-infor aggcart"><i className="bx bx-cart-add"> Agregar al Carrito</i></button>
            </li>
            <li className="botoncomp">
              <button type="button" className="btn btn-lights buyp">Comprar</button>
            </li>   
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default ContentProduct