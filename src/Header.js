
import React, { useState, useEffect } from 'react';
import styles from'./styles.css';
import { Link } from 'react-router-dom'; 
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Header = () => {
  const [itemCount, setItemCount] = useState(0);
const [optimisticItemCount, setOptimisticItemCount] = useState(0); 

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'cart'), (snapshot) => {
    const count = snapshot.docs.reduce((total, doc) => total + (doc.data().quantity || 0), 0);

    
    if (count !== optimisticItemCount) {
      setOptimisticItemCount(count);
      setItemCount(count);  
    }
  });

  return () => unsubscribe();
}, [optimisticItemCount]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button">
          <span className="menu-icon">&#9776;</span> 
        </button>
        <Link to="/Amazon" className="navbar-logo"> 
          <img src="https://pngimg.com/d/amazon_PNG11.png" alt="Amazon" />
        </Link>
      </div>
      <div className='Deliverto'>
        <svg id='locationlogo' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <div className='delivertop'>
          <p>Deliver to</p>
          <p>Jordan</p>
        </div>
      </div>
      <div className="navbar-center">
        <input type="text" className="search-input" placeholder="Search Amazon" />
        <button className="search-button">
          <span className="search-icon"></span> { 
            <svg id="searchicon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          }
        </button>
      </div>
      <div className="navbar-right">
        <div className='signintext'>
          <p>Hello, sign in</p>
          <p>Account & Lists</p>
        </div>
        <Link to="/Amazon/cart" className="cart-link"> 
          <span className="cart-icon"></span> {
            <svg id="carticon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          }
          <span className="cart-count">{itemCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
