import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore'; 
import styles from './Cart.module.css'
import Cartitem from './Cartitem';
function Cart() {
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
      <h2 className={styles.h2}>Total Price: $120</h2>
      <hr className={styles.hr}></hr>

    </div>
    </div>
  )
}

export default Cart
