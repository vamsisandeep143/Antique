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
    if (filteredItem) {
      setQuantity(filteredItem.qty || 1);
    }
  }, [filteredItem]);

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
      let addedCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
      const itemIndex = addedCartItems.findIndex(item => item.id === filteredItem.id);
      
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

      sessionStorage.setItem('cart', JSON.stringify(addedCartItems));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleClickMinus = () => {
    try {
      let addedCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
      const itemIndex = addedCartItems.findIndex(item => item.id === filteredItem.id);

      if (itemIndex !== -1) {
        const newQty = Math.max(0, addedCartItems[itemIndex].qty - 1);
        addedCartItems[itemIndex].qty = newQty;
        setQuantity(newQty);

        // Remove item from cart if qty is 0
        if (newQty === 0) {
          addedCartItems = addedCartItems.filter(item => item.id !== filteredItem.id);
        }

        sessionStorage.setItem('cart', JSON.stringify(addedCartItems));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return loading ? (
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
  ) : (
    <>
      <Container>
        <LeftColumn>
          <Magnify imageURL={filteredItem?.imageUrl} />
          <div>
            <h1>Antique type: {filteredItem?.txtVal.item}</h1>
            <h3>Antique Quantity: {quantity}</h3>
            <div className="qty">
              <button className="btn-minus" onClick={handleClickMinus}>
                <i className="fa fa-minus"></i>
              </button>
              <input type="text" value={quantity} readOnly />
              <button className="btn-plus" onClick={handleQuantityPlus}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </LeftColumn>
        <RightColumn>
          <h1>{filteredItem?.txtVal.item}</h1>
          <NavContainer>
            <StyledLink to="Description">Description</StyledLink>
            <StyledLink to="Specifications">Specifications</StyledLink>
          </NavContainer>
          <Outlet context = {filteredItem} />
          <Actions>
            {!isFavourite ? (
              <FavButton onClick={addToFavourites}>
                <i className="far fa-heart" style={{ fontSize: 'large' }}></i>
                <h4>Add To Favourites</h4>
              </FavButton>
            ) : (
              <FavButton onClick={removeFromFavourites}>
                <i className="fa-solid fa-heart" style={{ fontSize: 'large' }}></i>
                <h4>Remove from Favourites</h4>
              </FavButton>
            )}
            <CartButton onClick={async () => {
              await addToCart(filteredItem);

              let storedItems = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
              const itemIndex = storedItems.findIndex(item => item.id === filteredItem.id);
              
              if (itemIndex === -1) {
                storedItems.push({ ...filteredItem, qty: 1 });
              }

              sessionStorage.setItem('cart', JSON.stringify(storedItems));

              navigate('/add-to-cart');
            }}>
              <span>Add To Cart</span>
            </CartButton>
          </Actions>
        </RightColumn>
      </Container>
      <ChooseAlternatives />
      <Footer />
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
  justify-content: space-around;
  background: #ff6f61;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: #000;
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
  padding: 10px;
  border: none;
  background-color: #382925;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;

  span {
    font-size: 14px;
  }
`;
