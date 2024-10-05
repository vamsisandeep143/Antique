import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import './ContactUs.css';

const StyledAnchor = styled.a`
  font-size: 20px;
  color: #fff;
  margin: 4px;
`;

const StyledFooterLink = styled(NavLink)`
  font-size: 14px;
  color: #fff;
  margin: 4px;
`;

const Footer = () => {
  return (
    <div className='custom-footer'>
      <div>
        <h2 className='m-4'>Company</h2>
        <StyledFooterLink to = '/about'>Our Journey</StyledFooterLink>
        <StyledFooterLink to = '/our-products'>Our Products</StyledFooterLink>
        <StyledFooterLink to= '/contactus' >Contact US</StyledFooterLink>
        <StyledFooterLink>Terms and Conditions</StyledFooterLink>
      </div>

      <div>
        <h2 className='m-4'>Contact US</h2>
        <StyledFooterLink>Through Call - 416 887 2485</StyledFooterLink>
        <StyledFooterLink>Business Address</StyledFooterLink>
        <StyledFooterLink>Burlington,</StyledFooterLink>
        <StyledFooterLink>ONTARIO</StyledFooterLink>
      </div>

      <div>
        <h2 className='m-4'>Social Connect</h2>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.8, rotate: -90, borderRadius: '100%' }}
          style={{ display: 'inline-block' }}
        >
          <StyledAnchor href="https://wa.me/9491118102?text=Hello%2C%20Srinivas!" target='_blank'>
            <i className="fa fa-whatsapp" aria-hidden="true"></i>
          </StyledAnchor>
        </motion.div>
        <StyledAnchor href='https://www.instagram.com/vangara_srinivas/' target='_blank'>
          <i className="fa-brands fa-instagram"></i>
        </StyledAnchor>
        <StyledAnchor href='https://www.linkedin.com/in/vangara-srinivas-b2a983127/' target='_blank'>
          <i className="fa-brands fa-linkedin"></i>
        </StyledAnchor>
        <StyledAnchor href='https://github.com/vangarasrinivas?tab=repositories' target='_blank'>
          <i className="fa-brands fa-github"></i>
        </StyledAnchor>
      </div>
    </div>
  );
};

export default Footer;
