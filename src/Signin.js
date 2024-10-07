import React, { useState } from 'react';
import styles from './Signin.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; 
import { useNavigate,Link } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
function Signin({ setUser }) { // Accept setUser as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Please fill in both email and password.');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in:', userCredential.user);
            setUser(userCredential.user); 
            setSuccess('Logged in successfully!');
            navigate('/Amazon'); 
        } catch (error) {
            console.error('Login error:', error);
            setError('Error logging in: ' + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo"/>
            <div className={styles.signincontainer}>
                <h1>Sign in</h1>
                {error && <p className={styles.error}>{error}</p>} 
                {success && <p className={styles.success}>{success}</p>}
                <form className={styles.inputcontainer} onSubmit={handleLogin}>
                    <p>Email</p>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className={styles.button32} type="submit">Continue</button>
                </form>
                <p>By continuing, you agree to Amazon's <span>Conditions of Use</span> and <span>Privacy Notice</span>.</p>
                <p className={styles.needHelp}><span>&#11208;</span> Need help?</p>
                <hr />
                <p className={styles.buy}>Buying for work?</p>
                <p className={styles.shop}>Shop on Amazon Business</p>
            </div>
            <div className={styles.divider}>
                <span>New to Amazon?</span>
            </div>
              <Link to="/Amazon/CreateAccount">
            <button className={styles.button} type="button">Create your Amazon account</button>
            </Link>
            <hr className={styles.hr2} />
            <div className={styles.footer}>
                <div className={styles.footerp}>
                    <p>Conditions of Use</p>
                    <p>Privacy Notice</p>
                    <p>Help</p>
                </div>
                <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </div>
            <NotificationContainer />
        </div>
    );
}

export default Signin;
