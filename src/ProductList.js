import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore'; 
import Product from "./Product";
import './ProuctList.css';

const ProductList = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [Productdb, setProductdb] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProductdb = () => {
    const productCollectionRef = collection(db, 'Products');

    onSnapshot(productCollectionRef, (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        Products: doc.data()
      }));
      setProductdb(products);
      setFilteredProducts(products); // Initially show all products
    }, (error) => {
      console.error("Error fetching products: ", error);
    });
  };

  useEffect(() => {
    getProductdb(); 
  }, []);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    filterProducts(e.target.value, maxPrice, selectedCategory, selectedRating);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    filterProducts(minPrice, e.target.value, selectedCategory, selectedRating);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(minPrice, maxPrice, category, selectedRating);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    filterProducts(minPrice, maxPrice, selectedCategory, rating);
  };

  const filterProducts = (min, max, category, rating) => {
    const minNum = parseFloat(min) || 0; 
    const maxNum = parseFloat(max) || Infinity; 

    const filtered = Productdb.filter(product => {
      const priceString = product.Products.price.replace('$', '').trim();
      const price = parseFloat(priceString);

      const isWithinPriceRange = price >= minNum && price <= maxNum;
      const matchesCategory = category ? product.Products.category === category : true;
      const matchesRating = rating !== null ? product.Products.star === rating : true;

      return isWithinPriceRange && matchesCategory && matchesRating;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className='ProductListMean'>
      <div className="product-list-nav">
        <div className="Category">
          <h2>Category</h2>
          <p onClick={() => handleCategoryChange('kitchen')} style={{ cursor: 'pointer' }}>Kitchen</p>
          <p onClick={() => handleCategoryChange('PC')} style={{ cursor: 'pointer' }}>PC</p>
          <p onClick={() => handleCategoryChange('home')} style={{ cursor: 'pointer' }}>Home</p>
        </div>
        <div className="product-list-rating">
          <h2>Rating</h2>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div 
              key={rating} 
              onClick={() => handleRatingChange(rating)} 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <i 
                  key={index} 
                  className={`fa fa-star ${index < rating ? 'checked' : ''}`} 
                  style={{ color: selectedRating === rating && index < rating ? '#f0c14b' : '#d9d7d7' }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="product-list-price">
          <input 
            type="number" 
            placeholder="Min Price" 
            value={minPrice} 
            onChange={handleMinPriceChange}
            className="price-input"
          />
          <input 
            type="number" 
            placeholder="Max Price" 
            value={maxPrice} 
            onChange={handleMaxPriceChange}
            className="price-input"
          />
        </div>
      </div>
      <div className='productholder'>
        {filteredProducts.map((item,index) => (
          <Product  
            key={item.id}
            productId={item.Products.description} 
            img={item.Products.img}
            price={item.Products.price}
            star={item.Products.star}
            rating={item.Products.rating}
            description={item.Products.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;