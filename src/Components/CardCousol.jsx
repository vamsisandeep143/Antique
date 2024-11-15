import React, { useEffect, useState } from 'react';

import './Card.css'

import Image10 from '../Assets/Img10.jpg'
import Image6 from '../Assets/Img6.jpg'
import Image7 from '../Assets/Img9.jpg'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactOwlCarousel from 'react-owl-carousel'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app, { db } from './Firebase';
import './CardCarousel.css';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
const CardCousol = ({filter}) => {
  const { productID } = useParams();
  const [urlID,setURLID]=useState();
  const antiqueImages= [Image10,Image6,Image7]
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data,setData]=useState([])
    const [filteredData,setFilteredData]=useState()
    // const fetchImages = async () => {
    //     const storage = getStorage(app);
    //     const listRef = ref(storage, 'images/');

    //     try {
    //         const res = await listAll(listRef);
    //         const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
    //         setImages(urls);
    //     } catch (error) {
    //         console.error('Error fetching images:', error);
    //     } finally {
    //         setLoading(false);
    //     }
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
        //  setFilteredImages(updatedData);
      } catch (error) {
          console.error("Error fetching data or images:", error);
      } finally {
          setLoading(false);
      }
  };
  
    const getData = async () => {
      const valRef = collection(db, 'textData');
      try {
          const dataDb = await getDocs(valRef);
          const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
          console.log('Fetched Data our products:', allData); // Debugging line
          setData(allData)
          
            if(filter){
              const choseProducts = allData.filter((item)=>{
                return item.id != productID
            })
              
              setFilteredData(choseProducts);
              setLoading(false);
            }else{
              setFilteredData(allData);
            }
          
          setLoading(false);
      } catch (error) {
          console.error('Error fetching data from Firestore:', error);
      }
  };

    useEffect(() => {
        fetchImagesAndData();
        getData()
    }, [productID]);
  return (
    //     <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
    //   <div className="carousel-inner">
    //   <div className="carousel-item active" data-bs-interval="3000">
    //   <Card
    //   sx={{ minWidth: 345 }}
    //   >
    //       <CardMedia
    //         sx={{ height: 'auto' }}
    //         image={Image10}
    //         title="green iguana"
    //       />
    //       <CardContent>

    //       </CardContent>

    //     </Card>
    //     </div>
    //   <div className="carousel-item active" data-bs-interval="3000">
    //   <Card
    //   sx={{ minWidth: 345 }}
    //   >
    //       <CardMedia
    //         sx={{ height: 'auto' }}
    //         image={Image6}
    //         title="green iguana"
    //       />
    //       <CardContent>

    //       </CardContent>

    //     </Card>
    //     </div>
    //   </div>
    //   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>
    //   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    // </div>

    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            // width: "95%",
            width: "98%",
            margin: "auto",
            backgroundColor: "#f6f3f2!important",
            padding: "15px",
            color:'#382925',
            textAlign:'center'
          }}
        >
          <ReactOwlCarousel
            className="owl-theme"
            loop={true}
            margin={10}
            nav={true}
            dots={false}
            autoplay={true}
            autoplayTimeout={10000000}
            items={3}
            width="98%"
            backgroundColor="#f6f3f2"
          >
            {filteredData?.map((item, index) => {
              console.log(item,"item")
              return (
                <div
                  class="card"
                  style={{ height: "300px", overflow: "hidden" }}
                >
                  <img
                    class="card-img-top"
                    src={item.imageUrls}
                    alt="Card image cap"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                      cursor:'pointer'
                    }}
                    onClick={()=>navigate(`/products/${item.id}`)}
                  />
    </div>
              );
            })}
           
          </ReactOwlCarousel>

    </div>
      )}
    </div>
  );
}

export default CardCousol