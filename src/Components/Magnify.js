import React from "react";
import ReactImageMagnify from "react-image-magnify";
import Image10 from "../Assets/Img3.jpg";
import Image6 from "../Assets/Img6.jpg";
import Image7 from "../Assets/Img9.jpg";
const Magnify = ({ imageURL }) => {
  console.log(imageURL, "imageURL");
  return (
    <div className="imageMagnifier">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: imageURL,
            width:'200px',
            height:'300px'
          },
          largeImage: {
            src: imageURL,
            width: 1800,
            height: 2500,
          },
          isHintEnabled: true,
          enlargedImageContainerDimensions: {
            width: '100%',
            height: '100%'
          },
        }}
      />
    </div>
  );
};

export default Magnify;
