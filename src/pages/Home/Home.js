import React, { useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import ExploreCategory from '../../components/ExploreCategory/ExploreCategory';
import ProductsDisplay from '../../components/ProductsDisplay/ProductsDisplay';
import Footer from '../../components/Footer/Footer';

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
      <div className='home'>
        <Navbar/>
        <div className='header-container'>
          <Header/>
        </div>
        <ExploreCategory category={category} setCategory={setCategory}/>
        <ProductsDisplay category={category}/>
        <Footer/>
      </div>
  )
}

export default Home;