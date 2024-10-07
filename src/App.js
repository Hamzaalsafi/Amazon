import './App.css';
import Header from './Header';
import Cart from './Cart';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Signin from './Signin';
import { auth } from './firebase'; 
import CreatAccound from './CreatAccound';
import { HashRouter  as Router, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import WishList from './WishList';
function App() {
  const [user, setUser] = useState(null); 
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);


  useEffect(() => {
    console.log("Current User:", user); 
  }, [user]);

  const noHeaderFooter = ["/signin", "/CreateAccount"];
  
  return (
    <div className="App">
      {!noHeaderFooter.includes(location.pathname) && <Header user={user} />}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/ProductList" element={<ProductList />} /> 
        <Route path="/product/:name" element={<ProductDetail />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route path="/wishlist" element={<WishList/>} />
        <Route path="/CreateAccount" element={<CreatAccound />} />
      </Routes>
      {!noHeaderFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
