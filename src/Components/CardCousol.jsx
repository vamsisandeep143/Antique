import React from 'react'
import './Card.css'

import Image10 from '../Assets/Img10.jpg'
import Image6 from '../Assets/Img6.jpg'
import Image7 from '../Assets/Img9.jpg'

const CardCousol = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-items active">
      <img src={Image10} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-items">
      <img src={Image6} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-items">
      <img src={Image7} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}

export default CardCousol