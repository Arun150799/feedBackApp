import React from 'react';
import Nav from './Nav';
import './Listing.css';
import Banner from './Banner';
import ProductList from './ProductList';

const Listing = () => {
  return (
    <div>
      <Nav/>
      <Banner/>
      <ProductList/>

    </div>
  )
}

export default Listing
