import React, { useContext, useState } from 'react'
import { store } from '../App';
import Image10 from '../Assets/Img10.jpg'
import Image6 from '../Assets/Img6.jpg'
import Image7 from '../Assets/Img9.jpg'
import OwlCarousel from 'react-owl-carousel';
import carousal2 from "../Assets/carousal2.jpg";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../index.css';
import { useNavigate } from "react-router-dom";


const ImageGallery = () => {
    const [contextData, setContextData] = useContext(store);
    const navigate = useNavigate()

    const images = [
        'https://hips.hearstapps.com/hmg-prod/images/door-shaded-by-bougainvillea-porquerolles-france-royalty-free-image-1653423252.jpg?crop=0.668xw:1.00xh;0.165xw,0&resize=980:*',
        'https://hips.hearstapps.com/hmg-prod/images/wisteria-in-bloom-royalty-free-image-1653423554.jpg?crop=0.685xw:1.00xh;0.112xw,0&resize=980:*',
        'https://hips.hearstapps.com/hmg-prod/images/vibrant-pink-and-white-summer-flowering-cosmos-royalty-free-image-1653499726.jpg?crop=0.66541xw:1xh;center,top&resize=980:*',
        'https://hips.hearstapps.com/hmg-prod/images/gardenia-royalty-free-image-1580854928.jpg?crop=1.00xw:0.796xh;0,0.0851xh&resize=980:*',
        'https://hips.hearstapps.com/hmg-prod/images/close-up-of-blossoming-rose-flower-royalty-free-image-1580853844.jpg?crop=0.668xw:1.00xh;0.248xw,0&resize=980:*'
    ]
    const [count, setCount] = useState(0)
    return (
        <>
          <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ width: "100%", margin: "auto" }}
      >
        <div
          style={{
            zIndex: 99,
            top: "30%",
            left: "20%",
            right: "20%",
            position: "absolute",
            //   color: "#88540b",
            color: "#382925",
            fontFamily: "Mukta, sans-serif",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            // width:'80%',
            // margin:'auto',
            // backgroundColor:'#f6f3f2',
            backgroundColor: "rgba(246, 243, 242, 0.7)",
            padding: "20px 10px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              //   zIndex: 99,
              //   top: "50%",
              //   position: "absolute",
              //   color: "#DAA520",
              fontFamily: "Mukta, sans-serif",
              fontWeight: "bold",
              fontSize: "36px",
            }}
          >
            Welcome to Creative Antiqueology
          </h1>
          <p style={{ fontSize: "22px" }}>
            Discover the Elegance of Yesteryears
          </p>
          <p style={{ fontSize: "14px" }}>
            we believe that every piece of history has a story to tell. Our
            curated collection of antiques brings you the charm and elegance of
            bygone eras, where every item is a testament to exquisite
            craftsmanship and timeless beauty.
          </p>
          <button
            style={{
              backgroundColor: "#382925",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "14px",
              borderRadius: "2px",
              border: "none",
            }}
            onClick={()=>navigate('/our-products')}
          >
            Explore
          </button>
        </div>
        <div className="carousel-inner" style={{ opacity: "0.8" }}>
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src={carousal2}
              // height={"700px"}
              className="d-block w-100"
              alt=""
            />
          </div>
          {/* <div className="carousel-item" data-bs-interval="3000" style={{opacity: '1000ms ease 0s'}}>
                <img src={carousal2} height={'700px'} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="3000" style={{opacity: '1000ms ease 0s'}}>
                <img src={Image10} height={'700px'} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="3000" style={{opacity: '1000ms ease 0s'}}>
                <img src={Image6} height={'700px'} className="d-block w-100" alt="..." />
            </div> */}
        </div>
      </div>
            {/* <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <img width={'300'} src={images[count]} />
                </div>
                <div>
                    <button style={{marginRight:'10px', paddingInline:'15px'}} disabled={count === 0} onClick={() => setCount(count - 1)}>-</button>
                    <button style={{paddingInline:'15px'}} disabled={count === images?.length - 1} onClick={() => setCount(count + 1)}>+</button>
                </div>
            </div> */}
       
        {/* <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          nav={true}
          dots={false}
          autoplay={true}
          autoplayTimeout={5000}
          items={1}
          height="200px"
        >
          {images.map((item, index) => {
            return (
              <div>
                <img src={item} alt={index} style={{height:'400px'}}/>
              </div>
            );
          })}
        </OwlCarousel> */}
        ;
      </>
    );
}

export default ImageGallery