import React, { useContext,useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import { Menu, MenuItem, Box, IconButton } from '@mui/material';
import styled from '@emotion/styled';

const StyledNav = Styled.nav`
display:flex;
justify-content:space-between;
//  background-color:white !important;
`;

const StyledDiv = Styled.div`
position:sticky;
top:0;
z-index:999;

`;

const Styledh1 = Styled.h3`

// font-family:'Zen Antique Soft', serif;
font-family: 'Roboto', sans-serif;
font-weight:600;
// color:#767171;
color:#fff;


`;

const StyledLink = Styled(Link)`
&:focus {
    color: #888888 !important;
  }
  
a {
    text-decoration: none;
}

p{
// font-family:'Zen Antique Soft', serif;
font-family: 'Roboto', sans-serif;
display:inline;
font-size:1.5rem;
text-transform:uppercase;
}

// p::after { 
//   content: "      |";
//    color: yellow;
//    font-weight: bold;
// }

`;


const FontAwesomeDiv = styled.div`
  cursor: pointer;
  &:hover {
    color: #f0f0f0;
  }
`;
const StyledVideo = Styled.video`
margin-top:0px;
margin-bottom:0px;
`;



const FlexDiv = Styled.div`
display:flex;
// flex-direction:column-reverse;
align-items:center;
`;

const StyledDiv2 = Styled.div`

margin:35px;

`;

const StyledDiv1 = Styled.div`

display: flex;
justify-content: center;
align-items: center

`;

const Styleddiv = Styled.div`
padding:1rem;


`;

const Navbar = () => {
    const [contextData, setContextData] = useContext(store);
    const routerPath = useLocation()?.pathname;
    const { user_details } = contextData;
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isLoggedIn = window.localStorage.getItem('loggedIn')
    console.log('isLoggedIn',isLoggedIn);
    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <StyledDiv>
            <StyledNav style={{ backgroundColor: "#382925", padding: "0 10px" }}>
                <FlexDiv>
                    <StyledVideo autoPlay width="50" height="80" loop muted>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </StyledVideo>
                    <Styledh1>Creative Collections</Styledh1>
                </FlexDiv>

                <StyledDiv1>
                    <StyledLink to="/" className={routerPath === '/' ? 'nav-achour text-lightgrey' : 'nav-achour text-white'}><p>Home</p></StyledLink>
                    <StyledLink to="/blogs" className={routerPath === '/blogs' ? 'nav-achour text-lightgrey' : 'nav-achour text-white'}><p>What's New</p></StyledLink>
                    <StyledLink to="/our-products" className={routerPath === '/our-products' ? 'nav-achour text-lightgrey' : 'nav-achour text-white'}><p>Our Products</p></StyledLink>
                    <StyledLink to="/contactus" className={routerPath === '/contactus' ? 'nav-achour text-lightgrey' : 'nav-achour text-white'}><p>Contact Us</p></StyledLink>
                    <StyledLink to="/about" className={routerPath === '/about' ? 'nav-achour text-lightgrey' : 'nav-achour text-white'}><p>About</p></StyledLink>
                </StyledDiv1>
                <StyledDiv1>
                <FontAwesomeDiv
                    className="nav-achour text-white"
                    onMouseEnter={handleMouseEnter}
                >
                    <i className="fas fa-user-alt fa-2x" ></i>
                </FontAwesomeDiv>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                    onMouseLeave: handleClose,
                    }}
                    PaperProps={{
                    style: {
                        marginTop: '1rem',
                        width:'100px'
                    },
                    }}
                >
                    <MenuItem onClick={()=>navigate('/login')}>Sign In</MenuItem>
                    <MenuItem onClick={()=>navigate('/signup')}>Sign Up</MenuItem>
                </Menu>
                </StyledDiv1>

            </StyledNav>
        
        </StyledDiv>
    )
}

export default Navbar