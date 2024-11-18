import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsAndConditions = () => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f8ff',
            padding: '20px',
            boxSizing: 'border-box',
            flexDirection: 'column',
        },
        formContainer: {
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '900px',
            textAlign: 'left',
            transition: 'transform 0.3s',
            border: '1px solid #e0e0e0',
        },
        title: {
            marginBottom: '20px',
            color: '#333',
            fontSize: '32px',
            fontWeight: 700,
            textAlign: 'center',
        },
        sectionTitle: {
            color: '#2c3e50',
            marginTop: '30px',
            fontSize: '24px',
            borderBottom: '2px solid #0056b3',
            paddingBottom: '10px',
        },
        list: {
            margin: '10px 0',
            paddingLeft: '20px',
            lineHeight: '1.6',
        },
        navigationLinks: {
            marginTop: '30px',
            textAlign: 'center',
        },
        btn: {
            color: '#ffffff',
            backgroundColor: '#0056b3',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'background-color 0.3s, color 0.3s',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        footerSpace: {
            marginTop: '30px',
        },
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <h1 style={styles.title}>Términos y Condiciones de Uso</h1>
                    <p style={{ textAlign: 'center' }}>Última actualización: [25/10/2024]</p>

                    <h2 style={styles.sectionTitle}>Aceptación de Términos</h2>
                    <p>
                        Al registrarte o utilizar nuestros servicios para la compra de muebles, aceptas estos términos y condiciones, así como nuestra política de privacidad.
                    </p>

                    <h2 style={styles.sectionTitle}>Uso de la Plataforma</h2>
                    <p>
                        Te comprometes a utilizar la plataforma solo para fines legales y de acuerdo con todas las leyes aplicables. No puedes usar nuestros servicios para:
                    </p>
                    <ul style={styles.list}>
                        <li>Publicar o transmitir contenido ilegal, dañino o abusivo.</li>
                        <li>Violar los derechos de propiedad intelectual de terceros.</li>
                        <li>Realizar actividades que puedan perjudicar la seguridad, integridad o disponibilidad de la plataforma.</li>
                    </ul>

                    <h2 style={styles.sectionTitle}>Registro y Seguridad</h2>
                    <p>
                        Al registrarte, proporcionas información precisa y completa. Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas las actividades que ocurran en tu cuenta. Si sospechas que alguien ha accedido a tu cuenta sin tu autorización, debes notificarnos de inmediato.
                    </p>

                    <h2 style={styles.sectionTitle}>Contenido del Usuario</h2>
                    <p>
                        Eres responsable del contenido que publicas o transmites a través de nuestra plataforma. Al hacerlo, nos otorgas una licencia no exclusiva, transferible, sublicenciable y gratuita para utilizar, reproducir y distribuir dicho contenido.
                    </p>

                    <h2 style={styles.sectionTitle}>Limitación de Responsabilidad</h2>
                    <p>
                        Nuestra plataforma se proporciona "tal cual", y no garantizamos que esté libre de errores o que funcione sin interrupciones. No somos responsables por daños directos, indirectos, incidentales o consecuentes que surjan de tu uso de la plataforma.
                    </p>

                    <h2 style={styles.sectionTitle}>Modificaciones a los Términos</h2>
                    <p>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos. Al continuar utilizando nuestros servicios después de dicha notificación, aceptas los nuevos términos.
                    </p>

                    <h2 style={styles.sectionTitle}>Política de Devoluciones</h2>
                    <p>
                        Si no estás satisfecho con tu compra, puedes solicitar una devolución dentro de los 30 días posteriores a la entrega. Los muebles deben estar en su estado original y con el embalaje intacto.
                    </p>

                    <h2 style={styles.sectionTitle}>Legislación Aplicable</h2>
                    <p>
                        Estos términos se rigen por las leyes del [tu país o región]. Cualquier disputa relacionada con estos términos se resolverá en los tribunales competentes de [tu ciudad o región].
                    </p>

                    <h2 style={styles.sectionTitle}>Contacto</h2>
                    <p>
                        Si tienes alguna pregunta sobre estos términos, por favor contáctanos en <a href="gmail:oficialmegamuebles@gmail.com">oficialmegamuebles@gmail.com</a>.
                    </p>

                    <div style={styles.navigationLinks}>
                        <Link to="/register">
                            <button style={styles.btn}>Volver</button>
                        </Link>
                    </div>
                </div>
                <div style={styles.footerSpace}></div>
            </div>
            <Footer />
        </div>
    );
}

export default TermsAndConditions;
