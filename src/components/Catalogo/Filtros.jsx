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

      <label>
        <span>Categoría: </span>
        <select name="categoria" value={filtros.categoria} onChange={handleChange}>
          <option value="">Todas</option>
          <option value="Mueble">Mueble</option>
        </select>
      </label>

      <label>
        <span>Estilo: </span>
        <select name="estilo" value={filtros.estilo} onChange={handleChange}>
          {estilos.map(estilo => (
            <option key={estilo} value={estilo}>{estilo}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Tela: </span>
        <select name="tela" value={filtros.tela} onChange={handleChange}>
          {telas.map(tela => (
            <option key={tela} value={tela}>{tela}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Acabado: </span>
        <select name="acabado" value={filtros.acabado} onChange={handleChange}>
          {acabados.map(acabado => (
            <option key={acabado} value={acabado}>{acabado}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Color: </span>
        <select name="color" value={filtros.color} onChange={handleChange}>
          {colores.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Precio Min: </span>
        <input
          type="number"
          name="minPrecio"
          value={filtros.minPrecio}
          onChange={handleChange}
        />
      </label>

      <label>
        <span>Precio Max:</span>
        <input
          type="number"
          name="maxPrecio"
          value={filtros.maxPrecio}
          onChange={handleChange}
        />
      </label>
    <style jsx>{`
        .filtros-container {
          display: flex;
          flex-direction: column;
          padding: 30px;
          width: 380px; /* Ancho ajustado */
          background-color: #ffffff; /* Fondo más claro */
          border-right: 4px solid #ddd; /* Borde sutil */
          max-height: 80vh; /* Altura máxima ajustada */
          overflow-y: auto; /* Scroll para contenido largo */
          position: relative; /* Cambiado de fixed a relative */
          left: 1px; /* Separado del borde izquierdo */
          top: 1px; /* Separado del top para más espacio */ 
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra sutil */
        }

        .filtros-container h3 {
          margin-bottom: 20px;
          font-size: 1.4em;
          color: #333; /* Texto más oscuro */
        }

        .filtros-container label {
          margin-bottom: 10 px;
          display: flex;
          flex-direction: column;
          font-size: 14px; /* Tamaño de texto */
          color: #555; /* Color de texto */
        }

        .filtros-container select,
        .filtros-container input {
          margin-top: 5px;
          padding: 10px;
          border: 1px solid #ccc; /* Borde más claro */
          border-radius: 6px; /* Bordes más redondeados */
          width: 100%; /* Usar todo el ancho disponible */
          font-size: 14px; /* Tamaño de texto */
          background-color: #f9f9f9; /* Fondo más claro */
          box-sizing: border-box; /* Asegura que padding y borde se consideren en el ancho */
        }

        .filtros-container select:focus,
        .filtros-container input:focus {
          border-color: #007bff; /* Color del borde al hacer foco */
          outline: none; /* Sin borde adicional */
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Efecto de sombra al foco */
        }
      `}</style>
    </div>
  );
}

export default Filtros;

