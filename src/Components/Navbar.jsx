import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Styled from "styled-components";
import { store } from "../App";
import video from "../Assets/logo.mp4";
import ImageGallery from "./ImageGallery";
import ProfilePic from "./ProfilePic";
import Login from "./Login";
import Background from "../Assets/background.jpg";
import CardCousol from "./CardCousol";
import ContactUs from "./ContactUs";
import TestToast from "./TestToast";
import { Menu, MenuItem, Box, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { auth } from "./Firebase";
import cclogo from "../Assets/CCLogo.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { motion } from 'framer-motion';
import { BorderBottom } from "@mui/icons-material";

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

const StyledBtn = Styled(Button)`
    width: 100%;
    height: auto;
    margin: 6px auto !important;
    background-color: #382925 !important;
    color: #fff !important;
    border-radius: 5px !important;
`;

const Styledh1 = Styled.h3`
font-family: 'Poppins', sans-serif;
font-weight:600;
color:#ffffff;
margin: 0px 8px !important;
text-transform: uppercase;
`;

const StyledLink = Styled(NavLink)`
p{
font-family: 'Roboto', sans-serif;
display:inline;
font-size:1.5rem;
text-transform:uppercase;
}
`;

const FontAwesomeDiv = styled.div`
width:60px;  
text-align:center;
cursor: pointer;
i{
margin:5px auto;
}
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

const navLinkStyles = ({ isActive }) => {
  return {
    fontWeight: isActive ? '500' : 'normal', position: 'relative','text-decoration': 'none','color': '#000000',
  }
}
const StyledProfilediv = Styled.div`
padding:0px 1rem;
`;
const CustomeDpLink = Styled(NavLink);

const Navbar = () => {
  const [contextData, setContextData] = useContext(store);
  const routerPath = useLocation()?.pathname;
  const { user_details } = contextData;
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  console.log("isLoggedIn", isLoggedIn);
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userSignIn, SetUserSignIn] = useState();
  const test = localStorage.getItem("loggedIn");
  useEffect(() => {
    if (test) {
      SetUserSignIn(true);
    } else {
      SetUserSignIn(false);
    }
  }, [test]);
  console.log(test, "test");
  const handleLogout = async () => {
    console.log("logout");

    try {
      await auth.signOut();
      setContextData({
        ...contextData,
        login: false,
      });
      localStorage.removeItem("loggedIn");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCart = () => {
    navigate('/add-to-cart');
  }
  return (
    <StyledDiv>
      <StyledNav style={{ backgroundColor: "#055d6b", padding: "0 10px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)", height: "72px" }}>
        <FlexDiv >
          
          <img src={cclogo} onClick={() => navigate('/')} height={"60"} alt="" style={{"cursor": "pointer"}} />
          {/* <StyledVideo autoPlay width="50" height="80" loop muted>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </StyledVideo> */}
          <Styledh1>Creative Antiqueology</Styledh1>
        </FlexDiv>
        {userSignIn ? (
          <section className="custom-nav">
            <StyledLink
              style={navLinkStyles}
              to="/Dashboard"
              className={
                routerPath === "/Dashboard"
                  ? "nav-achour text-lightgrey"
                  : "nav-achour text-white"
              }
            >
              <p>Dashboard</p>
            </StyledLink>
            <StyledLink
              style={navLinkStyles}
              to="/load"
              className={
                routerPath === "/load"
                  ? "nav-achour text-lightgrey"
                  : "nav-achour text-white"
              }
            >
              <p>Upload Item</p>
            </StyledLink>
            <StyledLink
              style={navLinkStyles}
              to="/about"
              className={
                routerPath === "/about"
                  ? "nav-achour text-lightgrey"
                  : "nav-achour text-white"
              }
            >
              <p>About</p>
            </StyledLink>
            <StyledLink
              style={navLinkStyles}
              to="/our-products"
              className={
                routerPath === "/our-products"
                  ? "nav-achour text-lightgrey"
                  : "nav-achour text-white"
              }
            >
              <p>Our Products</p>

            </StyledLink>

          </section>
        ) : (
          <section className="custom-nav">
            <StyledDiv1>
              <StyledLink
                style={navLinkStyles}
                to="/"
                className={
                  routerPath === "/"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>Home</p>
              </StyledLink>
              <StyledLink
                style={navLinkStyles}
                to="/blogs"
                className={
                  routerPath === "/blogs"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>Instant Checkout</p>
                <ArrowDropDownIcon fontSize='medium'/>
                <div className="custom-nav-dropdown">
                  <ul className="list">
                    <li><StyledLink style={navLinkStyles}
                        to="/our-products/Brass">Brass</StyledLink></li>
                    <li><StyledLink style={navLinkStyles}
                to="/our-products/Bronze">Bronze</StyledLink></li>
                    <li><StyledLink style={navLinkStyles}
                to="/our-products/Furniture">Furniture</StyledLink></li>
                    <li><StyledLink style={navLinkStyles}
                to="/our-products/Paintings">Paintings</StyledLink></li>
                  </ul>
                </div>
              </StyledLink>
              <StyledLink
                style={navLinkStyles}
                to="/blogs"
                className={
                  routerPath === "/blogs"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>New Arrivals</p>
              </StyledLink>
              <StyledLink
                style={navLinkStyles}
                to="/our-products/All"
                className={
                  routerPath === "/our-products"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>Our Products</p>
              </StyledLink>

              <StyledLink
                style={navLinkStyles}
                to="/contactus"
                className={
                  routerPath === "/contactus"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>Contact Us</p>
              </StyledLink>
              <StyledLink
                style={navLinkStyles}
                to="/about"
                className={
                  routerPath === "/about"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>About</p>
              </StyledLink>
              <motion.div className="mx-4"
                whileHover={{ scale: 1.2 }}
                onHoverStart={e => console.log('Hover start')}
                onHoverEnd={e => console.log('Hover end')}
              >
                <ShoppingCartIcon
                  fontSize='large'
                  sx={{ color: '#055d6b', cursor: 'pointer', fontSize: '30px' }}
                  onClick={handleCart}
                />
              </motion.div>
            </StyledDiv1>
          </section>
        )}
        <StyledDiv1 style={{ display: 'none' }}>
          <FontAwesomeDiv
            className="nav-achour text-white mx-0"
            onMouseEnter={handleMouseEnter}
          >
            <i className="fas fa-user-alt fa-2x"></i>
          </FontAwesomeDiv>
          <Menu
            style={{ display: 'none' }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              onMouseLeave: handleClose,
            }}
            className="custom-profile-menu"
            PaperProps={{
              style: {
                marginTop: "1rem",
                width: "200px",
              },
            }}
          >
            <> {!userSignIn ? (
              <StyledProfilediv>
                <StyledBtn
                  variant="contained"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </StyledBtn>
                <StyledBtn
                  variant="contained"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </StyledBtn>
              </StyledProfilediv>
            ) : (
              <StyledProfilediv>
                <StyledBtn variant="contained" onClick={handleLogout}>
                  LogOut
                </StyledBtn>
              </StyledProfilediv>
            )}
            </>
          </Menu>
        </StyledDiv1>
      </StyledNav>
    </StyledDiv>
  );
};

export default Navbar;

// import React, { useState } from 'react';
// import './Navbar.css'; // Assuming you will add CSS separately

// const Navbar = () => {
//   const [dropdown, setDropdown] = useState(null);

//   const handleMouseEnter = (menu) => {
//     setDropdown(menu);
//   };

//   const handleMouseLeave = () => {
//     setDropdown(null);
//   };

//   return (
//     <nav className="navbar">
//       <ul className="navbar-list">
//         <li
//           className="navbar-item"
//           onMouseEnter={() => handleMouseEnter('home')}
//           onMouseLeave={handleMouseLeave}
//         >
//           <a href="/">Home &#x25BC;</a>
//           {dropdown === 'home' && (
//             <div className="dropdown">
//               <ul>
//                 <li><a href="/home/subpage1">Subpage 1</a></li>
//                 <li><a href="/home/subpage2">Subpage 2</a></li>
//               </ul>
//             </div>
//           )}
//         </li>
//         <li
//           className="navbar-item"
//           onMouseEnter={() => handleMouseEnter('about')}
//           onMouseLeave={handleMouseLeave}
//         >
//           <a href="/about">About us &#x25BC;</a>
//           {dropdown === 'about' && (
//             <div className="dropdown">
//               <ul>
//                 <li><a href="/about/team">Our Team</a></li>
//                 <li><a href="/about/history">Our History</a></li>
//               </ul>
//             </div>
//           )}
//         </li>
//         <li
//           className="navbar-item"
//           onMouseEnter={() => handleMouseEnter('consulting')}
//           onMouseLeave={handleMouseLeave}
//         >
//           <a href="/consulting">IT Consulting &#x25BC;</a>
//           {dropdown === 'consulting' && (
//             <div className="dropdown">
//               <ul>
//                 <li><a href="/consulting/strategy">IT Strategy</a></li>
//                 <li><a href="/consulting/solutions">Solutions</a></li>
//               </ul>
//             </div>
//           )}
//         </li>
//         <li
//           className="navbar-item"
//           onMouseEnter={() => handleMouseEnter('services')}
//           onMouseLeave={handleMouseLeave}
//         >
//           <a href="#">IT Services &#x25BC;</a>
//           {dropdown === 'services' && (
//             <div className="dropdown">
//               <ul>
//                 <li><a href="/services/product-development">Product Development</a></li>
//                 <li><a href="/services/outsourcing">IT Outsourcing</a></li>
//                 <li><a href="/services/managed-services">Managed Services</a></li>
//               </ul>
//             </div>
//           )}
//         </li>
//         <li
//           className="navbar-item"
//           onMouseEnter={() => handleMouseEnter('careers')}
//           onMouseLeave={handleMouseLeave}
//         >
//           <a href="/careers">Careers &#x25BC;</a>
//           {dropdown === 'careers' && (
//             <div className="dropdown">
//               <ul>
//                 <li><a href="/careers/openings">Job Openings</a></li>
//                 <li><a href="/careers/internships">Internships</a></li>
//               </ul>
//             </div>
//           )}
//         </li>
//         <li
//           className="navbar-item"
//           onMouseEnter={() => handleMouseEnter('contact')}
//           onMouseLeave={handleMouseLeave}
//         >
//           <a href="/contact">Contact us &#x25BC;</a>
//           {dropdown === 'contact' && (
//             <div className="dropdown">
//               <ul>
//                 <li><a href="/contact/email">Email Us</a></li>
//                 <li><a href="/contact/locations">Our Locations</a></li>
//               </ul>
//             </div>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
