import React from 'react';
import styles from'./cardoneimg.css';
import { Link } from 'react-router-dom';
function Cardproductsoneimg({ title, img }) {
  return (
    <div className="containerCardproductsoneimg">
      <div className="card2Cardproductsoneimg">
      <h2 className='h2Cardproductsoneimg'>{title}</h2>
    <Link to='/Amazon/ProuctList'>
        <img className='imgCardproductsoneimg' src={img} alt={title} />
        </Link>
        <Link to='/Amazon/ProductList'>
        <p className="see-allCardproductsoneimg">See all deals</p>
        </Link>
      </div>
    </div>
  );
}

export default Cardproductsoneimg;
