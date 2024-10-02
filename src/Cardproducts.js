import React from 'react';
import styles from'./card.css';
import ProuctList from './ProductList';
import { Link } from 'react-router-dom';
function Cardproducts({ title, p1, p2, p3, p4, img1, img2, img3, img4 }) {
  return (
    <div className="container">
      <div className="card">
        <h2>{title}</h2>
        <div className="category-grid">
          <div className="category-item">
          <Link to='/Amazon/ProductList'>
            <img src={img1} alt={p1} />
            </Link>
            <p>{p1}</p>
          </div>
          
          <div className="category-item">
          <Link to='/Amazon/ProductList'>
            <img src={img2} alt={p2} />
            </Link>
            <p>{p2}</p>
          </div>
          <div className="category-item">
          <Link to='/Amazon/ProductList'>
            <img src={img3} alt={p3} />
            </Link>
            <p>{p3}</p>
          </div>
          <div className="category-item">
          <Link to='/Amazon/ProductList'>
            <img src={img4} alt={p4} />
            </Link>
            <p>{p4}</p>
          </div>
        </div>
        <Link to='/ProductList'>
        <p className="see-allCardproductsoneimg">See all deals</p>
        </Link>
      </div>
    </div>
  );
}

export default Cardproducts;
