import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const cookies = new Cookies();

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    // Elimina las cookies relacionadas con la sesión
    cookies.remove('id', { path: '/' });
    cookies.remove('username', { path: '/' });
    cookies.remove('email', { path: '/' });
    cookies.remove('role', { path: '/' });

    // Redirige a la página de inicio de sesión
    navigate('/Login');
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  // Verifica si el usuario está autenticado
  const isAuthenticated = cookies.get('id') !== undefined;

  return (
    <>
      {isAuthenticated && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Cerrar Sesión
          </button>

          {isModalOpen && (
            <div
              className="modal show d-flex justify-content-center align-items-center"
              tabIndex="-1"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh' }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmar Cierre de Sesión</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCancelLogout}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="text-center">
                      ¿Está seguro de que desea cerrar sesión?
                    </p>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button
                      className="btn btn-danger"
                      onClick={handleConfirmLogout}
                    >
                      Sí
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelLogout}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LogoutButton;
