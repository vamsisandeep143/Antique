import React from 'react';
import './Specifications.css';
import { useOutletContext } from 'react-router-dom';

const Specifications = () => {

  const filteredItem = useOutletContext();
  return (
    <div >
      <p>Specifications</p>
      <p>Item: {filteredItem?.txtVal?.item}</p>
      <p>Original Price: {filteredItem?.txtVal?.originalPrice}</p>
      <p>Discount Price: {filteredItem?.txtVal?.discountPrice}</p>
    
    </div>
  )
}

export default Specifications