import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Importa componentes de Bootstrap
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../images/logo-small.png';

const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            email: '',
            password: ''
        },
        error: '',
        redirect: null,
        isAuthenticated: false,
        isEmailValid: true,
        isPasswordValid: true,
        isLoading: false,
        showPassword: false
    };

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        if (userId) {
            this.setState({ isAuthenticated: true });
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(
            {
                form: {
                    ...this.state.form,
                    [name]: value
                }
            },
            () => {
                if (name === 'email') {
                    this.setState({
                        isEmailValid: this.validateEmail(value)
                    });
                } else if (name === 'password') {
                    this.setState({
                        isPasswordValid: this.validatePassword(value)
                    });
                }
            }
        );
    };

    validateEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    validatePassword = password => {
        return password.length >= 6; // Al menos 6 caracteres
    };

    iniciarSesion = async event => {
        event.preventDefault();

        const { isEmailValid, isPasswordValid, form } = this.state;

        // Validación antes de enviar
        if (!isEmailValid || !isPasswordValid) {
            this.setState({ error: 'Por favor corrige los errores en el formulario' });
            return;
        }

        this.setState({ isLoading: true });

        try {
            const response = await axios.post('https://mgbackend-production.up.railway.app/login', {
                email: form.email,
                password: form.password
            });

            const usuario = response.data;
            cookies.set('id', usuario.id, { path: "/" });
            cookies.set('username', usuario.username, { path: "/" });
            cookies.set('email', usuario.email, { path: "/" });
            cookies.set('role', usuario.role, { path: "/" });
            localStorage.setItem('userId', usuario.id.toString());

            let redirectPath = '/user'; 
            if (usuario.role === 'admin') {
                redirectPath = '/admin';
            }

            this.setState({ redirect: redirectPath, isAuthenticated: true });
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            this.setState({ error: 'Error al intentar iniciar sesión', isLoading: false });
        }
    };

    togglePasswordVisibility = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };

    render() {
        if (this.state.isAuthenticated && this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        return (
            <div>
                <Navbar />
                <Container className="d-flex justify-content-center min-vh-100">
                    <div className="card p-4" style={{ maxWidth: '380px', width: '100%' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="d-block mx-auto mb-4"
                            style={{ maxWidth: '120px' }}
                        />
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
                        <Form onSubmit={this.iniciarSesion} autoComplete="off">
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Correo Electrónico:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="correo@ejemplo.com"
                                    value={this.state.form.email}
                                    onChange={this.handleChange}
                                    isInvalid={!this.state.isEmailValid}
                                />
                                {!this.state.isEmailValid && (
                                    <Form.Text className="text-danger">Ingrese un correo electrónico válido.</Form.Text>
                                )}
                            </Form.Group>
        
                            <Form.Group className="mb-3 position-relative" controlId="password">
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Ingrese su contraseña"
                                    value={this.state.form.password}
                                    onChange={this.handleChange}
                                    isInvalid={!this.state.isPasswordValid}
                                />
                                <button
                                    type="button"
                                    onClick={this.togglePasswordVisibility}
                                    className="btn btn-link eye-button"
                                >
                                    <i className={this.state.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </button>
                                {/* <Button
                                    variant="link"
                                    className="position-absolute top-50 end-0 translate-middle-y"
                                    style={{
                                        zIndex: 1,
                                        padding: '0', // Para hacerlo más pequeño
                                        backgroundColor: 'transparent', // Sin color de fondo
                                        border: 'none', // Sin borde
                                        fontSize: '1.2rem', // Tamaño pequeño del icono
                                        color: '#007bff', // Color para el icono
                                    }}
                                    onClick={this.togglePasswordVisibility}
                                >
                                    <i className={this.state.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </Button> */}
                            </Form.Group>
        
                            {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100 btnLR"
                                disabled={this.state.isLoading}
                            >
                                {this.state.isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                            </Button>
        
                            <p className="mt-3 text-center">
                                <Link to="/restablecer">¿Olvidaste tu contraseña?</Link>
                            </p>
                        </Form>
                        <p className="text-center">
                            ¿No tienes una cuenta? <Link to="/Register">Regístrate aquí</Link>
                        </p>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Login;
