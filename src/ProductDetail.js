
import styles from './ProductDetail.module.css'
import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import 'react-notifications/lib/notifications.css';
import { auth } from './firebase'; 
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './custom-notifications.css';
function ProductDetail() {

    const location = useLocation();
    const product = location.state; 
    const { img, price, star, rating, description, name, about, imges, productId } = product;
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
              'Item has been added to your cart successfully!', 
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
          starArr.push(<i className="fa fa-star checked"style={{ fontSize: '1.3rem',margin:"0.06rem"}}></i>)
        }
        for(let i=star;i<5;i++){
            starArr.push(<i className="fa fa-star" style={{fontSize: '1.3rem',margin:"0.06rem", color: '#d9d7d7' }}></i>)
          }
        return starArr;
      }
      useEffect(() => {
        window.scrollTo(0, 0);
    }, [name])
      const pargraph=product.about;
      const sentences = pargraph.split('.').map(sentence => sentence.trim()).filter(sentence => sentence);
      const [imgshow, setimgshow] = useState(product.imges[0]);
     
      const changeimg1=()=>{
        setimgshow(product.imges[0]);
      };
      const changeimg2=()=>{
        setimgshow(product.imges[1]);
      };
      const changeimg3=()=>{
        setimgshow(product.imges[2]);
      };
      const changeimg4=()=>{
        setimgshow(product.imges[3]);
      };

      const str=product.rating;
      const extractRating = (s) => {
        const match = s.match(/(\d+\.\d+)/); 
        return match ? match[0] : null;
    };

    const str2 = "Seller rating 3.7/5 (1545)";

const extractNumber = (s) => {
    const match = s.match(/\((\d+)\)/);
    return match ? match[1] : null;
};
const ratingCount = extractNumber(str);
const sellerRating = extractRating(str);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.imges}>
        <img className={styles.mainimg}src={imgshow} alt="Product Image" />
        </div>
        <div className={styles.imgesbutton}>
        <img src={product.imges[0]} alt="Product Image" onClick={changeimg1} />
        <img src={product.imges[1]} alt="Product Image" onClick={changeimg2} />
        <img src={product.imges[2]} alt="Product Image" onClick={changeimg3} />
        <img src={product.imges[3]} alt="Product Image" onClick={changeimg4} />
        </div>
        <div className={styles.buycontainer}>
      
        <button className={styles.button} role="button"onClick={addToCart}>Add to cart</button>
  
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.about}>
            <p >{product.description}</p>
            <div className={styles.rating}>
            <p>{sellerRating} </p>
            {stars()}
            <p>{ratingCount} Reviews</p>
        </div>
        <hr className={styles.hr}/>
      </div>
      <div className={styles.price}>
        <p>{product.price}</p>
      </div>
      <div className={styles.infoContainer}>
      <p className={styles.returns}>
        FREE International Returns
        <span className={styles.arrow}>&#9660;</span>
      </p>
      <p className={styles.shipping}>
        $23.00 Shipping & Import Charges to
        <strong className={styles.country}> Jordan</strong>
        <span className={styles.details2}> Details</span>
        <span className={styles.arrow}>&#9660;</span>
      </p>
      <div className={styles.currencyInfo}>
        <span className={styles.icon}>i</span>
        <p>
          Use <strong>Amazon Currency Converter</strong> at checkout to pay for this item in your local currency. 
          Terms & Conditions apply. <a href="#">Learn More</a>
        </p>
      </div>
    </div>
    <hr className={styles.hr}/>
    <div className={styles.aboutproduct}>
        <h3>About this item</h3>
        <ul className={styles.paragraphList}>
      {sentences.map((sentence, index) => (
        <li key={index}>{sentence}.</li>
      ))}
    </ul>
        
    </div>
    </div>
    <NotificationContainer />
    </div>
  )
}

export default ProductDetail
