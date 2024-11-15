import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app, { db } from "./Firebase";
import { Box, Grid, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import packageIcon from '../Assets/icons/no-truck.png'
import { Button } from "reactstrap";
import "./Card.css";
import "./OurProducts.css";
const OurProducts = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type } = useParams();
  console.log({type})
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filteredValue, setFilteredValue] = useState(type ? type : "All");
  const [activeButton, setActiveButton] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(10);
  const lastImageIndex = currentPage * imagesPerPage;
  const firstImageIndex = lastImageIndex - imagesPerPage;
  const currentImages = filteredImages.slice(firstImageIndex, lastImageIndex);
  const navigate = useNavigate();

  

  // console.log({ params })
  // const fetchImagesAndData = async () => {
  //   const storage = getStorage(app);
  //   const folderCollection = collection(db, "folders");
  //   const valRef = collection(db, "textData");

  //   try {
  //     // Fetch data from Firestore
  //     const dataDb = await getDocs(valRef);
  //     const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
      
  //     // Fetch image URLs
  //     const res = await listAll(listRef);
  //     const urls = await Promise.all(res.items.map((item) => getDownloadURL(item)));

  //     // Combine image URLs with data
  //     const updatedData = allData.map((item, index) => ({
  //       ...item,
  //       imageUrl: urls[index] || "", // Add the image URL to each item
  //     }));

  //     setData(updatedData);
  //     setFilteredData(updatedData);
  //     setFilteredImages(updatedData);
  //   } catch (error) {
  //     console.error("Error fetching data or images:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchImagesAndData = async () => {
    const storage = getStorage(app);
    const allImages = [];
    const valRef = collection(db, "textData");
    const folderCollection = collection(db, "folders");
    console.log("data");

    try {
        // Fetch data from Firestore
        const dataDb = await getDocs(valRef);
        
        const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
        const imagesRef = ref(storage, "images");
        const folderList = await listAll(imagesRef);

        console.log(JSON.stringify(folderList)+"folderList");

        // Fetch folder names
        const folderSnapshot = await getDocs(folderCollection);
        console.log(JSON.stringify(folderSnapshot.docs)+'data2')
        const folderNames = folderSnapshot.docs.map(doc => doc.data().name);
        console.log("data1"+folderNames);
       

        // Loop through each folder and fetch images
        for (const folderName of folderNames) {
            const folderRef = ref(storage, `images/${folderName}`);
            const folderItems = await listAll(folderRef);
            console.log("data1"+folderItems);

            // const folderImages = await Promise.all(
            //     folderItems.items.map(item => getDownloadURL(item))
            // );
            // List all folders in the 'images' directory
         //   console.log(folderRef.prefixes,"folderref");
    const folderList = await listAll(folderRef);

    for (const folderRef of folderList.prefixes) { // folderList.prefixes contains sub-folders
      const folderName = folderRef.name;

      console.log("Found folder:", folderName);

      // List items (images) in each folder
      const folderItems = await listAll(folderRef);
      console.log(`Items in Folder ${folderName}:`, folderItems);

      const folderImages = await Promise.all(
        folderItems.items.map((item) => getDownloadURL(item))
      );

      // Add images with folder context
      allImages.push(...folderImages.map((url) => ({ url, folder: folderName })));
    }

            // Add images with folder context
            //console.log("folder Items"+folderImages.url);
           // allImages.push(...folderImages.map(url => ({ url, folder: folderName })));
        }

        // Combine images and data
        const updatedData = allData.map((item, index) => ({
            ...item,
            imageUrl: allImages[index]?.url || "", // Add the image URL to each item
            folder: allImages[index]?.folder || "", // Add folder information
        }));

        console.log(updatedData+"updatedData")

        setData(updatedData);
        setFilteredData(updatedData);
        setFilteredImages(updatedData);
    } catch (error) {
        console.error("Error fetching data or images:", error);
    } finally {
        setLoading(false);
    }
};

// const fetchImagesAndData = async () => {
//   const storage = getStorage(app);
//   const allImages = [];

//   try {
//     // Reference to the 'images' directory
//     const valRef = collection(db, "textData");
//     const imagesRef = ref(storage, "images");

//     const dataDb = await getDocs(valRef);
//     const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));

//     // List all folders in the 'images' directory
//     const folderList = await listAll(imagesRef);

//     for (const folderRef of folderList.prefixes) { // folderList.prefixes contains sub-folders
//       const folderName = folderRef.name;
//       console.log("Found folder:", folderName);

//       // List items (images) in each folder
//       const folderItems = await listAll(folderRef);
//       console.log(`Items in Folder ${folderName}:`, folderItems);

//       const folderImages = await Promise.all(
//         folderItems.items.map((item) => getDownloadURL(item))
//       );

//       // Add images with folder context
//       allImages.push(...folderImages.map((url) => ({ url, folder: folderName })));
//     }

//     // Here you can combine allImages with your other data if needed
//     setData(allImages);
//     setFilteredData(allImages);
//     setFilteredImages(allImages);
//   } catch (error) {
//     console.error("Error fetching images from Firebase Storage:", error);
//   } finally {
//     setLoading(false);
//   }
// };


  useEffect(() => {
    fetchImagesAndData();
  }, []);


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
    const filtered = filteredValue !== "All"
      ? data.filter((item) => item.txtVal.item === filteredValue)
      : data;
    setFilteredImages(filtered);
  }, [filteredValue, data]);

  const handlePriceFilter = (filterType) => {
    setActiveButton(filterType);
    setLoading(true);
    let sortedData = [...filteredData];
    if (filterType === "ascending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.originalPrice,10)|| 0;
        const price2 = parseInt(b.txtVal.originalPrice,10)|| 0;
        return price1 - price2;
      });
    } else if (filterType === "descending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.originalPrice);
        const price2 = parseInt(b.txtVal.originalPrice);
        return price2 - price1;
      });
    }
    setFilteredImages(sortedData);
    setLoading(false);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleDiscountFilter = (filterType) => {
    setActiveButton(filterType);
    setLoading(true);
    let sortedData = [...filteredData];
    if (filterType === "discount-ascending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.discountPrice,10) || 0;
        const price2 = parseInt(b.txtVal.discountPrice,10) || 0;
        return price1 - price2;
      });
    } else if (filterType === "discount-descending") {
      sortedData.sort((a, b) => {
        const price1 = parseInt(a.txtVal.discountPrice,10) || 0;
        const price2 = parseInt(b.txtVal.discountPrice,10)|| 0;
        return price2 - price1;
      });
    }
    setFilteredImages(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);


  useEffect(()=>{
    if(type){
      setFilteredValue(type)
    }
  }, [type])

  console.log(JSON.stringify(currentImages)+'dhdhdhf');

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  console.log(JSON.stringify(currentImages),'currentImages');

  return (
    <section className="our-products-page">
      <h1 className="cc-page-title">Our Products</h1>

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
          <div className="sidebar">
            <div className="left_column">
              <h4 className="sidebar-title">Sort By</h4>
              <button
                className={`filterButton ${activeButton === "descending" ? "active" : ""
                  }`}
                onClick={() => handlePriceFilter("descending")}
              >
                Price (High-Low)
              </button>
              <button
                className={`filterButton ${activeButton === "ascending" ? "active" : ""
                  }`}
                onClick={() => handlePriceFilter("ascending")}
              >
                Price (Low-High)
              </button>
              <button
                className={`filterButton ${activeButton === "discount-descending" ? "active" : ""
                  }`}
                onClick={() => handleDiscountFilter("discount-descending")}
              >
                Discount (High-Low)
              </button>
              <button
                className={`filterButton ${activeButton === "discount-ascending" ? "active" : ""
                  }`}
                onClick={() => handleDiscountFilter("discount-ascending")}
              >
                Discount (Low-High)
              </button>
            </div>
          
            <div className="right_column">
              <section className="conatiner-fluid w-100">
                <div className="row">
                  {currentImages?.map((item, index) => (
                    <div className="col-lg-4">
                      <div
                        className="new_productCard mb-4"
                        item
                        xs={4}
                        key={item.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <Item className="product-item">
                          
                          <img
                            src={item.imageUrls}
                            alt={index}
                            style={{
                              width: "100%",
                              height: "300px",
                              objectFit: "contain",
                            }}
                          />
                          <h5 className="prd-name" title={item.txtVal.description}>{item.txtVal.description}</h5>
                          <h5 className="prd-price">{item.txtVal.originalPrice}</h5>
                          <h5 className="discountBadge">
                          <div className="isDelivery">{item.txtVal.isDelivery?<img src={packageIcon} alt="delivery" height="40" />:''}</div>
                            {item.txtVal.discountPrice + " " + "OFF /-"}
                          </h5>
                        </Item>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
           
          </div>
        )}
      </div>
      <span className="Paginationdiv">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(filteredImages.length / imagesPerPage)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="active"
      />
      </span>
    </section>
  );
};

export default OurProducts;
