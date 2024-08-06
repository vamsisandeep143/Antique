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
const OurProducts = () => {
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
      console.log("Fetched Data our products:", allData);
      setData(allData);
      setFilteredData(allData);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  useEffect(() => {
    if (filteredValue !== "All") {
      const mapData = data.filter((item) => item.txtVal.item === filteredValue);
      setFilteredData(mapData);
    } else {
      setFilteredData(data);
    }
  }, [filteredValue, data]);

  const handlePriceFilter = (filterType) => {
    setActiveButton(filterType);
    setLoading(true);
    let sortedData = [...filteredData];
    if (filterType === "ascending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.originalPrice);
        const price2 = parseInt(b.txtVal.originalPrice);
        return price1 - price2;
      });
    } else if (filterType === "descending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.originalPrice);
        const price2 = parseInt(b.txtVal.originalPrice);
        return price2 - price1;
      });
    }
    setFilteredData(sortedData);
    setLoading(false);
  };
  const handleDiscountFilter = (filterType) => {
    setActiveButton(filterType);
    setLoading(true);
    let sortedData = [...filteredData];
    if (filterType === "discount-ascending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.discountPrice);
        const price2 = parseInt(b.txtVal.discountPrice);
        return price1 - price2;
      });
    } else if (filterType === "discount-descending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.discountPrice);
        const price2 = parseInt(b.txtVal.discountPrice);
        return price2 - price1;
      });
    }
    setFilteredData(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
    getData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <section className="our-products-page">
      <h1 className="our-products-page-title">Our Products</h1>

      <div className="all-image-container container">
        <div className="image-filter-container d-flex justify-content-end align-items-center">
          <h2 className="form-title">All Images</h2>
          <Select
            style={{ width: "300px" }}
            value={filteredValue}
            onChange={(e) => setFilteredValue(e.target.value)}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Brass"}>Brass</MenuItem>
            <MenuItem value={"Bronze"}>Bronze</MenuItem>
            <MenuItem value={"Furniture"}>Furniture</MenuItem>
          </Select>
        </div>
        {loading ? (
          <div className="loader">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="sort-container">
            <div style={{ display: "flex",position:'relative',marginBottom:'30px',alignItems:'center' }}>
              <h4 className="form-title px-4">Sort By</h4>
              <button
                className={`filterButton ${
                  activeButton === "descending" ? "active" : ""
                }`}
                onClick={() => handlePriceFilter("descending")}
              >
                Price (High-Low)
              </button>
              <button
                className={`filterButton ${
                  activeButton === "ascending" ? "active" : ""
                }`}
                onClick={() => handlePriceFilter("ascending")}
              >
                Price (Low-High)
              </button>
              <button
                className={`filterButton ${
                  activeButton === "discount-descending" ? "active" : ""
                }`}
                onClick={() => handleDiscountFilter("discount-descending")}
              >
                Discount (High-Low)
              </button>
              <button
                className={`filterButton ${
                  activeButton === "discount-ascending" ? "active" : ""
                }`}
                onClick={() => handleDiscountFilter("discount-ascending")}
              >
                Discount (Low-High)
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
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;
