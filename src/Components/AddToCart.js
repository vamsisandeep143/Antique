import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button, IconButton, Box, TextField } from '@mui/material';
import { AddShoppingCart, CheckBox } from '@mui/icons-material';
import { store } from "../App";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const [, , , cart,removeFromCart,,setTotal] = useContext(store);
  const navigate = useNavigate()

  const totalAmount=()=>{
    var amount =0
    cart?.map((data,i) => {
      amount = amount + 99
    })
    setTotal(amount)
    return amount
  }
  return (
    <div style={{width:'80%',margin:'auto'}}>
      {
        cart?.length >0 ? (
          <>
      <h2>Cart</h2>
      {cart?.map((data,i) => {
        console.log(data.item.imageUrl,"data")
        return (
          <>
        <div style={{ width:'100%',display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}>
            <div>
            <input key={data.item.id} type='checkbox' defaultChecked="true" onChange={()=>removeFromCart(data.item)} />
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'space-between',border:'1px solid #d3d3d3',alignItems:'center',margin:'20px',boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}>
                <div style={{display:'flex'}}>
                <div style={{width:'150px', display:'flex',justifyContent:'center',padding:'10px 0'}}>
                    <img src={data.item.imageUrl} style={{height:'150px',objectFit:'contain'}} alt={data.item.txtVal.item} />
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
                    <h4>{data.item.txtVal.item}</h4>
                </div>
                </div>
                <div style={{marginRight:'20px'}}>

                    {/* <h5>${data?.item.price}</h5> */}
                    <h5>${99}</h5>
                </div>
            </div>
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
          <button onClick={()=>navigate('/shop')}>Proceed to Checkout</button>
          </div>
    </>
        ):
        (
          <h2>No Products added to cart</h2>
        )
      }
    </div>
  );
};

export default AddToCart;
