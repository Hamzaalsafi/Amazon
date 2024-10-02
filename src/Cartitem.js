import React, { useState, useEffect } from 'react';
import styles from './Cartitem.module.css'
import { db } from './firebase';
import { doc, getDoc, updateDoc,deleteDoc  } from 'firebase/firestore';
function Cartitem({img,price,quantity,about}) {
  const [quantityvalue, setquantityvalue] = useState(Math.floor(quantity));
  const [subtotal, setsubtotal] = useState(parseFloat(price.replace('$', '').trim())*quantityvalue);
  
  const plusclick = async () => {

    setquantityvalue((prevQuantity) => prevQuantity + 1);
  
    
    setsubtotal((prevSubtotal) => prevSubtotal + parseFloat(price.replace('$', '').trim()));
  

    try {
      const cartDocRef = doc(db, 'cart', about);
      await updateDoc(cartDocRef, {
        quantity: quantityvalue + 1, 
      });
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };
  
  const minusclick = async () => {
    if (quantityvalue > 1) {
     
      setquantityvalue((prevQuantity) => prevQuantity - 1);
  
      
      setsubtotal((prevSubtotal) => prevSubtotal - parseFloat(price.replace('$', '').trim()));
 
      try {
        const cartDocRef = doc(db, 'cart', about);
        await updateDoc(cartDocRef, {
          quantity: quantityvalue - 1, 
        });
      } catch (error) {
        console.error("Error updating quantity: ", error);
      }
    }
  };
  useEffect(() => {
   
    setsubtotal(parseFloat(price.replace('$', '').trim()) * quantityvalue);
  }, [quantityvalue, price]); 
  const deleteitem = async ()=>{
    const cartDocRef = doc(db, 'cart', about);
    await deleteDoc(cartDocRef);
 
  };
  return (
   <div className={styles.Cartitemcontainer}>
    <div className={styles.cartimge}>
     <img src={img} alt="Product" className={styles.img}/>
     </div>
     <div className={styles.itemabout}>
        <p className={styles.description}>{about}</p>
            <button className={styles.noselect} onClick={deleteitem}><span className={styles.text}>Delete</span><span class={styles.icon}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>

     </div>
    <div className={styles.itemDetails}>
    <div className={styles.quantity}>
    <button className="minus" aria-label="Decrease" onClick={minusclick}>-</button>
  <input type="number" className="input-box" value={quantityvalue} min="1" max="50"/>
  <button className="plus" aria-label="Increase" onClick={plusclick}>+</button>
    </div>
    <div className={styles.price}>
        <p>{subtotal.toFixed(2)}</p>
      
    </div>
    </div>
    </div>
   
  )
}

export default Cartitem
