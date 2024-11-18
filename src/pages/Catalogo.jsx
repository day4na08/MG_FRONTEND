import React, { useState } from 'react';
import Filtros from '../components/Catalogo/Filtros';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Resultados from '../components/Catalogo/Resultados';

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
                <h1>Catálogo de Muebles</h1>
                <hr/>
                <div className="catalogo-container">

                    <div className="filterPM">
                        <Filtros filtros={filtros} setFiltros={setFiltros} />
                    </div>
                    <div className="filterRP">
                        <Resultados filtros={filtros} />
                    </div>
                </div>
            </div>
            <Footer />

            <style jsx>{`
    .catalog {
        margin-top: 5pc;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 0 30px;
        align-items: center;
    }

    hr{
    color:black;            
    }

    .catalogo-container {
        display: flex;
        max-width: 1500px;
        width: 100%;
        padding-bottom: 110px;
    }

    .filterPM {
        flex: 0 0 220px; /* Más estrecho */
        padding: 10px;
        border-radius: 8px;
        margin-right: 10px;
    }

    .filterRP {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
    }

    /* Inputs de filtro */
    .filterPM input, .filterPM select {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.9);
    }

    /* Tarjetas de resultados */
    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin: 15px;
        padding: 20px;
        width: 280px;
        height: 380px;
    }

    h1 {
        text-align: center;
        margin: 60px 0;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 2.5em;
        text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    }
`}</style>

        </div>
    );
};

export default Catalog;
