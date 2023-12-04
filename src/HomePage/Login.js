import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const accounts = {
    "accounts": [
        {"email": "chapovalova@msoe.edu", "password": "password"},
        {"email": "czerkisi@msoe.edu", "password": "password"},
        {"email": "neiberlen@msoe.edu", "password": "password"},
        {"email": "mirandae@msoe.edu", "password": "password"},
        {"email": "kirktonm@msoe.edu", "password": "password"}
    ]
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        // Check if both fields are filled
        if (!username || !password) {
            setError('Both fields must be filled');
            return;
        }

        // Check if the username ends with '@msoe.edu'
        if (!username.endsWith('@msoe.edu')) {
            setError('Invalid username. Please use an email ending with @msoe.edu');
            return;
        }

        // Check if the email and password match an account in the database
        const account = accounts.accounts.find((account) => account.email === username && account.password === password);
        if (!account) {
            setError('Invalid email or password');
            return;
        }

        

        // After successful sign-in, navigate to the home page
        navigate('/home');
    };

    return (
        <div style={styles.container}>
            <img
                src={logo}  // Replace with the actual URL of your image
                alt="Raider Wagers Logo"
                style={styles.logo}
            />
            <h1 style={styles.title}>Raider Wagers</h1>
            <input
                type="text"
                placeholder="Email"
                style={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button style={styles.button} onClick={handleSignIn}>
                Sign In
            </button>
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
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
    error: {
        color: 'red',
        margin: '10px',
        textAlign: 'center',
    },
};

export default Login;
