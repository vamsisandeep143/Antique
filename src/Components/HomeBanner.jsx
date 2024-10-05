import React, { useContext, useState } from "react";
import { store } from "../App";
import Image10 from "../Assets/Img10.jpg";
import Image6 from "../Assets/Img6.jpg";
import Image7 from "../Assets/Img9.jpg";
import OwlCarousel from "react-owl-carousel";
import carousal2 from "../Assets/carousal2.jpg";
import Banner1 from "../Assets/Home-Banner/Banner-1.png";
import Banner2 from "../Assets/Home-Banner/Banner-2.png";
import Banner3 from "../Assets/Home-Banner/Banner-3.png";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';

const HomeBanner = () => {
  const [contextData, setContextData] = useContext(store);
  const navigate = useNavigate();

  const images = [
    "https://hips.hearstapps.com/hmg-prod/images/door-shaded-by-bougainvillea-porquerolles-france-royalty-free-image-1653423252.jpg?crop=0.668xw:1.00xh;0.165xw,0&resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/wisteria-in-bloom-royalty-free-image-1653423554.jpg?crop=0.685xw:1.00xh;0.112xw,0&resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/vibrant-pink-and-white-summer-flowering-cosmos-royalty-free-image-1653499726.jpg?crop=0.66541xw:1xh;center,top&resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/gardenia-royalty-free-image-1580854928.jpg?crop=1.00xw:0.796xh;0,0.0851xh&resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/close-up-of-blossoming-rose-flower-royalty-free-image-1580853844.jpg?crop=0.668xw:1.00xh;0.248xw,0&resize=980:*",
  ];
  const [count, setCount] = useState(0);
  // function AnimatedText({ text }) {
  //   return (
  //     <div className="animated-text">
  //       {text.split('').map((char, index) => (
  //         <span key={index} className="letter">
  //           {char}
  //         </span>
  //       ))}
  //     </div>
  //   );
  // }
  return (
    <>
    <Carousel fade indicators={false} interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner1}
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>
              <div>Discover the Beauty at Creative Antiqueology</div></h3>
            <p>owning something rare is special.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner2}
            alt="Second slide"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>A Wise Investment</h3>
            <p>Antiques are not just beautiful. They are valuable</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner3}
            alt="Third slide"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Fill Your Home with Timeless Charm</h3>
            <p>Your home reflects who you are. By filling it with antiques, you create a space that is rich in character and personal significance.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
     
    </>
  );
};

export default HomeBanner;
