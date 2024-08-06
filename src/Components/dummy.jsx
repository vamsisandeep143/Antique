import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [, ,addToCart] = useContext(store);
  console.log(addToCart,"addToCart")
  const navigate = useNavigate()
  const getData = async () => {
    const valRef = collection(db, "textData");
    try {
      const dataDb = await getDocs(valRef);
      const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
      console.log("Fetched Data our products:", allData); // Debugging line
      setData(allData);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };
  useEffect(() => {
    data.map((item) => {
      if (item.id == productID) {
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
        
        // height: "calc(100vh - 80px)",
      }}
    >
      <CircularProgress style={{ color: "#382925" }} />
    </Box>
  ) : (
    <>
    <div
      style={{
        display: "flex",
        backgroundColor: "#f6f3f2",
        // height: "calc(100vh - 80px)",
        height:'100%'
      }}
    >
      <div
        style={{
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          backgroundColor: "#f6f3f2",
        }}
      >
        <Magnify imageURL={filteredItem?.imageUrl} />
        <div className="productPrice">
                {filteredItem.txtVal.discountPrice ? (
                    <div style={{display:'flex',justifyContent:'center',margin:'10px 10px 0 10px',color: "#382925"}}>
                        <h3>Price: ${filteredItem.txtVal.originalPrice}</h3>
                        {/* <h2>Price:</h2><span className="originalPrice">${filteredItem.txtVal.originalPrice}</span> */}
                        {/* <span className="finalPrice">${filteredItem.txtVal.discountPrice}</span> */}
                    </div>

                ) : (
                    <span className="finalPrice">${filteredItem.txtVal.originalPrice}</span>
                )}
                <span style={{display:'flex',justifyContent:'center',color: "#382925",fontSize:'12px'}}>( Delivery not available.Only PickUp )</span>
            </div>
      </div>
      <div
        style={{
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
        //   margin: "2rem",
          padding: "2rem",
          backgroundColor: "#f6f3f2",
          color: "#382925",
          fontSize: "16px",
        //   border:'1px solid #382925'
        }}
      >
        <h1>{filteredItem?.txtVal.description}</h1>
        <p>
          Step back in time with this exquisite Antique Victorian Silver Pocket
          Watch, a true testament to the elegance and craftsmanship of the 19th
          century. This meticulously preserved timepiece, dating back to the
          late 1800s, boasts a stunning sterling silver case adorned with
          intricate floral engravings, showcasing the exceptional artistry of
          the Victorian era.
        </p>
        <p>
          The watch features a pristine porcelain dial with Roman numerals and
          delicate blued steel hands, encased in a crystal-clear glass cover.
          Its mechanical movement is a marvel of precision engineering, offering
          a glimpse into the ingenuity of watchmakers from a bygone era. The
          back cover opens to reveal the inner workings, allowing you to
          appreciate the intricate details and craftsmanship that have stood the
          test of time.
        </p>
        <p>
          This antique pocket watch is more than just a timekeeper; it's a piece
          of history, a conversation starter, and a collector's dream. Whether
          you're an avid collector of antique timepieces or simply appreciate
          the beauty of Victorian craftsmanship, this silver pocket watch is a
          timeless treasure that will add a touch of sophistication and charm to
          any collection. Don't miss the opportunity to own a piece of history
          that transcends generations and tells a story of elegance and
          refinement.
        </p>
        <div style={{marginTop:'20px',display:'flex', justifyContent:'space-between',alignItems:'center'}}>
          {!isFavourite ? (
            <div style={{display:'flex',alignItems:'center'}}>
            <i className="far fa-heart" style={{fontSize:'large'}} onClick={addToFavourites}></i>
            <h4 style={{marginLeft:'10px'}}>Add To Favourites</h4>
            </div>
          ) : (
            <div style={{display:'flex',alignItems:'center'}}>
            <i className="fa-solid fa-heart" style={{fontSize:'large'}} onClick={removeFromFavourites}></i>
            <h4 style={{marginLeft:'10px'}}>Remove from Favourites</h4>
            </div>
          )}
            <button style={{padding:'10px',border:'none',backgroundColor:'#382925',color:'#fff',borderRadius:'5px'}} 
            onClick={async() => {
              await addToCart(filteredItem)
              navigate('/add-to-cart')
            }}
            >
                <span style={{fontSize:'14px'}}>Add To Cart</span>
            </button>
        </div>

        </div>
      </div> 
      <ChooseAlternatives />
      <Footer />
      </>
  );
};

export default ProductDetails;
