import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import CreditCardTable from '../components/user/CreditCardTable';
import ProductCrud from '../components/ProductCrud';
import '../css/UserPage.css';
import NavBar from '../components/Navbar';
import UserManagement from '../components/admin/UserManagement';
import Cookies from 'universal-cookie';
import Ventas from '../components/user/Ventas';
import Compras from '../components/user/Compras';


const cookies = new Cookies();


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = cookies.get('role');
    setUserRole(role);

    if (!userId || role !== 'admin') {
      setIsAuthenticated(false); // Redirige si no está autenticado o si el rol no es "admin"
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <UserProfile />;
      case 'cards':
        return <CreditCardTable />;
      case 'setusers':
        return <UserManagement />;
      case 'ventas':
        return <Ventas />;
      case 'compras':
        return <Compras />;
      case 'products':
        return <ProductCrud />;
      default:
        return <ProductCrud />;
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={userRole === 'user' ? '/user' : '/login'} />;
  }

  return (
    <div>
      <NavBar />
      <div className="user-page">
        <div className="sidebarpg">
          <ul>
            <li onClick={() => setActiveTab('info')}>Tu Información</li>
            <li onClick={() => setActiveTab('cards')}>Tus Tarjetas</li>
            <li onClick={() => setActiveTab('setusers')}>Usuarios</li>
            <li onClick={() => setActiveTab('compras')}>Historial de Compras</li>
            <li onClick={() => setActiveTab('ventas')}>Historial de ventas</li>
            <li onClick={() => setActiveTab('products')}>Sus Productos</li>

          </ul>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
      
    </div>

   
  );
};

export default AdminPage;
