import React from "react";
import Styled from "styled-components";
import { NavLink} from "react-router-dom";
import cclogo from "../Assets/CCLogo.png";
import "./ContactUs.css";

const StyledAnchor = Styled.a`  
  color:var(--text-color-white);
  line-height: 26px;
  margin-bottom: 5px;
  display:block;
  transition: all 0.5s;
  text-decoration:none !important;
  &:hover{
  font-size: 3.5rem;
  color: var(--text-color-white);
}

`;
const StyledFooterP = Styled.p`
  font-size: 1.4rem;
  line-height: 26px;
  margin-bottom: 5px;
  color:var(--text-color-white);
  display:block;
  transition: all 0.5s;
  text-decoration:none !important;
  &:hover{
  font-size: 1.8rem;
  color: var(--text-color-white);
}
`;

const StyledFooterLink = Styled(NavLink)`
  font-size: 1.4rem;
  line-height: 26px;
  margin-bottom: 5px;
  color:var(--text-color-white);
  display:block;
  transition: all 0.5s;
  text-decoration:none !important;
   &:hover{
  font-size: 1.8rem;
  color: var(--text-color-white);
}
`;

const Footer = () => {
  return (
    <section className="custom-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-logo-block justify-content-start">
              <img src={cclogo} height={"80"} alt="" />
              <div className="footer-logo-text">Creative Antiqueology</div>
            </div>
          </div>
          <div className="col-md-8">
            <section className="row">
              <div className="col-md-4">
                <h2 className="footer-block__heading">Company</h2>
                <StyledFooterLink to="/about" className="mb-2">
                  Our Journey
                </StyledFooterLink>
                <StyledFooterLink to="/our-products" className="mb-2">
                  Our Products
                </StyledFooterLink>
                <StyledFooterLink to="/contactus" className="mb-2">
                  Contact US
                </StyledFooterLink>
                <StyledFooterLink className="mb-2">
                  Terms and Conditions
                </StyledFooterLink>
              </div>
              <div className="col-md-4">
                <h2 className="footer-block__heading">Contact US</h2>
                <StyledFooterP className="mb-2">
                  Through Call - 416 887 2485
                </StyledFooterP>
                <StyledFooterP className="mb-2">Business Address</StyledFooterP>
                <StyledFooterP className="mb-2">Burlington,</StyledFooterP>
                <StyledFooterP className="mb-2">ONTARIO</StyledFooterP>
              </div>
              <div className="col-md-4">
                <h2 className="footer-block__heading">Social Connect</h2>
                <div className="d-flex justify-content-between align-items-center max-w-160">
                  <StyledAnchor
                    className="mb-2 social-button whatsapp"
                    href="https://wa.me/9494704184?text=Hello%2C%20Sandeep!"
                    target="_blank"
                  >
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                  </StyledAnchor>
                  <StyledAnchor
                    className="mb-2 social-button fb"
                    href="https://www.instStyledAnchorgram.com/vangara_srinivas/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </StyledAnchor>
                  <StyledAnchor
                    className="mb-2 social-button instagram"
                    href="https://www.linkedin.com/in/vangara-srinivas-b2a983127/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </StyledAnchor>
                  <StyledAnchor
                    className="mb-2 social-button twitter"
                    href="https://github.com/vangarasrinivas?tab=repositories"
                    target="_blank"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </StyledAnchor>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="footer-left col-lg-12 col-md-12 col-sm-12">
              <div className="footer__copyright">
                © 2014, Creative Antiqueology
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
