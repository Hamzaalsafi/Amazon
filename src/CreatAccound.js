import React, { useState } from 'react';

import styles from './Creat.module.css';

import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'; // Add `updateProfile`
function CreatAccound() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const db = getFirestore();
    const navigate = useNavigate();
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
      
        if (!name || !email || !password) {
          setError('Please fill in all fields (name, email, and password).');
          return;
        }
      
        const auth = getAuth();
      
        try {
          // Create a new account
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
      
          // Update the user's displayName
          await updateProfile(user, { displayName: name });
      
          // Reload the user to ensure displayName is updated
          await auth.currentUser.reload();
      
          // Check if the displayName is set correctly
          console.log('Updated displayName:', auth.currentUser.displayName);
      
          // Store user data in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            createdAt: new Date(),
          });
      
          setSuccess('Account created successfully!');
      
          // Sign in automatically after account creation
          const loginCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('Logged in:', loginCredential.user);
      
          // Redirect the user to the home page
          navigate('/Amazon');
      
        } catch (error) {
          setError('Error creating account: ' + error.message);
        }
      };
      
  return (
    <div className={styles.container}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo"/>
    <div className={styles.signincontainer}>
      <h1>Create Account</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form className={styles.inputcontainer} onSubmit={handleCreateAccount}>
      <p>Name</p> 
        <input type="text" value={name}
          onChange={(e) => setName(e.target.value)} />
        <p>Email</p>
        <input type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <p>Password</p>
        <input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.button32} type="submit">Continue</button>
      </form>
      <p>By creating an account, you agree to Amazon's <span>Conditions of Use</span> and <span>Privacy Notice</span>.</p>
      
      <hr />
      <p className={styles.buy}>Buying for work?</p>
      <p className={styles.shop}>Shop on Amazon Business</p>
    </div>
    <div className={styles.divider}>
      <span>
      Already have an account? </span>
    </div>
    <Link to="/Amazon/signin">
    <button className={styles.button} type="button">Sign in</button>
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
  </div>
);
  
}

export default CreatAccound
