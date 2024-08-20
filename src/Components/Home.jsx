import React from "react";
import Navbar from "./Navbar";
import video from "../Assets/logo.mp4";
import Styled from "styled-components";
import photo from "../Assets/background.jpg";
import ImageGallery from "./ImageGallery";
import CardCousol from "./CardCousol";
import ContactUs from "./ContactUs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
} from "@mui/material";
import Footer from "./Footer";
import Magnify from "./Magnify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import item1 from "../Assets/icons/check.png";
import item2 from "../Assets/icons/service.png";
import item3 from "../Assets/icons/underwriter.png";

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
 font-family: 'Roboto', sans-serif;
    font-weight:400;
    color:#382925;
    font-size: 20px;
    line-height: 28px;
    max-width: 80%;
    margin: 0 auto;
    text-align: justify;
`;

const Home = () => {
  const chooseUS = [
    {
      title: "Authenticity Guaranteed",
      content:
        "Each item in our collection is meticulously authenticated to ensure its historical significance and value.",
    },
    {
      title: "Expert Knowledge",
      content:
        "Our team of antique enthusiasts is always on hand to share their knowledge and help you find the perfect piece.",
    },
    {
      title: "Exceptional Quality",
      content:
        "We take pride in offering only the finest antiques, carefully preserved and restored to their original glory.",
    },
  ];
  return (
    <>
      <div style={{ backgroundColor: "#f6f3f2" }}>
        <ImageGallery />
        <Styleddiv>
          <Styledh1>
            Welcome to Creative Collection Discover Timeless Beauty Since 2014,
            Creative Collection has been your trusted source for exquisite
            antiques. Our curated selection features timeless pieces crafted
            from brass and bronze, along with stunning furniture and captivating
            paintings. Each item in our collection tells a story and adds a
            touch of history and elegance to your space.
          </Styledh1>
        </Styleddiv>
        <div className="container home-card-coursel">
          <CardCousol />
        </div>

        <div className="container my-4 pb-4">
          <section className="about-design row">
            <div className="col-12 mt-4">
              <div className="page-title">Why Choose Us?</div>
            </div>
            <div className="col-4">
              <div className="item">
                <img src={item1} alt="icon" />
                <h2>Authenticity Guaranteed</h2>
                <p>
                  Each item in our collection is meticulously authenticated to
                  ensure its historical significance and value.
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="item">
                <img src={item2} alt="icon" />
                <h2>Expert Knowledge</h2>
                <p>
                  Our team of antique enthusiasts is always on hand to share
                  their knowledge and help you find the perfect piece.
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="item">
                <img src={item3} alt="icon" />
                <h2>Exceptional Quality</h2>
                <p>
                  We take pride in offering only the finest antiques, carefully
                  preserved and restored to their original glory.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div style={{ width: "80%", margin: "20px auto" }}>
          {/* <h2 style={{textAlign:'center',color:'#382925',margin:'20px 0'}}>Why Choose Us?</h2> */}

          {chooseUS.map((data, i) => {
            return (
              <></>

              // <Accordion>
              //     <AccordionSummary
              //     expandIcon={<ExpandMoreIcon />}
              //     aria-controls="panel1-content"
              //     id="panel1-header"
              //     style={{fontSize:'20px',color:'#382925',minHeight:'50px',margin:'0'}}
              //     >
              //     <h4 style={{fontSize:'16px',color:'#382925',margin:'0'}}>{data.title}</h4>
              //     </AccordionSummary>
              //     <AccordionDetails>
              //         <p style={{fontSize:'16px',color:'#382925',margin:'0',borderTop:'1px solid #382925'}}>{data.content}</p>
              //     </AccordionDetails>
              // </Accordion>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
