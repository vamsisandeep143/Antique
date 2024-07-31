import React, { useContext, useState } from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button, IconButton, Box, TextField } from '@mui/material';
import { AddShoppingCart, CheckBox } from '@mui/icons-material';
import { store } from "../App";
const AddToCart = () => {
  const [, , , cart] = useContext(store);
  console.log(cart[0], "contextData");
  return (
    <div>
      <h4>Add To Cart</h4>
      {cart?.map((data,i) => {
        console.log(data.item.imageUrl,"data")
        return (
            <div style={{ width:'80%',display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}>
            <div>
            <CheckBox />
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
            
        );
      })}
    </div>
  );
};

export default AddToCart;
