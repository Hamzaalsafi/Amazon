import './App.css';
import Header from './Header';
import Cart from './Cart';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Routes // Use Routes instead of Switch
} from 'react-router-dom';
import Footer from './Footer';
import ProductList from './ProductList';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/cart" element={<Cart />} />
    
               <Route path="/ProductList" element={<ProductList />} /> 
            
        </Routes>
        
      </div>
      <Footer/>
    </Router>

  );
}

export default App;
