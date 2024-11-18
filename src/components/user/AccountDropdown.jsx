import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/AccountDropdown.css';

const AccountDropdown = ({ isLoggedIn, userRole }) => {
  return (
    <div className="account-dropdown">
      {isLoggedIn ? (
      <div>
        <ul>
          <li>
            <Link to={userRole === 'admin' ? '/admin' : '/user'}>Mi Cuenta</Link>
          </li>
        </ul>
        </div>
      ) : (
        <ul>
          <li>
            <Link to="/Login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/Register">Registrarse</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AccountDropdown;
