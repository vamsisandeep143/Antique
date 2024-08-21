import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app, { db } from "./Firebase";
import { Box, Grid, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "./Card.css";
import "./OurProducts.css";

const Blogs = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredValue, setFilteredValue] = useState("All");
  const [activeButton, setActiveButton] = useState("");
  const navigate = useNavigate();

  const fetchImages = async () => {
    const storage = getStorage(app);
    const listRef = ref(storage, "images/");

    try {
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setImages(urls);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    const valRef = collection(db, "textData");
    try {
      const dataDb = await getDocs(valRef);
      const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
  
      // Calculate the date 3 days ago from today
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
      // Filter items created within the last 3 days
      const filteredByLastThreeDays = allData.filter((item) => {
        const itemDate = new Date(item.txtVal.createdDate);
        return itemDate >= threeDaysAgo;
      });
  
      setData(allData);  // Store the full data set
      setFilteredData(filteredByLastThreeDays);
      console.log(filteredData+"filteredData");
      // Store the filtered data
  
      setLoading(false);  // Stop loading once data is set
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };
  
  useEffect(() => {
    fetchImages();
    getData();  // Load data on component mount
  }, []);
  

  // const getData = async () => {
  //   const valRef = collection(db, "textData");
  //   try {
  //     const dataDb = await getDocs(valRef);
  //     const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
  //   //  console.log("Fetched Data our products:", allData);
  //     setData(allData);
  //     setFilteredData(allData);
  //   } catch (error) {
  //    // console.error("Error fetching data from Firestore:", error);
  //   }
  // };

  // const handleLastThreeDaysFilter = () => {
  //   setLoading(true);
    
  //   // Calculate the date 3 days ago from today
  //   const threeDaysAgo = new Date();
  //   console.log(threeDaysAgo+'Test data');
  //   threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
  //   // Filter items created within the last 3 days
  //   const filteredByLastThreeDays = data.filter((item) => {
  //     const itemDate = new Date(item.txtVal.createdDate);
  //     console.log(itemDate+'itemDate');
  //     return itemDate < threeDaysAgo;
  //   });
  
  //   setFilteredData(filteredByLastThreeDays);
  //   console.log(filteredByLastThreeDays);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchImages();
  //   getData();
  //   handleLastThreeDaysFilter();
  // }, []);

  //console.log(JSON.stringify(filteredData)+ "filteredData");

 
 

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <section className="our-products-page">
      <h1 className="our-products-page-title">New Antique Arrivals</h1>

      {/* <div className="all-image-container container">
        <div className="image-filter-container d-flex justify-content-end align-items-center">

        </div>
        {loading ? (
          <div className="loader">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="sort-container">
            <div style={{ display: "flex", position: 'relative', marginBottom: '30px', alignItems: 'center' }}>
              <h4 className="form-title px-4">Sort By</h4>
              <button
                className={`filterButton ${activeButton === "descending" ? "active" : ""}`}
                onClick={() => handlePriceFilter("descending")}
              >
                Price (High-Low)
              </button>
              <button
                className={`filterButton ${activeButton === "ascending" ? "active" : ""}`}
                onClick={() => handlePriceFilter("ascending")}
              >
                Price (Low-High)
              </button>
              <button
                className={`filterButton ${activeButton === "discount-descending" ? "active" : ""}`}
                onClick={() => handleDiscountFilter("discount-descending")}
              >
                Discount (High-Low)
              </button>
              <button
                className={`filterButton ${activeButton === "discount-ascending" ? "active" : ""}`}
                onClick={() => handleDiscountFilter("discount-ascending")}
              >
                Discount (Low-High)
              </button>
              <button
                className={`filterButton ${activeButton === "date-descending" ? "active" : ""}`}
                onClick={() => handleDateFilter("date-descending")}
              >
                Date (Newest)
              </button>
              <button
                className={`filterButton ${activeButton === "date-ascending" ? "active" : ""}`}
                onClick={() => handleDateFilter("date-ascending")}
              >
                Date (Oldest)
              </button>
            </div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {filteredData?.map((item, index) => (
                  <Grid
                    className="productCard"
                    item
                    xs={4}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <Item>
                      <img
                        src={item.imageUrl}
                        alt={index}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                        }}
                      />
                      <h5>{item.txtVal.description}</h5>
                      <h5>{item.txtVal.originalPrice}</h5>
                      <h5 className="discountBadge">
                        {item.txtVal.discountPrice + " " + "OFF /-"}
                      </h5>
                      <p>{new Date(item.txtVal.createdDate).toLocaleDateString()}</p>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        )}
      </div> */}
      <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {filteredData?.map((item, index) => (
                  <Grid
                    className="productCard"
                    item
                    xs={4}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <Item>
                      <img
                        src={item.imageUrl}
                        alt={index}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                        }}
                      />
                      <h5>{item.txtVal.description}</h5>
                      <h5>{item.txtVal.originalPrice}</h5>
                      <h5 className="discountBadge">
                        {item.txtVal.discountPrice + " " + "OFF /-"}
                      </h5>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
    </section>
  );
};

export default Blogs;
