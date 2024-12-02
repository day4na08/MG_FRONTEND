
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import '../css/Tendencias.css'; 

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';


// Registro de componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Tendencias = () => {
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState({ categorias: [], ganancias: [] });

  useEffect(() => {
    // Obtener productos
    fetch('http://localhost:3001/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching productos:', error));

    // Obtener estadísticas de ventas
    fetch('http://localhost:3001/ventas')
      .then(response => response.json())
      .then(data => setVentas(data))
      .catch(error => console.error('Error fetching ventas:', error));
  }, []);

  // Datos para el gráfico de barras
  const barData = {
    labels: ventas.categorias.map(cat => cat.categoria),
    datasets: [
      {
        label: 'Ventas por Categoría (unidades)',
        data: ventas.categorias.map(cat => cat.ventas),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Datos para el gráfico circular
  const pieData = {
    labels: ventas.categorias.map(cat => cat.categoria),
    datasets: [
      {
        label: 'Participación en Ventas',
        data: ventas.categorias.length > 0 ? ventas.categorias.map(cat => (cat.ventas / ventas.categorias.reduce((acc, curr) => acc + curr.ventas, 0)) * 100) : [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  // Datos para el gráfico de líneas
  const lineData = {
    labels: ventas.ganancias.map(g => g.mes),
    datasets: [
      {
        label: 'Ventas',
        data: ventas.ganancias.map(g => g.ganancia),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true
      }
    ]
  };

  return (
    <><NavBar />
    <div className='rpmgl'>
      <section className="report-section">
        <div className="report-header">
          <h2>Resumen de ventas</h2>
          <p>Consulta los muebles más vendidos y las estadísticas de ventas</p>
        </div>

        <div className="report-cards">
          <div className="card">
            <h3>Muebles más vendidos</h3>
            <div className="product-list">
              {productos.map(producto => (
                <div key={producto.id} className="product">
                  <img src={producto.imagen} alt={producto.nombre} className="product-img" />
                  <div className="product-info">
                    <h4>{producto.nombre}</h4>
                    <p>{producto.unidades} unidades</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>unidades vendidas
            </h3>
            <Line data={lineData} options={{ responsive: true }} />
            <p className="trend-indicator">▲ $10,000 (+2%)</p>
            <p><strong>$350,000</strong> en el último mes</p>
          </div>

          <div className="card">
            <h3>Categorías más populares</h3>
            <ul>
              {ventas.categorias.map(cat => (
                <li key={cat.categoria}>{cat.categoria} - {cat.ventas} unidades</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="chart-section">
          <h3>Gráfico de ventas por categoría</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>

        <div className="chart-section">
          <h3>Participación en las ventas totales</h3>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </section>
      <Footer />
    </div></>
  );
}

export default Tendencias;
