import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate,Link } from 'react-router-dom';
const Header = ({ user }) => {
    const [itemCount, setItemCount] = useState(0);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false); 
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const searchtothename = (e) => {
      setSearchInput(e.target.value);
         navigate('/ProductList', { state: { searchValue: searchInput } });
  
  };
    
    useEffect(() => {
      if (user) {
        const cartRef = collection(db, `users/${user.uid}/cart`);

        const unsubscribe = onSnapshot(cartRef, (snapshot) => {
          const count = snapshot.docs.reduce((total, doc) => total + (doc.data().quantity || 0), 0);
          setItemCount(count);  
        });

        return () => unsubscribe();
      } else {
        setItemCount(0);
      }
    }, [user]);

    const toggleMenu = () => {
      setShowMenu((prev) => !prev);
    };
    const handleLogout = async () => {
      try {
          await signOut(auth);
         
      } catch (error) {
          console.error("Error signing out:", error);
      }
  };
    return (
      <nav>
         <Link to="/" className="navbar-logo2"> 
                    <img src="https://pngimg.com/d/amazon_PNG11.png" alt="Amazon" />
                </Link>
        <div className="navbar">
       
            <div className="navbar-left">
                <button className="menu-button" onClick={toggleMenu}>
                    <span className="menu-icon">&#9776;</span> 
                </button>
                
                <Link to="/" className="navbar-logo"> 
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
                <input type="text" value={searchInput} className="search-input" placeholder="Search Amazon" onChange={searchtothename}/>
                <button className="search-button" >
                    <svg id="searchicon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            
            <div className="navbar-right" onMouseLeave={() => setShowAccountDropdown(false)}>
                <div className='signintext' onClick={() => setShowAccountDropdown(!showAccountDropdown)}>
                    {user ? user.displayName || user.email : 'Guest'}
                    <p>Account & Lists</p>
                </div>
                {showAccountDropdown && (
                    <div className="dropdown-menu">
                       {!user&& (<div className='menubutton'>
                          <Link to={"/signin"}>
                          <button className="button-32">Sign in</button>
                          </Link>
                          <p className="newcustomer">New Cutomer? <Link to={"/CreateAccount"}>Start here</Link> </p>
                        </div>)}
                        {user&& (<div className='menubutton2'>
                         
                         <button className="button-32 " id="signout" onClick={handleLogout}>Sign out </button>
                       
                       </div>)}
                        <hr className='hr2'/>
                        <div className="menulist">
                        <div className="YourLists">
                        <h3>Your Lists</h3>
                        <p>Crate a List</p>
                        <p>Find a List or Registry</p>
                        </div>
                        <div className='vl'></div>
                        <div className="YourAccount">
                        <h3 className='youraccount'>Your Account</h3>
                         <p>Account</p>
                         <p>Orders</p>
                         <p>Recommendations</p>
                         <p>Browsing History</p>
                         <p>Watchlist</p>
                         <p>Video Purchases & Rentals</p>
                         <p>Kindle Unlimited</p>
                         <p>Content & Devices</p>
                         <p>Subscribe &Save Items</p>
                         <p>Memberships & Subscriptions</p>
                         <p>Music Libray</p>
                         
                        </div>
                        </div>
                    </div>
                )}
                <Link to="/cart" className="cart-link"> 
                    <span className="cart-icon"></span> 
                    <svg id="carticon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className="cart-count">{itemCount}</span>
                </Link>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
                <button className="close-menu-button" onClick={toggleMenu}>×</button> {/* Close button */}
                {!user&& (<div className='menubutton'>
                          <Link to={"/signin"}>
                          <button className="button-32">Sign in</button>
                          </Link>
                          <p className="newcustomer">New Cutomer? <Link to={"/CreateAccount"}>Start here</Link> </p>
                        </div>)}
                        {user&& (<div className='menubutton2'>
                         
                          <button className="button-32 signout" onClick={handleLogout}>Sign out </button>
                        
                        </div>)}
                        <hr className='hr2'/>
                        <div className="menulis2">
                        <div className="YourLists2">
                        <h3>Your Lists</h3>
                        <p>Crate a List</p>
                        <p>Find a List or Registry</p>
                        </div>
                        <hr className='hr2'/>
                        <div className="YourAccount2">
                        <h3 className='youraccount2'>Your Account</h3>
                         <p>Account</p>
                         <p>Orders</p>
                         <p>Recommendations</p>
                         <p>Browsing History</p>
                         <p>Watchlist</p>
                         <p>Video Purchases & Rentals</p>
                         <p>Kindle Unlimited</p>
                         <p>Content & Devices</p>
                         <p>Subscribe &Save Items</p>
                         <p>Memberships & Subscriptions</p>
                         <p>Music Libray</p>
                         
                        </div>
                        </div>
                    </div>
          
        </div>
        <div className="navbar-center2">
                <input type="text" value={searchInput} className="search-input" placeholder="Search Amazon" onChange={searchtothename}/>
                <button className="search-button" >
                    <svg id="searchicon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Header;
