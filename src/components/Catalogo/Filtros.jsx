import React, { useState } from 'react';

function Filtros({ filtros, setFiltros }) {
    const [preciosHabilitados, setPreciosHabilitados] = useState(false);

    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value,
        });
    };

    const togglePrecios = () => {
        const nuevoEstado = !preciosHabilitados;
        setPreciosHabilitados(nuevoEstado);
    
        setFiltros({
            ...filtros,
            minPrecio: '',
            maxPrecio: nuevoEstado ? filtros.maxPrecio || '100000000' : '100000000',
        });
    };
    
    const estilos = ["Contemporáneo", "Rústico", "Moderno"];
    const telas = ["Cuero", "TelaSeda", "TelaLino"];
    const acabados = ["Cuero", "Aceite", "Liso", "Transparente", "Mate", "Brillante"];
    const colores = ["Negro", "Madera", "Blanco", "Azul Marino", "Marrón"];
    const categorias = ["Mueble"];

    return (
        <div className="filtros-container">
            <h3>Filtros</h3>
            {[
                { label: 'Categoría', name: 'categoria', options: categorias },
                { label: 'Estilo', name: 'estilo', options: estilos },
                { label: 'Tela', name: 'tela', options: telas },
                { label: 'Acabado', name: 'acabado', options: acabados },
                { label: 'Color', name: 'color', options: colores },
            ].map(({ label, name, options }) => (
                <label key={name}>
                    <span>{label}: </span>
                    <select name={name} value={filtros[name]} onChange={handleChange}>
                        <option value="">Todos</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
            ))}
            <div className="toggle-precios">
                <span>Habilitar filtros de precio:</span>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={preciosHabilitados}
                        onChange={togglePrecios}
                    />
                    <span className="slider"></span>
                </label>
            </div>
            {['minPrecio', 'maxPrecio'].map((name, idx) => (
                <label key={name}>
                    <span>{idx === 0 ? 'Precio Min' : 'Precio Max'}: </span>
                    <input
                        type="number"
                        name={name}
                        value={filtros[name]}
                        onChange={handleChange}
                        placeholder={idx === 0 ? 'Mínimo' : 'Máximo'}
                        disabled={!preciosHabilitados}
                    />
                </label>
            ))}
            <style jsx>{`
                .filtros-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                h3 {
                    font-size: 1.2rem;
                    margin-bottom: 10px;
                    color: #333;
                }

                label {
                    font-size: 0.9rem;
                    color: #555;
                }

                select, input {
                    width: 100%;
                    padding: 8px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    font-size: 0.9rem;
                }

                .toggle-precios {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    margin: 10px 0;
                    color: #333;
                }

                .switch {
                    position: relative;
                    display: inline-block;
                    width: 34px;
                    height: 20px;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 20px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 14px;
                    width: 14px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: 0.4s;
                    border-radius: 50%;
                }

                input:checked + .slider {
                    background-color: #4CAF50;
                }

                input:checked + .slider:before {
                    transform: translateX(14px);
                }
            `}</style>
        </div>
    );
}

export default Filtros;
