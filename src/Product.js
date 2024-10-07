import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { collection, onSnapshot,deleteDoc } from 'firebase/firestore'; 
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
  
        
        const docSnap = await getDoc(cartDocRef);
        if (docSnap.exists()) {
          NotificationManager.success(
            'Item has been added to your cart successfully!', 
            'Success', 
            4000, 
            null,
            null 
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
};const [isActive, setIsActive] = useState(false);

const addToWishList = async () => {
  const user = auth.currentUser;

  if (user) {
    const wishlistDocRef = doc(db, `users/${user.uid}/wishlist`, productId);
    const newActiveState = !isActive;
    setIsActive(newActiveState); 

    try {
      const docSnap = await getDoc(wishlistDocRef);

      if (docSnap.exists() && docSnap.data().isActive) {
        await deleteDoc(wishlistDocRef);
        console.log('Item removed from the wish list');
      } else {
        await setDoc(wishlistDocRef, {
          productId: productId,
          isActive: true,
          name: product.name,
          img: product.img,
          price: product.price,
          description: product.description,
          about: product.about,
          imges: product.imges,
          star: product.star,
          rating: product.rating,
      
        });
        console.log('Item added to the wish list');
      }
    } catch (error) {
      console.error('Error updating wishlist: ', error);
    
      setIsActive(!newActiveState);
    }
  } else {
    NotificationManager.error(
      'You must be logged in to add items to the wish list.',
      'Error',
      3000,
      null,
      null,
      'notification-error-custom'
    );
  }
};

useEffect(() => {
  const fetchWishListState = async () => {
    const user = auth.currentUser;
    if (user) {
      const wishlistDocRef = doc(db, `users/${user.uid}/wishlist`, productId);
      const docSnap = await getDoc(wishlistDocRef);
      if (docSnap.exists()) {
        setIsActive(docSnap.data().isActive);
      }
    }
  };

  fetchWishListState();
}, [productId]);

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
       <button 
  type="button" 
  className={isActive ? 'is-active lobebutton' : 'lobebutton'} 
  onClick={addToWishList}>
  <svg width="25" height="22" viewBox="0 0 18 16">
    <path
      d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
      stroke="#2D2D2D"
      strokeWidth=".8 "
    />
  </svg>
</button>
       </div>
      </div>
    </div>
    <NotificationContainer />
    </div>
  )
}

export default Product
