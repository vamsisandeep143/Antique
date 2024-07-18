import React, { useContext, useState } from 'react'
import { store } from '../App';
import Image10 from '../Assets/Img10.jpg'
import Image6 from '../Assets/Img6.jpg'
import Image7 from '../Assets/Img9.jpg'

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


            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="4000">
                        <img src={Image10} height={'500px'} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src={Image6} height={'500px'} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src={Image7} height={'500px'} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>






        </>
    )
}

export default ImageGallery