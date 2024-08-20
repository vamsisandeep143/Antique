import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button, IconButton, Box, TextField } from '@mui/material';
import { AddShoppingCart, CheckBox } from '@mui/icons-material';
import { store } from "../App";
import { useNavigate } from "react-router-dom";
// import {noCartIcon} from '../Assets/no-cart.png';  
import noCartIcon from "../Assets/icons/cartdisable.png";
import './AddToCart.css'

const AddToCart = () => {
  const [, , , cart,removeFromCart,,setTotal] = useContext(store);
  const navigate = useNavigate()

  console.log('cart'+JSON.stringify(cart));

  const totalAmount=()=>{
    var amount =0
    cart?.map((data,i) => {
      
      amount = amount + parseInt(data.item.txtVal.originalPrice)
    })
    setTotal(amount)
    return amount
  }
  return (
    <div className="container add-to-cart-page">
      {
        cart?.length >0 ? (
          <>
      <h2 className="title">Cart</h2>
      {cart?.map((data,i) => {
        console.log(data.item.imageUrl,"data")
        return (
          <>
        <div className="addToCart-item-container">
          <table className="cart-table">
            <tr>
              <th style={{width:'50px'}}></th>
              <th>Product Image</th>
              <th>Details</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>
              <div className="input-block">
              <label class="checkbox-container">                
                <input key={data.item.id} type='checkbox' checked="checked" defaultChecked="true" onChange={()=>removeFromCart(data.item)} />
                <span class="checkmark"></span>
              </label>
            
            </div>
              </td>
              <td>
              <div className="img-block">
                    <img src={data.item.imageUrl} style={{height:'150px',objectFit:'contain'}} alt={data.item.txtVal.item} />
                </div>
              </td>
              <td align="left">
              <div style={{display:'flex',justifyContent:'start',alignItems:'center',}}>
                    <h4>{data.item.txtVal.item}</h4>
                </div>
              </td>
              <td><h5>${data.item.txtVal.originalPrice}</h5></td>
            </tr>
          </table>
            </div>
             </>
            
        );
      })}
        <div style={{textAlign:'right'}}>
          {
           cart?.length>0 && <div style={{textAlign:'right'}}>
            <h4 style={{marginRight:'40px'}}>
            Total Amount $: {totalAmount()}
    
            </h4>
          </div>
    }
          <button onClick={()=>navigate('/shop')} className="btn custom-btn-primary">Proceed to Checkout</button>
          </div>
    </>
        ):
        (
          <div className="no-cart">
            <img src={noCartIcon} alt="no-cart" height={100} />
            <h2 className="no-cart-text">No Products added to cart</h2>
            </div>
        )
      }
    </div>
  );
};

export default AddToCart;
