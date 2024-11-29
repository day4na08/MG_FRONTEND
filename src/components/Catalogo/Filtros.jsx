import React from 'react';

function Filtros({ filtros, setFiltros }) {
    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value,
        });
    };

    const estilos = ["", "Contemporáneo", "Rústico", "Moderno"];
    const telas = ["", "Cuero", "Telabonita", "Lino"];
    const acabados = ["", "Cuero", "Aceite", "Liso", "Transparente", "Mate", "Brillante"];
    const colores = ["", "Negro", "Madera", "Blanco", "Azul Marino", "Marrón"];

    return (
        <div className="filtros-container">
            <h3>Filtros</h3>
            {[
                { label: 'Categoría', name: 'categoria', options: ["Todas", "Mueble"] },
                { label: 'Estilo', name: 'estilo', options: estilos },
                { label: 'Tela', name: 'tela', options: telas },
                { label: 'Acabado', name: 'acabado', options: acabados },
                { label: 'Color', name: 'color', options: colores },
            ].map(({ label, name, options }) => (
                <label key={name}>
                    <span>{label}: </span>
                    <select name={name} value={filtros[name]} onChange={handleChange}>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
            ))}
            {['minPrecio', 'maxPrecio'].map((name, idx) => (
                <label key={name}>
                    <span>{idx === 0 ? 'Precio Min' : 'Precio Max'}: </span>
                    <input
                        type="number"
                        name={name}
                        value={filtros[name]}
                        onChange={handleChange}
                    />
                </label>
            ))}
            <style jsx>{`
                .filtros-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
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
                }
            `}</style>
        </div>
    );
}

export default Filtros;
