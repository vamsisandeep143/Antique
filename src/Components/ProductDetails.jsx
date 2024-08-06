import React, { useContext, useEffect, useState } from "react";
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
  const [filteredItem, setFilteredItem] = useState();
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
    data.map((item) => {
      if (item.id === productID) {
        setFilteredItem(item);
        setLoading(false);
      }
    });
  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  const addToFavourites = () => {
    setIsFavourite(!isFavourite);
    toast.success("Added to Favourites");
  };

  const removeFromFavourites = () => {
    setIsFavourite(!isFavourite);
    toast.error("Removed from Favourites");
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
      {/* <Container>
        <LeftColumn>
          <Magnify imageURL={filteredItem?.imageUrl} />
          <div>
            <h1>Antique type : {filteredItem?.txtVal.item}</h1>
            <h3>Antique Quantity {filteredItem?.txtVal.item}</h3>
            <div class="qty">
              <button class="btn-minus"><i class="fa fa-minus"></i></button>
              <input type="text" value="1" />
              <button class="btn-plus"><i class="fa fa-plus"></i></button>
            </div>



          </div>
        </LeftColumn>
        <RightColumn>
          <h1>{filteredItem?.txtVal.item}</h1>
          <NavContainer>
            <StyledLink to="Description">Description</StyledLink>
            <StyledLink to="Specifications">Specifications</StyledLink>
          </NavContainer>
          <Outlet />
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
              navigate('/add-to-cart');
            }}>
              <span>Add To Cart</span>
            </CartButton>
          </Actions>
        </RightColumn>
      </Container>
      <ChooseAlternatives /> */}
       <div className="container product-details-page">
        <section className="product-details-container">
          <div className="image-container">
            <Magnify imageURL={filteredItem?.imageUrl} />
          </div>
          <div className="info-container">
            <h1 className="product-name">{filteredItem?.txtVal.item}</h1>
            <p className="product-description">
              Step back in time with this exquisite Antique Victorian Silver
              Pocket Watch, a true testament to the elegance and craftsmanship
              of the 19th century. This meticulously preserved timepiece, dating
              back to the late 1800s, boasts a stunning sterling silver case
              adorned with intricate floral engravings, showcasing the
              exceptional artistry of the Victorian era.
            </p>
            <p className="product-description">
              The watch features a pristine porcelain dial with Roman numerals
              and delicate blued steel hands, encased in a crystal-clear glass
              cover. Its mechanical movement is a marvel of precision
              engineering, offering a glimpse into the ingenuity of watchmakers
              from a bygone era. The back cover opens to reveal the inner
              workings, allowing you to appreciate the intricate details and
              craftsmanship that have stood the test of time.
            </p>
            <p className="product-description">
              This antique pocket watch is more than just a timekeeper; it's a
              piece of history, a conversation starter, and a collector's dream.
              Whether you're an avid collector of antique timepieces or simply
              appreciate the beauty of Victorian craftsmanship, this silver
              pocket watch is a timeless treasure that will add a touch of
              sophistication and charm to any collection. Don't miss the
              opportunity to own a piece of history that transcends generations
              and tells a story of elegance and refinement.
            </p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!isFavourite ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="far fa-heart"
                    style={{ fontSize: "large" }}
                    onClick={addToFavourites}
                  ></i>
                  <h4 style={{ marginLeft: "10px" }}>Add To Favourites</h4>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="fa-solid fa-heart"
                    style={{ fontSize: "large" }}
                    onClick={removeFromFavourites}
                  ></i>
                  <h4 style={{ marginLeft: "10px" }}>Remove from Favourites</h4>
                </div>
              )}
              <button
                style={{
                  padding: "10px",
                  border: "none",
                  backgroundColor: "#382925",
                  color: "#fff",
                  borderRadius: "5px",
                }}
                onClick={async () => {
                  await addToCart(filteredItem);
                  navigate("/add-to-cart");
                }}
              >
                <span style={{ fontSize: "14px" }}>Add To Cart</span>
              </button>
            </div>
            <section className="container-fluid">
            <ChooseAlternatives/>
            </section>
          </div>
        </section>
      </div>
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
