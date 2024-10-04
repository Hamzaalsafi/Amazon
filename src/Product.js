import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
function Product({productId,img,price,star,rating,description,name,about,imges}) {

  const addToCart = async () => {
    const cartDocRef = doc(db, 'cart', productId);
   
      const docSnap = await getDoc(cartDocRef);
      if (docSnap.exists()) {
        await updateDoc(cartDocRef, {
          quantity: docSnap.data().quantity + 1,
        });
      } else {
        await setDoc(cartDocRef, {
          about: description,
          quantity: 1,
          img: img,
          price: price,
        });
      }
   
  };
  
  const stars=()=>{
    let starArr=[]
    for(let i=0;i<star;i++){
      starArr.push(<i class="fa fa-star checked"></i>)
    }
    for(let i=star;i<5;i++){
      starArr.push(<i class="fa fa-star" style={{ color: '#d9d7d7' }}></i>)
    }
    return starArr;
  }
  const product = {
    productId,
    img,
    price,
    star,
    rating,
    description,
    name,
    about,
    imges
};
  return (
    <div>
     <div className="containerProduct">
      <div className="cardProductg">
      <Link to={`/product/${name}`} state={product}>
        <img className='imgProduct' src={img} />
        </Link>
        <div class="product-info">
        <p className='h2Product'>{description}</p>
        <div className='stars'>
      {stars()}
</div>

        <strong className='priceProduct'>{price}</strong>
        <p className="Delivery">Delivery <strong>Tue, Oct 8</strong></p>
        <p className="shipsto">Ships to Jordan</p>
       <p className="rating">{rating}</p>
       </div>
       <div className='add-to-cart'>
       <button className='button-32' role="button" onClick={addToCart}>Add to cart</button>
       </div>
      </div>
    </div>
    </div>
  )
}

export default Product
