import React, { useState, useEffect } from 'react';

import styles from'./styles.css';
import Cardproducts from './Cardproducts';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore'; 
import Cardproductsoneimg from './Cardproductsoneimg';
import Cardscrolling from './Cardscrolling2';
import Footer from './Footer';
function Home() {
    const images = [
        "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg"
    ];
   
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const [Cardproduct, setCardproduct] = useState([]);
    const [Cardoneproduct, setCardoneproduct] = useState([]);
    const [cardscroling, setcardscroling] = useState([]);
    const getCardproduct = () => {
        const productCollectionRef = collection(db, 'homeEssentials');
    
        onSnapshot(productCollectionRef, (snapshot) => {
            let products = snapshot.docs.map(doc => ({
                id: doc.id,
                homeEssentials: doc.data()
            }));
          
            setCardproduct(products);
        }, (error) => {
            console.error("Error fetching products: ", error); // Log any errors
        });
    }
    const getcardscroling = () => {
        const productCollectionRef = collection(db, 'cardscroling');
    
        onSnapshot(productCollectionRef, (snapshot) => {
            let products = snapshot.docs.map(doc => ({
                id: doc.id,
                cardscroling: doc.data()
            }));
          
            setcardscroling(products);
        }, (error) => {
            console.error("Error fetching products: ", error); // Log any errors
        });
    }
    useEffect(() => {
        getcardscroling(); 

    }, []);
    useEffect(() => {
        getCardproduct(); 

    }, []);
    const getCardoneproduct = () => {
        const productCollectionRef = collection(db, 'Cardproductsoneimg');
    
        onSnapshot(productCollectionRef, (snapshot) => {
            let products = snapshot.docs.map(doc => ({
                id: doc.id,
                Cardproductsoneimg: doc.data()
            }));
           
            setCardoneproduct(products);
        }, (error) => {
            console.error("Error fetching products: ", error); // Log any errors
        });
    }
    useEffect(() => {
        getCardoneproduct(); 

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleClick('next');
        }, 10000); 

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        setFade(true); 
        const fadeTimeout = setTimeout(() => {
            setFade(false); 
        }, 1000); 

        return () => clearTimeout(fadeTimeout);
    }, [index]);

    // Handle image change
    const handleClick = (direction) => {
        if (direction === 'next') {
            setFade(true);
            setTimeout(() => {
                setIndex((index + 1) % images.length);
                setFade(false);
            }, 100); 
        } else {
            setFade(true);
            setTimeout(() => {
                setIndex((index - 1 + images.length) % images.length);
                setFade(false);
            }, 300);
        }
    };

    return (
        <div>
            <div className='HomeContainer'>
                <div className='photocontiner'>
                    <button id="button1" onClick={() => handleClick("left")}>❮</button>
                    <img
                        id="Homeimges"
                        src={images[index]}
                        alt="Slideshow"
                        className={fade ? 'fade-in' : ''}
                    />
                    <button id="button2" onClick={() => handleClick("next")}>❯</button>
                </div>
                
                <div className='Homecontent'>
                    {Cardproduct.slice(0,6).map((item) => (
                        <Cardproducts 
                        key={(item.id)} 
                        title={item.homeEssentials.title}
                        p1={item.homeEssentials.p1}
                        p2={item.homeEssentials.p2}
                        p3={item.homeEssentials.p3}
                        p4={item.homeEssentials.p4}
                        img1={item.homeEssentials.img1}
                        img2={item.homeEssentials.img2}
                        img3={item.homeEssentials.img3}
                        img4={item.homeEssentials.img4}
                        />
                    ))}
                       {Cardoneproduct.slice(0,2).map((item) => (
                        <Cardproductsoneimg  
                        key={(item.id)} 
                        title={item.Cardproductsoneimg.title}
                        img={item.Cardproductsoneimg.img}
                        />
                    ))}
                    {cardscroling.slice(0,2).map((item) => (
                        <Cardscrolling  
                        key={(item.id)} 
                        title={item.cardscroling.title}
                        img1={item.cardscroling.img1}
                        img2={item.cardscroling.img2}
                        img3={item.cardscroling.img3}
                        img4={item.cardscroling.img4}
                        img5={item.cardscroling.img5}
                        img6={item.cardscroling.img6}
                        img7={item.cardscroling.img7}
                        img8={item.cardscroling.img8}
                        img9={item.cardscroling.img9}
                        img10={item.cardscroling.img10}
                        img11={item.cardscroling.img11}
                        img12={item.cardscroling.img12}
                        img13={item.cardscroling.img13}
                        img14={item.cardscroling.img14}
                        img15={item.cardscroling.img15}
                        img16={item.cardscroling.img16}
                        img17={item.cardscroling.img17}
                        img18={item.cardscroling.img18}
                        img19={item.cardscroling.img19}
                        />
                    ))}
                      {Cardproduct.slice(6,10).map((item) => (
                        <Cardproducts  
                        key={(item.id)} 
                        title={item.homeEssentials.title}
                        p1={item.homeEssentials.p1}
                        p2={item.homeEssentials.p2}
                        p3={item.homeEssentials.p3}
                        p4={item.homeEssentials.p4}
                        img1={item.homeEssentials.img1}
                        img2={item.homeEssentials.img2}
                        img3={item.homeEssentials.img3}
                        img4={item.homeEssentials.img4}
                        />
                    ))}
                     {cardscroling.slice(2,4).map((item) => (
                        <Cardscrolling  
                        key={(item.id)} 
                        title={item.cardscroling.title}
                        img1={item.cardscroling.img1}
                        img2={item.cardscroling.img2}
                        img3={item.cardscroling.img3}
                        img4={item.cardscroling.img4}
                        img5={item.cardscroling.img5}
                        img6={item.cardscroling.img6}
                        img7={item.cardscroling.img7}
                        img8={item.cardscroling.img8}
                        img9={item.cardscroling.img9}
                        img10={item.cardscroling.img10}
                        img11={item.cardscroling.img11}
                        img12={item.cardscroling.img12}
                        img13={item.cardscroling.img13}
                        img14={item.cardscroling.img14}
                        img15={item.cardscroling.img15}
                        img16={item.cardscroling.img16}
                        img17={item.cardscroling.img17}
                        img18={item.cardscroling.img18}
                        img19={item.cardscroling.img19}
                        />
                    ))}
                      {Cardproduct.slice(10,14).map((item) => (
                        <Cardproducts  
                        key={(item.id)} 
                        title={item.homeEssentials.title}
                        p1={item.homeEssentials.p1}
                        p2={item.homeEssentials.p2}
                        p3={item.homeEssentials.p3}
                        p4={item.homeEssentials.p4}
                        img1={item.homeEssentials.img1}
                        img2={item.homeEssentials.img2}
                        img3={item.homeEssentials.img3}
                        img4={item.homeEssentials.img4}
                        />
                    ))}
                     {cardscroling.slice(4,5).map((item) => (
                        <Cardscrolling
                        key={(item.id)}   
                        title={item.cardscroling.title}
                        img1={item.cardscroling.img1}
                        img2={item.cardscroling.img2}
                        img3={item.cardscroling.img3}
                        img4={item.cardscroling.img4}
                        img5={item.cardscroling.img5}
                        img6={item.cardscroling.img6}
                        img7={item.cardscroling.img7}
                        img8={item.cardscroling.img8}
                        img9={item.cardscroling.img9}
                        img10={item.cardscroling.img10}
                        img11={item.cardscroling.img11}
                        img12={item.cardscroling.img12}
                        img13={item.cardscroling.img13}
                        img14={item.cardscroling.img14}
                        img15={item.cardscroling.img15}
                        img16={item.cardscroling.img16}
                        img17={item.cardscroling.img17}
                        img18={item.cardscroling.img18}
                        img19={item.cardscroling.img19}
                        />
                    ))}
                </div>
            </div>
          
        </div>
        
    );
}

export default Home;
