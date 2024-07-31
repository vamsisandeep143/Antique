import React, { useState } from "react";
import "./About.css";
import Test from "../Assets/AboutBackground1.jpg";
import Test2 from "../Assets/About2.jpg";
import Test3 from "../Assets/Aboutbackground1.jpeg";
import Test4 from "../Assets/Aboutbackground2.jpeg";
import Test5 from "../Assets/Aboutbackground3.jpeg";
import item1 from "../Assets/icons/check.png";
import item2 from "../Assets/icons/service.png";
import item3 from "../Assets/icons/underwriter.png";
import { Slideshow } from "./Slider"; // Ensure Slideshow is correctly imported
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const About = () => {
  const images = [Test, Test2, Test3, Test4, Test5];
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
    {
      title: "Our Mission",
      content:
        "Our mission at Creative Antiqueology is to bring the charm and elegance of the past into the present. We believe that every antique has a story to tell, and we are passionate about sharing these stories with our customers. By offering a diverse range of high-quality antiques, we aim to preserve history and provide timeless pieces that can be cherished for generations.",
    },
  ];

  const [tap1, setTap1] = useState(true);

  return (
    <section className="mainContainerAbout">
      <div className="container pt-4">
        <div className="page-title">What We are</div>        
        <section className="about-content mb-4">
          <div className="test1">
            <h3 className="tested">Our Journey</h3>
            <p className="para">
              Since our inception in 2014, Creative Collection has been
              dedicated to offering a curated selection of unique and valuable
              antiques. Our passion for history, art, and craftsmanship drives
              us to seek out the finest pieces, ensuring that each item in our
              collection tells its own story.
            </p>
          </div>
          <div className="test1 mt-3 mb-4">
            <h3 className="tested">Our Mission</h3>
            <p className="para">
              Our mission at Creative Antiqueology is to bring the charm and
              elegance of the past into the present. We believe that every
              antique has a story to tell, and we are passionate about sharing
              these stories with our customers. By offering a diverse range of
              high-quality antiques, we aim to preserve history and provide
              timeless pieces that can be cherished for generations.
            </p>
          </div>
          <div className="test2">
            <h3 className="tested">What We Offer</h3>
            <p className="para">
              Brass and Bronze Items: Discover beautifully crafted brass and
              bronze pieces that add a touch of elegance and history to any
              space. Paintings: Our collection features captivating paintings
              that bring life and color to your home or office. Furniture: From
              intricately designed tables to timeless chairs, our antique
              furniture collection is both functional and stylish.
            </p>
          </div>
        </section>
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
                Our team of antique enthusiasts is always on hand to share their
                knowledge and help you find the perfect piece.
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

        {/* <ul className="nav nav-tabs d-none">
          <li className="nav-item">
            <button
              className={`nav-link ${tap1 ? "active" : ""}`}
              onClick={() => setTap1(!tap1)}
            >
              Our Journey
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${!tap1 ? "active" : ""}`}
              onClick={() => setTap1(!tap1)}
            >
              What We Offer
            </button>
          </li>
        </ul> */}
        {/* {tap1 ? (
          <div className="test1">
            <h3 className="tested">Our Journey</h3>
            <p className="para">
              Since our inception in 2014, Creative Collection has been
              dedicated to offering a curated selection of unique and valuable
              antiques. Our passion for history, art, and craftsmanship drives
              us to seek out the finest pieces, ensuring that each item in our
              collection tells its own story.
            </p>
          </div>
        ) : (
          <div className="test2">
            <h3 className="tested">What We Offer</h3>
            <p className="para">
              Brass and Bronze Items: Discover beautifully crafted brass and
              bronze pieces that add a touch of elegance and history to any
              space. Paintings: Our collection features captivating paintings
              that bring life and color to your home or office. Furniture: From
              intricately designed tables to timeless chairs, our antique
              furniture collection is both functional and stylish.
            </p>
          </div>
        )} */}
        {/* <div className="test3">
          <Slideshow images={images} />
        </div>
        <div className="Accordian">
          <div style={{ width: "80%", margin: "20px auto" }}>
            <h2
              style={{
                textAlign: "center",
                color: "#382925",
                margin: "20px 0",
              }}
            >
              Why Choose Us?
            </h2>
            {chooseUS.map((data, i) => (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}-content`}
                  id={`panel${i}-header`}
                  style={{
                    fontSize: "20px",
                    color: "#382925",
                    minHeight: "50px",
                    margin: "0",
                  }}
                >
                  <h4
                    style={{ fontSize: "16px", color: "#382925", margin: "0" }}
                  >
                    {data.title}
                  </h4>
                </AccordionSummary>
                <AccordionDetails>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#382925",
                      margin: "0",
                      borderTop: "1px solid #382925",
                    }}
                  >
                    {data.content}
                  </p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default About;
