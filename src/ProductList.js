import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { useLocation } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore'; 
import Product from "./Product";
import './ProuctList.css';

const ProductList = () => {
  const location = useLocation();
  const searchValue = location.state?.searchValue || '';
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
      setFilteredProducts(products);
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
  useEffect(() => {
    filterProducts();
}, [minPrice, maxPrice, selectedCategory, selectedRating, searchValue]);
  const filterProducts = () => {
    const minNum = parseFloat(minPrice) || 0; 
    const maxNum = parseFloat(maxPrice) || Infinity; 

    const filtered = Productdb.filter(product => {
        const priceString = product.Products.price.replace('$', '').trim();
        const price = parseFloat(priceString);

        const isWithinPriceRange = price >= minNum && price <= maxNum;
        const matchesCategory = selectedCategory ? product.Products.category === selectedCategory : true;
        
        const productName = product.Products.name?.toLowerCase() || '';
        const productCategory = product.Products.category?.toLowerCase() || '';
        const productDescription = product.Products.description?.toLowerCase() || ''; 
        
        const matchesSearchValue = searchValue 
            ? productName.includes(searchValue.toLowerCase()) || 
              productCategory.includes(searchValue.toLowerCase()) 
            : true;
        const matchesRating = selectedRating !== null ? product.Products.star === selectedRating : true;

        return isWithinPriceRange && matchesCategory && matchesRating && matchesSearchValue;
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
            productId={item.id}
            name={item.Products.name}
           about={item.Products.about}
           imges={item.Products.imges}
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