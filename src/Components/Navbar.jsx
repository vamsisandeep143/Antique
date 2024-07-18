import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Styled from 'styled-components';
import { store } from '../App';
import video from '../Assets/logo.mp4';
import ImageGallery from './ImageGallery';
import ProfilePic from './ProfilePic';
import Login from './Login';
import Background from '../Assets/background.jpg'
import CardCousol from './CardCousol';
import ContactUs from './ContactUs';
import TestToast from './TestToast';

const StyledNav = Styled.nav`
display:flex;
justify-content:space-between;
 background-color:white !important;
`;

const StyledDiv = Styled.div`
position:sticky;
top:0;
z-index:999;

`;

const Styledh1 = Styled.h3`

font-family:'Zen Antique Soft', serif;
font-weight:600;
color:#767171;


`;

const StyledLink = Styled(Link)`

p{
font-family:'Zen Antique Soft', serif;
display:inline;
font-size:1.5rem;
text-transform:uppercase;
}

p::after { 
  content: "      |";
   color: yellow;
   font-weight: bold;
}

`;



const StyledVideo = Styled.video`
margin-top:0px;
margin-bottom:0px;
`;

const FlexDiv = Styled.div`
display:flex;
flex-direction:column-reverse;
align-items:center;
`;

const StyledDiv2 = Styled.div`

margin:35px;

`;

const StyledDiv1 = Styled.div`

margin:35px;

`;

const Styleddiv = Styled.div`
padding:1rem;


`;

const Navbar = () => {
    const [contextData, setContextData] = useContext(store);
    const routerPath = useLocation()?.pathname;
    const { user_details } = contextData;

    return (
        <StyledDiv>
            <StyledNav style={{ backgroundColor: "lightgrey", padding: "10px" }}>
                <FlexDiv>
                    <Styledh1>Creative Collections</Styledh1>
                    <StyledVideo autoPlay width="50" height="80" loop muted>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </StyledVideo>
                </FlexDiv>

                <StyledDiv1>
                    <StyledLink to="/" className={routerPath === '/' ? 'nav-achour text-black' : 'nav-achour text-grey'}><p>Home</p></StyledLink>
                    <StyledLink to="/blogs" className={routerPath === '/blogs' ? 'nav-achour text-red' : 'nav-achour'}><p>What's New</p></StyledLink>
                    <StyledLink to="/our-products" className={routerPath === '/our-products' ? 'nav-achour text-red' : 'nav-achour'}><p>Our Products</p></StyledLink>
                    <StyledLink to="/contactus" className={routerPath === '/contactus' ? 'nav-achour text-red' : 'nav-achour'}><p>Contact Us</p></StyledLink>
                    <StyledLink to="/about" className={routerPath === '/about' ? 'nav-achour text-red' : 'nav-achour'}><p>About</p></StyledLink>
                </StyledDiv1>
                <StyledDiv2>
                    <StyledLink to="/loginComp" className={routerPath === '/loginComp' ? 'nav-achour text-red' : 'nav-achour'}><i className="fas fa-user-alt"></i></StyledLink>

                    {/* <Styledh1>{user_details?.firstName}</Styledh1>
                    <ProfilePic /> */}
                </StyledDiv2>
                {/* <TestToast /> */}

            </StyledNav>
        
        </StyledDiv>
    )
}

export default Navbar