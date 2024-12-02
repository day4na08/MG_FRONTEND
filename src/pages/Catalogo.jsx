import React, { useState } from 'react';
import Filtros from '../components/Catalogo/Filtros';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Resultados from '../components/Catalogo/Resultados';
import { Carousel } from 'react-bootstrap'; // Importar el componente Carousel de Bootstrap

const Catalog = () => {
    const [filtros, setFiltros] = useState({
        categoria: '',
        estilo: '',
        tela: '',
        acabado: '',
        color: '',
        tapizMaterial: '',
        materialInterno: '',
        minPrecio: 0,
        maxPrecio: 1000000,
    });

    return (
        <div>
            <NavBar />
            <div className="catalog">
                <h1>Catálogo de MegaMuebles</h1>
                <hr />
                {/* Carrusel de imágenes antes de los filtros */}
                <div className="carousel-container">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.ibb.co/7rsD97G/Mueble-Amarillo.jpg"
                                alt="Imagen 1"
                            />
                            <Carousel.Caption>
                                <h3>Imagen 1</h3>
                                <p>Descripción de la imagen 1</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.ibb.co/k9qQHQL/2Mueble.jpg"
                                alt="Imagen 2"
                            />
                            <Carousel.Caption>
                                <h3>Imagen 2</h3>
                                <p>Descripción de la imagen 2</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.ibb.co/WvKMZWC/azul.jpg"
                                alt="Imagen 3"
                            />
                            <Carousel.Caption>
                                <h3>Imagen 3</h3>
                                <p>Descripción de la imagen 3</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div className="catalogo-container">
                    <div className="filterPM">
                        <Filtros filtros={filtros} setFiltros={setFiltros} />
                    </div>
                    <div className="filterRP">
                    <hr />
                        <Resultados filtros={filtros} />
                    </div>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                .catalog {
                    margin-top: 3rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0 20px;
                }

                hr {
                    border: 0.5px solid #ccc;
                    width: 80%;
                }

                .carousel-container {
                    width: 100%;
                    max-width: 1200px; /* Limitar el ancho máximo */
                    height: 300px; /* Asegurar que el carrusel sea más aplastado */
                    margin: 20px auto;
                    overflow: hidden; /* Evitar que el contenido se desborde */
                }

                .carousel-container img {
                    object-fit: cover; /* Las imágenes llenan el contenedor sin deformarse */
                    height: 100%; /* Asegura que la imagen cubra toda la altura del contenedor */
                    object-position: center; /* Centra las imágenes dentro del contenedor */
                }

                .catalogo-container {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    max-width: 1200px;
                    margin: 20px auto;
                    gap: 20px;
                }

                .filterPM {
                    flex: 0 0 250px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    padding: 15px;
                }

                .filterRP {
                    flex: 1;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                h1 {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 2rem;
                    text-align: center;
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default Catalog;
