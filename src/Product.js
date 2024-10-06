import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore'; 
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from './firebase'; 
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './custom-notifications.css';
function Product({productId,img,price,star,rating,description,name,about,imges}) {

  const addToCart = async ()=>{
  
    const user = auth.currentUser;
 
    if (typeof productId !== 'string') {
      console.error('Invalid productId. It must be a string.');
      return;
    }
  
    if (user) {
     
      try {
        const cartDocRef = doc(db, `users/${user.uid}/cart`, productId);
  
        // Check if the product already exists in the user's cart
        const docSnap = await getDoc(cartDocRef);
        if (docSnap.exists()) {
          NotificationManager.success(
            'Item has been added to your cart successfully!', // message body
            'Success', // title of the notification
            4000, // duration in milliseconds
            null, // callback
            null // priority
          );
          await updateDoc(cartDocRef, {
            quantity: docSnap.data().quantity + 1,
          });
        } else {
          NotificationManager.success(
            'Item has been added to your cart successfully!', // message body
            'Success',
            3000, 
            null, 
            null, 
             
          );
          await setDoc(cartDocRef, {
            about: description,
            quantity: 1,
            img: img,
            price: price,
            productId:productId
          });
        }
      
      } catch (error) {
        console.error('Error adding to cart: ', error);
      }
    } else {
      
      NotificationManager.error(
        'You must be logged in to add items to the cart.',
        'Error',
        3000,
        null,
        null,
        'notification-error-custom'
      );
      
    }
  };
  
  const stars=()=>{
    let starArr=[]
    for(let i=0;i<star;i++){
      starArr.push(<i className="fa fa-star checked"></i>)
    }
    for(let i=star;i<5;i++){
      starArr.push(<i className="fa fa-star" style={{ color: '#d9d7d7' }}></i>)
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
        <div className="product-info">
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
    <NotificationContainer />
    </div>
  )
}

export default Product
