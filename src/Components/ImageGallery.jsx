import React, { useContext, useState } from 'react'
import { store } from '../App';
import Image10 from '../Assets/Img10.jpg'
import Image6 from '../Assets/Img6.jpg'
import Image7 from '../Assets/Img9.jpg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../index.css'


const ImageGallery = () => {
    const [contextData, setContextData] = useContext(store);

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
            {/* <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <img width={'300'} src={images[count]} />
                </div>
                <div>
                    <button style={{marginRight:'10px', paddingInline:'15px'}} disabled={count === 0} onClick={() => setCount(count - 1)}>-</button>
                    <button style={{paddingInline:'15px'}} disabled={count === images?.length - 1} onClick={() => setCount(count + 1)}>+</button>
                </div>
            </div> */}
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{width:'92%',margin:'auto',}}>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src={Image10} height={'600px'} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Image6} height={'600px'} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Image7} height={'600px'} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev" style={{width:'30px',height:'70px',padding:'10px',backgroundColor:'#ae8c83',top:'auto', bottom:'50%',opacity:99,left:'-2%',borderRadius:'5px'}}>
                    {/* <span > */}
                    {/* <span className="carousel-control-prev-icon" aria-hidden="true" style={{width:'50px',height:'50px',padding:'10px'}}> */}
                    <i class="fa-solid fa-chevron-left fa-2x" style={{color:'#fff'}}></i>
                    
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next" style={{width:'30px',height:'70px',padding:'10px',backgroundColor:'#ae8c83',top:'auto', bottom:'50%',opacity:99,right:'-2%',borderRadius:'5px'}}>
                    {/* <span className="carousel-control-next-icon" aria-hidden="true" style={{color:'red'}}></span> */}
                    <i class="fa-solid fa-chevron-right fa-2x" style={{color:'#fff'}}></i>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
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