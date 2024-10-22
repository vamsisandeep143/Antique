import React, { useContext, useEffect, useState } from "react";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import {CustomTab} from './CustomTab'
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Magnify from "./Magnify";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import Footer from "./Footer";
import { store } from "../App";
import ChooseAlternatives from "./ChooseAlternatives";

const ProductDetails = () => {
  const { productID } = useParams();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [filteredItem, setFilteredItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [, , addToCart] = useContext(store);
  const navigate = useNavigate();
  const [, , , cart, removeFromCart, , setTotal] = useContext(store);
  const getData = async () => {
    const valRef = collection(db, "textData");
    try {
      const dataDb = await getDocs(valRef);
      const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
      setData(allData);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  useEffect(() => {
    data.forEach((item) => {
      if (item.id === productID) {
        setFilteredItem(item);
        setLoading(false);
      }
    });
  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
    if (filteredItem) {
        const productData = JSON.parse(sessionStorage.getItem("cart"));
        const reqQty = productData?.find((item) => {
          return item.id === filteredItem.id;
        });
  
        if (reqQty) {
          setQuantity(reqQty.qty);
        } else {
          setQuantity(1);
    }
      }
    };
  
    fetchData();
  }, [filteredItem, cart]);

  const addToFavourites = () => {
    setIsFavourite(!isFavourite);
    toast.success("Added to Favourites");
  };

  const removeFromFavourites = () => {
    setIsFavourite(!isFavourite);
    toast.error("Removed from Favourites");
  };

  const handleQuantityPlus = () => {
    try {
      let addedCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
      const itemIndex = addedCartItems.findIndex(
        (item) => item.id === filteredItem.id
      );

      if (itemIndex === -1) {
        // Item not in cart, add it with quantity 1
        const newItem = { ...filteredItem, qty: 1 };
        addedCartItems.push(newItem);
        setQuantity(1);
      } else {
        // Item already in cart, increment its quantity
        const newQty = addedCartItems[itemIndex].qty + 1;
        addedCartItems[itemIndex].qty = newQty;
        setQuantity(newQty);
      }

      sessionStorage.setItem("cart", JSON.stringify(addedCartItems));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleClickMinus = () => {
    try {
      let addedCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
      const itemIndex = addedCartItems.findIndex(
        (item) => item.id === filteredItem.id
      );

      if (itemIndex !== -1) {
        const newQty = Math.max(0, addedCartItems[itemIndex].qty - 1);
        addedCartItems[itemIndex].qty = newQty;
        setQuantity(newQty);

        // Remove item from cart if qty is 0
        if (newQty === 0) {
          addedCartItems = addedCartItems.filter(
            (item) => item.id !== filteredItem.id
          );
        }

        sessionStorage.setItem("cart", JSON.stringify(addedCartItems));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  console.log("filteredItem" + JSON.stringify(filteredItem));

  return loading ? (
    <div className="custom-loader">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress style={{ color: "#382925" }} />
      </Box>
    </div>
  ) : (
    <>
      <div className="container pt-5">
        <section className="row">
          <div className="col-lg-6 col-md-6 text-center">
            <section className="w-100 position-relative mx-auto">
              <Magnify imageURL={filteredItem?.imageUrl} />
            </section>
          </div>
          <div className="col-lg-6 col-md-6">
            <section className="pt-5">
              <h1 className="product_title">{filteredItem?.txtVal.item}</h1>
              <section className="product_tab">
                <NavContainer>
                  <StyledLink to="/product/${productID}">Description</StyledLink>
                  <StyledLink to="Specifications">Specifications</StyledLink>
                </NavContainer>
                <div className="d-flex p-4 justify-content-start tab-info">
                <Outlet context={filteredItem} />
                </div>
              </section>
              <Actions>
                {!isFavourite ? (
                  <div className="add-to-wishlist" onClick={addToFavourites}>
                    <i
                      className="far fa-heart"
                      style={{ fontSize: "large" }}
                    ></i>
                    <h4 className="m-3">Add To Favourites</h4>
                  </div>
                ) : (
                  <FavButton onClick={removeFromFavourites}>
                    <i
                      className="fa-solid fa-heart"
                      style={{ fontSize: "large" }}
                    ></i>
                    <h4>Remove from Favourites</h4>
                  </FavButton>
                )}
                <CartButton
                  onClick={async () => {
                    await addToCart(filteredItem,quantity);

                    let storedItems = sessionStorage.getItem("cart")
                      ? JSON.parse(sessionStorage.getItem("cart"))
                      : [];
                    const itemIndex = storedItems.findIndex(
                      (item) => item.id === filteredItem.id
                    );

                    if (itemIndex === -1) {
                      storedItems.push({ ...filteredItem, qty: 1 });
                    }

                    sessionStorage.setItem("cart", JSON.stringify(storedItems));

                    navigate("/add-to-cart");
                  }}
                >
                  <span>Add To Cart</span>
                </CartButton>
              </Actions>
            </section>

            <div className="prd-info-details">
              <h1 className="product_single_vendor">
                Antique type: {filteredItem?.txtVal.item}
              </h1>
              <h3 className="product_single_vendor form_label">
                Antique Quantity: {quantity}
              </h3>
              <div className="quantity">
                <button className="quantity_button" onClick={handleClickMinus}>
                  <i className="fa fa-minus"></i>
                </button>
                <input
                  type="text"
                  className="quantity_input"
                  value={quantity}
                  readOnly
                />
                <button
                  className="quantity_button"
                  onClick={handleQuantityPlus}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="container">
        <ChooseAlternatives />
      </section>      
    </>
  );
};

export default ProductDetails;

const Container = styled.div`
  display: flex;
  background-color: #f6f3f2;
  height: 100%;
`;

const LeftColumn = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f6f3f2;
`;

const RightColumn = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f6f3f2;
  color: #382925;
  font-size: 16px;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: start;
  text-align: center;
  border: 1px solid #e9e9e9;
  background-color: #fff;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  text-decoration: none;
  color: #232323;
  padding: 9px 12px;
  border: 1px solid transparent;
  background: #f5f5f5;
  letter-spacing: 1px;
  text-decoration: none;
  -webkit-transition: all 0.9s;
  -moz-transition: all 0.9s;
  -o-transition: all 0.9s;
  transition: all 0.9s;
  font-size: 14px;
  font-weight: 500;
margin-right:5px;
  &:hover {
    background-color: #055d6b;;
    color: #ffffff;
    text-decoration: none;
  }
  &.active {
    background-color: #055d6b;;
    color: #ffffff;
    text-decoration: none;
  }
`;

const Actions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FavButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h4 {
    margin-left: 10px;
  }
`;

const CartButton = styled.button`
  width: 45%;
  margin: 0 5px;
  padding: 15px 20px;
  background: #055d6b;
  color: #ffffff;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  font-weight: 400;

  span {
    font-size: 14px;
  }
`;
