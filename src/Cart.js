import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { auth } from './firebase'; 
import { collection, onSnapshot } from 'firebase/firestore'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import styles from './Cart.module.css';
import Cartitem from './Cartitem';

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartItemsRef = collection(db, `users/${user.uid}/cart`);

        const unsubscribeSnapshot = onSnapshot(
          cartItemsRef,
          (snapshot) => {
            const cartItemsTemp = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));

            setCartItems(cartItemsTemp);

            const total = cartItemsTemp.reduce(
              (acc, curr) =>
                acc +
                parseFloat(curr.data.price.replace('$', '').trim()) * curr.data.quantity,
              0
            );
            setTotalPrice(total);
          },
          (error) => {
            console.error('Error fetching cart items: ', error);
          }
        );

        return () => unsubscribeSnapshot(); 
      } else {
       
        setCartItems([]);
        setTotalPrice(0);
      }
    });

    return () => unsubscribeAuth(); 
  }, []);


  return (
    <div className={styles.containercart}>
      <div className={styles.cartitem}>
        <h2 className={styles.h2}>Shopping Cart</h2>
        <hr className={styles.hr}></hr>
        <div className={styles.item}>
          {cartItems.map((item) => (
            <Cartitem  
            productId={item.data.productId}
              key={item.id}
              img={item.data.img}
              price={item.data.price}
              quantity={item.data.quantity}
              about={item.data.about}
            />
          ))}
        </div>
      </div>
      <div className={styles.carttotal}>
        <h2 className={styles.h2}>Summary</h2>
        <hr className={styles.hrcarttotal}></hr>
        <div className={styles.carttotaldetalis}>
          <p className={styles.code}>PROMO CODE</p>
          <div className={styles.codecontiner}>
            <input type="text" className={styles.codeinput} placeholder="Enter it Here"/>
            <button className={styles.codebutton}>APPLY</button>
          </div>
          <hr className={styles.hrcarttotal}></hr>
          <p className={styles.subtotal}>
            SUBTOTAL <span>${totalPrice.toFixed(2)}</span>
          </p>
          <p className={styles.tax}>TAX <span>$0</span></p>
          <p className={styles.totalprice}>
            ORDER TOTAL <span>${totalPrice.toFixed(2)}</span>
          </p>
          <hr className={styles.hrcarttotal}></hr>
          <div className={styles.buybutton}>
            <button className={styles.codebutton}>Checkout</button>
          </div>
          <p className={styles.freedelivery}>
            Free delivery available on all orders over $50!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
