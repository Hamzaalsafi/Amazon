import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore'; 
import styles from './Cart.module.css'
import Cartitem from './Cartitem';
function Cart() {
  const [totalprine, settotalprine] = useState(0);
  
 
useEffect(() => {
  const cartitemsref = collection(db, 'cart');

  const unsubscribe = onSnapshot(cartitemsref, (snapshot) => {
    const cartitemstemp = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    const calculateTotal = debounce(() => {
      settotalprine(
        cartitemstemp.reduce(
          (acc, curr) =>
            acc +
            parseFloat(curr.data.price.replace('$', '').trim()) *
              curr.data.quantity,
          0
        )
      );
    }, 300); 
    calculateTotal();
  }, (error) => {
    console.error("Error fetching cart items: ", error);
  });

  return () => unsubscribe(); // Cleanup on unmount
}, []);
  const [cartitems, setcartitems] = useState([]);
  const getcartitem = () => {
    const cartitemsref = collection(db, 'cart');

    onSnapshot(cartitemsref, (snapshot) => {
      const cartitemstemp = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      setcartitems(cartitemstemp);
    }, (error) => {
      console.error("Error fetching cartitems: ", error);
    });
  };
  useEffect(() => {
    getcartitem(); 
  }, []);
  return (
    <div className={styles.containercart}>
    <div className={styles.cartitem}>
      <h2 className={styles.h2}>Cart Shoping</h2>
      <hr className={styles.hr}></hr>
      <div className={styles.item}>
      {cartitems.map((item) => (
          <Cartitem  
     
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
       <button className={styles.codebutton} >APPLY</button>
       </div>
       <hr className={styles.hrcarttotal}></hr>
       <p className={styles.subtotal}>SUBTOTAL <span>${totalprine.toFixed(4)}</span></p>
       <p className={styles.tax}>TAX <span>$0</span></p>
       <p className={styles.totalprice}>ORDER TOTAL<span>${totalprine.toFixed(4)}</span></p>
       <hr className={styles.hrcarttotal}></hr>
       <div className={styles.buybutton}>
       <button className={styles.codebutton} >Chekout</button>
       </div>
       <p className={styles.freedelivery}>Free delivery available on all orders over $50!</p>
      </div>
    </div>
    </div>
  )
}

export default Cart
