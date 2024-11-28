import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import CreditCardTable from '../components/user/CreditCardTable';
import '../css/UserPage.css';
import NavBar from '../components/Navbar';
import Cookies from 'universal-cookie';
import Compras from '../components/user/Compras';
import AccountSettings from './AccountSettings';
import Footer from '../components/Footer';


const cookies = new Cookies();

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = cookies.get('role');
    setUserRole(role);

    if (!userId || role !== 'user') {
      setIsAuthenticated(false); // Redirige si no está autenticado o si el rol no es "user"
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <UserProfile />;
      case 'cards':
        return <CreditCardTable />;
        case 'compras':
          return <Compras />;
          case 'settings':
            return <AccountSettings />;
      default:
        return <UserProfile />;
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/login'} />;
  }

  return (
    <div>
      <NavBar />
      <div className="user-page">
        <div className="sidebarpg">
          <ul>
            <li onClick={() => setActiveTab('info')}>Tu Información</li>
            <li onClick={() => setActiveTab('cards')}>Tus Tarjetas</li>
            <li onClick={() => setActiveTab('compras')}>Historial de Compras</li>
            <li onClick={() => setActiveTab('settings')}>Configuración</li>

          </ul>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserPage;
