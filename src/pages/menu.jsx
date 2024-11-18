import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Menu extends Component {

    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('role', { path: "/" });
        window.location.href = '/';
    }

    render() {
        const role = cookies.get('role');
        
        // Redirige si no está logueado
        if (!cookies.get('username')) {
            return <Navigate to="/" />; 
        }

        // Redirige si el rol no es 'Usuario'
        if (role !== 'user') {
            return <Navigate to='/' />; // Redirige según el rol a su página correspondiente
        }

        // Solo muestra el contenido si el rol es 'Usuario'
        return (
            <div>
                <h2>Menu Usuario</h2>
                <br />
                <button onClick={this.cerrarSesion}>
                    Cerrar sesión
                </button>
            </div>
        );
    }
}
