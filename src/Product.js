import React from 'react'
function Product({img,price,star,rating,description}) {
  const stars=()=>{
    let starArr=[]
    for(let i=0;i<star;i++){
      starArr.push(<i class="fa fa-star checked"></i>)
    }
    for(let i=star;i<5;i++){
      starArr.push(<i class="fa fa-star" style={{ color: '#d9d7d7' }}></i>)
    }
    return starArr;
  }
  return (
    <div>
     <div className="containerProduct">
      <div className="cardProductg">
     
    
        <img className='imgProduct' src={img} />
        <div class="product-info">
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
       <button className='button-32' role="button">Add to cart</button>
       </div>
      </div>
    </div>
    </div>
  )
}

export default Product
