import './App.css';
import Header from './Header';
import Cart from './Cart';
import Home from './Home';
import ProductDetail from './ProductDetail';
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

          <Route path="/Amazon" element={<Home />} /> 
          <Route path="/Amazon/cart" element={<Cart />} />
          <Route path="/Amazon/ProductList" element={<ProductList />} /> 
          <Route path="/product/:name" element={<ProductDetail />} />
        </Routes>
        
      </div>
      <Footer/>
    </Router>

  );
}

export default App;
