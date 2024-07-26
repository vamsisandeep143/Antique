import React from 'react';
import Navbar from './Navbar';
import video from '../Assets/logo.mp4';
import Styled from 'styled-components';
import photo from '../Assets/background.jpg'
import ImageGallery from './ImageGallery';
import CardCousol from './CardCousol';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Magnify from './Magnify';


// const Styleddiv = Styled.div`

// background: #e5e5e5;
// margin-top:200px;
// margin-left:200px;
// width:400px;
// border-radius:10px;
// `;

// const StyledVideo = Styled.video`
// margin-left:30px;
// margin-top:0px;
// margin-bottom:0px;
// `;

const Styleddiv = Styled.div`
padding:1rem;
margin:16px
`;

const Styledh1 = Styled.h3`
// font-family:'Zen Antique Soft', serif;
font-family: 'Roboto', sans-serif;
font-weight:600;
color:#767171;
text-align:center

`;

const Home = () => {
    return (
        <>
            <div style={{backgroundColor:'#f6f3f2'}}>
         <ImageGallery/>
            <Styleddiv><Styledh1>Welcome to Creative Collection
Discover Timeless Beauty

Since 2014, Creative Collection has been your trusted source for exquisite antiques. Our curated selection features timeless pieces crafted from brass and bronze, along with stunning furniture and captivating paintings. Each item in our collection tells a story and adds a touch of history and elegance to your space.</Styledh1></Styleddiv>
            <CardCousol/>
            
            </div>
        </>
    );
}

export default Home;
