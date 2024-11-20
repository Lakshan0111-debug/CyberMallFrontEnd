import React, { useContext } from 'react';
import './ProductsDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';

const ProductsDisplay = ({category}) => {

  const {products_list} = useContext(StoreContext)

  return (
    <div className='products-display' id='products-display'>
      <h2>Top Products</h2>
      <div className='products-display-list'>
        {products_list.map((item,index)=>{
          {console.log(category,item.category);}
          if (category==="All" || category===item.category) {
            return <ProductItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        })}
      </div>
    </div>
  )
}

export default ProductsDisplay;