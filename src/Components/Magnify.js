import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import Image10 from "../Assets/Img3.jpg";
import Image6 from "../Assets/Img6.jpg";
import Image7 from "../Assets/Img9.jpg";
const Magnify = ({ imageURL }) => {
  const [zIndex, setZIndex] = useState(999);
  console.log(imageURL, "imageURL");
  const handleScroll = () => {
  
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setZIndex(1); 
    } else {
      setZIndex(999);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <div className="imageMagnifier" style={{ position: 'relative', zIndex }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: imageURL,
            width:900,
            height:400,
           
          },
          largeImage: {
            src: imageURL,
            width: 1800,
            height: 2500,
          },
          isHintEnabled: true,
          enlargedImageContainerDimensions: {
            width: '500%',
            height: '100%'
          },
        }}
      />
    </div>
  );
};

export default Magnify;
