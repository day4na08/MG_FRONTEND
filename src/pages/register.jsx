import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../css/logreg.css';
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../images/logo-small.png';

const baseUrl = "https://mgbackend-production.up.railway.app/users";
const cookies = new Cookies();

class Register extends Component {
    state = {
        form: {
            username: '',
            apellido: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            role: 'user',
        },
        formErrors: {},
        error: '',
        success: false,
        redirect: null,
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, confirmEmail, password, confirmPassword } = this.state.form;

        if (password.length < 8) {
            this.setState({ error: 'La contraseña debe tener al menos 8 caracteres.' });
            return;
        }

        if (password !== confirmPassword) {
            this.setState({ error: 'Las contraseñas no coinciden.' });
            return;
        }

        if (email !== confirmEmail) {
            this.setState({ error: 'Los correos electrónicos no coinciden.' });
            return;
        }

        try {
            const newUser = {
                username: this.state.form.username,
                apellido: this.state.form.apellido,
                email: this.state.form.email,
                password: this.state.form.password,
                role: this.state.form.role,
            };

            await axios.post('https://mgbackend-production.up.railway.app/register', newUser);
            this.setState({ success: true, redirect: '/login' });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                this.setState({ error: error.response.data });
            } else {
                this.setState({ error: 'Error al intentar registrar el usuario' });
            }
        }
    };

    componentDidMount() {
        const role = cookies.get('role');
        if (role) {
            this.setState({
                redirect: role === 'admin' ? '/Adminmenu' : '/',
            });
        }
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    toggleVerifyPasswordVisibility = () => {
        this.setState((prevState) => ({ showVerifyPassword: !prevState.showVerifyPassword }));
    };

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        return (
            <div>
                <Navbar />
                <div className='n' style={{
                    marginTop: '4pc' }}>
                    <div className="form-container">
                        <img src={logo} alt="Logo" className="logo" />
                        <h2>Registro</h2>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Nombres Completos"
                                    value={this.state.form.username}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Apellidos</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellido"
                                    name="apellido"
                                    placeholder="Apellidos Completos"
                                    value={this.state.form.apellido}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="correo@ejemplo.com"
                                    value={this.state.form.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmEmail" className="form-label">Confirmar Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="confirmEmail"
                                    placeholder="Confirme su correo electronico"

                                    name="confirmEmail"
                                    value={this.state.form.confirmEmail}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type={this.state.showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Ingrese su contraseña"
                                    value={this.state.form.password}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={this.togglePasswordVisibility}
                                    className="btn btn-link eye-button"
                                >
                                    <i className={this.state.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </button>
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="confirmPassword" className="form-label">Verificar Contraseña</label>
                                <input
                                    type={this.state.showVerifyPassword ? "text" : "password"}
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Repita su contraseña"
                                    value={this.state.form.confirmPassword}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={this.toggleVerifyPasswordVisibility}
                                    className="btn btn-link eye-button"
                                >
                                    <i className={this.state.showVerifyPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </button>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="terms"
                                    name="terms"
                                    required
                                />
                                <label htmlFor="terms" className="form-check-label">
                                    Acepto los <a href="/Terms" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
                                </label>
                            </div>
                            {this.state.error && <p className="text-danger">{this.state.error}</p>}
                            <div className="btn-enter">
                                <button type="submit" className="btnLR">Registrarse</button>
                            </div>
                        </form>
                        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Register;
