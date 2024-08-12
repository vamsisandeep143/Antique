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
import cclogo from "../Assets/CCLogo.svg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

// font-family:'Zen Antique Soft', serif;
font-family: 'Roboto', sans-serif;
font-weight:600;
// color:#767171;
color:#fff;


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

const navLinkStyles = ({isActive}) => {
  return {
  fontWeight:isActive?'bold':'normal',
  borderBottom:isActive?'3px solid #000000': 'none',
  paddingBottom:'2px',
  color:'green',
  
  }
    }
const StyledProfilediv = Styled.div`
padding:0px 1rem;


`;

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
      <StyledNav style={{ backgroundColor: "#382925", padding: "0 10px" }}>
        <FlexDiv>
          <img src={cclogo} height={"80"} alt="" />
          {/* <StyledVideo autoPlay width="50" height="80" loop muted>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </StyledVideo> */}
          <Styledh1>Creative Antiqueology</Styledh1>
        </FlexDiv>
        {userSignIn ? (
          <section className="custom-nav">
            <StyledLink
              style= {navLinkStyles}
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
             style= {navLinkStyles}
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
              style= {navLinkStyles}
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
              style= {navLinkStyles}
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
              style= {navLinkStyles}
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
                style= {navLinkStyles}
                to="/blogs"
                className={
                  routerPath === "/blogs"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>What's New</p>
              </StyledLink>
              <StyledLink
                style= {navLinkStyles}
                to="/our-products"
                className={
                  routerPath === "/our-products"
                    ? "nav-achour text-lightgrey"
                    : "nav-achour text-white"
                }
              >
                <p>Our Products</p>
              </StyledLink>

              <StyledLink
                style= {navLinkStyles}
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
                style= {navLinkStyles}
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
        sx={{ color: 'white' }}
        onClick={handleCart}
      />
    </motion.div>
            </StyledDiv1>
          </section>
        )}
        <StyledDiv1   style={{display:'none'}}>
          <FontAwesomeDiv
            className="nav-achour text-white mx-0"
            onMouseEnter={handleMouseEnter}
          >
            <i className="fas fa-user-alt fa-2x"></i>
          </FontAwesomeDiv>
          <Menu
            style={{display:'none'}}
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
