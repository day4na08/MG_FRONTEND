import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const baseUrl = "https://mgbackend-production.up.railway.app/usuarios"; // Asegúrate de que esta URL sea la correcta

class RecoverPassword extends Component {
    state = {
        email: '',
        message: '',
        error: '',
        countdown: 60, // Tiempo en segundos
        isCounting: false,
    }

    handleChange = (e) => {
        this.setState({ email: e.target.value, message: '', error: '' });
    }

    isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!this.isValidEmail(this.state.email)) {
            this.setState({ error: 'Por favor ingresa un correo electrónico válido.' });
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/recover-password`, { email: this.state.email });
            console.log(response.data); // Log para verificar la respuesta
            this.setState({ 
                message: 'Se ha enviado un enlace de recuperación a tu correo.', 
                email: '',
                countdown: 60,
                isCounting: true,
                error: '', // Resetear el error
            });
            this.startCountdown();
        } catch (error) {
            console.error(error);
            this.setState({ 
                error: error.response ? error.response.data.message : 'Error al enviar el enlace de recuperación.', 
                message: '' // Resetear el mensaje de éxito
            });
        }
    }

    startCountdown = () => {
        this.countdownInterval = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.countdown > 1) {
                    return { countdown: prevState.countdown - 1 };
                } else {
                    clearInterval(this.countdownInterval);
                    return { isCounting: false };
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.countdownInterval);
    }

    render() {
        const { email, message, error, countdown, isCounting } = this.state;
        const isEmailValid = this.isValidEmail(email);

        const styles = {
            container: {
                padding: '20px',
                maxWidth: '400px',
                margin: '0 auto',
                textAlign: 'center',
                border: '2px solid #007bff',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                position: 'relative',
            },
            button: {
                border: '2px solid #007bff',
                backgroundColor: 'transparent',
                color: isEmailValid ? 'blue' : 'black',
                padding: '10px 20px',
                cursor: isEmailValid ? 'pointer' : 'not-allowed',
                opacity: isEmailValid ? 1 : 0.6,
                transition: 'color 0.3s',
                marginTop: '10px',
                width: '100%',
            },
            link: {
                border: '2px solid #007bff',
                backgroundColor: 'transparent',
                color: '#007bff',
                padding: '10px 20px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'color 0.3s, background-color 0.3s, border-color 0.3s',
                marginTop: '15px',
                width: '100%',
            },
            linkHover: {
                color: 'white',
                backgroundColor: '#007bff',
                borderColor: '#0056b3',
            },
            inputGroup: {
                marginBottom: '15px',
                textAlign: 'left',
            },
            success: {
                color: 'green',
            },
            error: {
                color: 'red',
            },
            input: {
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '2px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                fontStyle: 'italic',
            },
            countdown: {
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontSize: '12px',
                color: '#555',
            },
        };

        return (
            <div>
                <Navbar />
                <div className='n'>
                    <div style={styles.container}>
                        <h2>Recuperar Contraseña</h2>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <div style={styles.inputGroup}>
                                <label htmlFor="email">Correo Electrónico:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                    style={styles.input}
                                    placeholder="Ingresa tu correo electrónico"
                                />
                            </div>
                            {message && <p style={styles.success}>{message}</p>}
                            {error && <p style={styles.error}>{error}</p>}
                            <button
                                type="submit"
                                style={styles.button}
                                disabled={!isEmailValid}
                            >
                                Enviar Correo de Recuperación
                            </button>
                        </form>
                        {isCounting && (
                            <div style={styles.countdown}>
                                Reenviar en: {countdown} segundos
                            </div>
                        )}
                        <Link
                            to="/login"
                            style={styles.link}
                            onMouseOver={e => Object.assign(e.currentTarget.style, styles.linkHover)}
                            onMouseOut={e => Object.assign(e.currentTarget.style, styles.link)}
                        >
                            Regresar al inicio de sesión
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default RecoverPassword;