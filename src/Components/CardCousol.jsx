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
import app from './Firebase';
import './CardCarousel.css'
const CardCousol = () => {
  const antiqueImages= [Image10,Image6,Image7]

  const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        const storage = getStorage(app);
        const listRef = ref(storage, 'images/');

        try {
            const res = await listAll(listRef);
            const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
            setImages(urls);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);
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
            width: "95%",
            margin: "auto",
            backgroundColor: "#f6f3f2",
            padding: "15px",
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
          >
            {images.map((item, index) => {
              console.log(item,"item")
              return (
                <div
                  class="card"
                  style={{ height: "300px", overflow: "hidden" }}
                >
                  <img
                    class="card-img-top"
                    src={item}
                    alt="Card image cap"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                    }}
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