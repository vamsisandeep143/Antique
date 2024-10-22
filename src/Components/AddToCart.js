import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import { AddShoppingCart, CheckBox } from "@mui/icons-material";
import { store } from "../App";
import { useNavigate } from "react-router-dom";
// import {noCartIcon} from '../Assets/no-cart.png';
import noCartIcon from "../Assets/icons/cartdisable.png";
import "./AddToCart.css";

const AddToCart = () => {
  const [, , , cart, removeFromCart, , setTotal] = useContext(store);
  const navigate = useNavigate();

  const totalAmount = () => {
    var amount = 0;
    cart?.map((data, i) => {
      amount = amount + (parseInt(data?.item?.txtVal?.originalPrice || data?.txtVal?.originalPrice )*parseInt(data?.qty));
    });
    setTotal(amount);
    return amount;
  };
  return (
    <div className="container add-to-cart-page">
      <div className="cc-page-title">Add to Cart</div>
      <section className="row">
        {cart?.length > 0 ? (
          <>
            {cart?.map((data, i) => {
              return (
                <div className="col-lg-8 col-md-8">
                  <div className="addToCart-item-container">
                    <table className="cart-table table table-bordered">
                      <tr>
                        <th style={{ width: "50px" }}></th>
                        <th>Product Image</th>
                        <th>Details</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                      <tr>
                        <td>
                          <div className="input-block">
                            <label class="checkbox-container">
                              <input
                                key={data?.item?.id || data?.id}
                                type="checkbox"
                                checked="checked"
                                defaultChecked="true"
                                onChange={() => removeFromCart(data)}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="img-block">
                            <img
                              src={data?.item?.imageUrl || data?.imageUrl}
                              style={{ height: "150px", objectFit: "contain" }}
                              alt={data?.item?.txtVal?.item || data?.txtVal?.item}
                            />
                          </div>
                        </td>
                        <td align="left">{data?.item?.txtVal?.item || data?.txtVal?.item}</td>
                        <td>${data?.item?.txtVal?.originalPrice || data?.txtVal?.originalPrice}</td>
                        <td>{data?.qty}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            })}
            <div className="col-lg-4 col-md-4 text-center">
              {cart?.length > 0 && (
                <div style={{ textAlign: "center" }}>
                  <h4 className="mb-4">Total Amount $: {totalAmount()}</h4>
                </div>
              )}
              <button
                onClick={() => navigate("/shop")}
                className="custom-primary-btn mx-0"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="no-cart">
            <img src={noCartIcon} alt="no-cart" height={100} />
            <h2 className="no-cart-text">No Products added to cart</h2>
          </div>
        )}
      </section>
    </div>
  );
};

export default AddToCart;
