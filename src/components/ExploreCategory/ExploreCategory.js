import React from 'react';
import './ExploreCategory.css';
import { category_list } from '../../assets/ExploreCategorySource';

const ExploreCategory = ({category,setCategory}) => {
  return (
    <div className='explore-category' id='explore-category'>
      <h1>Explore Our Products</h1>
      <p className='explore-category-text'>Choose From A Diverse Catalog Featuring A Delectable Array Of Products. Our Mission Is To Satisfy Your Cravings And Elevate Your Lifestyle.</p>
      <div className='explore-category-list'>
        {category_list.map((item,index)=>{
          return (
            <div onClick={()=>setCategory(prev=>prev===item.category_name?"All":item.category_name)} key={index} className='explore-category-list-item'>
              <img className={category===item.category_name?"active":""} src={item.category_image} alt=''/>
              <p>{item.category_name}</p>
            </div>
          )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreCategory;