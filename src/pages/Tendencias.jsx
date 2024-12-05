import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import '../css/Tendencias.css'; 

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

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
  const [ganancias, setGanancias] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [productosPopulares, setProductosPopulares] = useState([]);

  useEffect(() => {
    // Fetch ganancias
    fetch('https://mgbackend-production.up.railway.app/ganancias')
      .then(response => response.json())
      .then(data => setGanancias(data))
      .catch(error => console.error('Error fetching ganancias:', error));

    // Fetch estadisticas
    fetch('https://mgbackend-production.up.railway.app/estadisticas')
      .then(response => response.json())
      .then(data => setEstadisticas(data))
      .catch(error => console.error('Error fetching estadisticas:', error));

    // Fetch productos_populares
    fetch('https://mgbackend-production.up.railway.app/productos_populares')
      .then(response => response.json())
      .then(data => setProductosPopulares(data))
      .catch(error => console.error('Error fetching productos populares:', error));
  }, []);

  // Filtrar productos únicos por id_product de la tabla estadisticas
  const uniqueProducts = estadisticas.reduce((acc, current) => {
    if (!acc.find(item => item.id_product === current.id_product)) {
      acc.push(current);
    }
    return acc;
  }, []);

  // Datos para el gráfico de barras
  const barData = {
    labels: ganancias.map(item => item.mes),
    datasets: [
      {
        label: 'Ganancias (USD)',
        data: ganancias.map(item => item.ganancias),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // Datos para el gráfico circular
  const pieData = {
    labels: productosPopulares.map(item => item.categoria),
    datasets: [
      {
        label: 'Categorías Populares',
        data: productosPopulares.map(item => item.cantidad),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Datos para el gráfico de líneas
  const lineData = {
    labels: estadisticas.map(item => item.fecha_venta),
    datasets: [
      {
        label: 'Ventas por Fecha',
        data: estadisticas.map(item => item.precio_gana),
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
              {uniqueProducts.map((item, index) => (
                <div key={index} className="product" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <img 
                    src={item.img1_product} 
                    alt={item.nombre_product} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px' }} 
                  />
                  <div className="product-info">
                    <h4>{item.nombre_product}</h4>
                    <p>{item.cant_vendida} unidades vendidas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Unidades Vendidas</h3>
            <Line data={lineData} options={{ responsive: true }} />
          </div>

          <div className="card">
            <h3>Categorías Más Populares</h3>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="chart-section">
          <h3>Ganancias por Mes</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
      </section>
      <Footer />
    </div></>
  );
}

export default Tendencias;
