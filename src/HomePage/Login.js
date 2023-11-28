import React from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate();

    const handleSignIn = () => {
        // Perform your sign-in logic here

        // After successful sign-in, navigate to the home page
        navigate('/home');
    };


    return (
        <div style={styles.container}>
            <img
                src="logo.png"  // Replace with the actual URL of your image
                alt="Raider Wagers Logo"
                style={styles.logo}
            />
            <h1 style={styles.title}>Raider Wagers</h1>
            <input type="text" placeholder="Username" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />
            <button style={styles.button} onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    logo: {
        width: '250px',
        height: '250px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    input: {
        margin: '10px',
        padding: '8px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        fontSize: '18px',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
    },
};

export default Login;
