import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Styled from "styled-components";
import HomeBanner from "./HomeBanner";
import CardCousol from "./CardCousol";
import { InteractiveMap } from "./InteractiveMap";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import Footer from "./Footer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import item1 from "../Assets/icons/check.png";
import item2 from "../Assets/icons/service.png";
import item3 from "../Assets/icons/underwriter.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Styleddiv = Styled.div`
  padding:1rem;
  margin:16px;
`;

const StyledAccodian1 = Styled.div`
  padding: 10px 0px;
`;

const Styledh1 = Styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight:400;
  color:#055d6b;
  font-size: 20px;
  line-height: 28px;
  max-width: 80%;
  margin: 0 auto;
  text-align: justify;
`;

const Home = () => {

  const chooseUS = [
    {
      title: "Repurposing Antiques",
      content:
        `<p>This involves transforming old or antique items into new, functional, and aesthetically pleasing objects:</p>
         <ul> 
           <li>Turning vintage portholes into coffee tables or table lamps</li> 
           <li>Using antique windows as picture frames or wall art</li>
           <li>Repurposing old silverware into decorative pieces</li>
         </ul>`
    },
    {
      title: "Antique-Inspired Design",
      content:
        `<p>This involves drawing inspiration from antique styles, motifs, and techniques to create new pieces with a vintage aesthetic:</p>
         <ul>
           <li>Furniture design that incorporates elements from different historical periods</li>
           <li>Fashion that reinterprets vintage clothing styles</li>
           <li>Jewelry making that uses antique beads or settings</li>
         </ul>`
    },
    {
      title: "Storytelling through Antiques",
      content:
        `<p>This involves using antiques as a starting point for exploring history, culture, and personal narratives:</p>
         <ul>
           <li>Writing fictional or non-fiction stories inspired by antique objects</li>
           <li>Creating museum exhibits or historical displays that use antiques to tell stories</li>
           <li>Using antiques as props in theatrical productions or films</li>
         </ul>`
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1200, 
      once: false, 
    });
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <HomeBanner controls={false} indicators={false} />

        <Styleddiv>
          <Styledh1>
            Welcome to Creative Antiquology Discover Timeless Beauty Since 2014,
            Creative Antiqueology has been your trusted source for exquisite
            antiques. Our curated selection features timeless pieces crafted
            from brass and bronze, along with stunning furniture and captivating
            paintings.

            <p className="mt-3">
              Each item in our collection tells a story and adds a touch of history
              and elegance to your space.
            </p>

            <p className="mt-3">
              The term “Creative Antiqueology” cleverly combines “creative” and “antiqueology,”
              suggesting a practice that involves appreciating the beauty and historical value of
              antiques while giving them new life and meaning through creative endeavors.
            </p>

            <StyledAccodian1 className="my-5">
              {chooseUS.map((data, i) => {
                return (
                  <Accordion key={i}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id={`panel${i}-header`}
                      style={{ fontSize: '20px', color: '#055d6b', minHeight: '50px', margin: '0' }}
                    >
                      <h4 style={{ fontSize: '16px', color: '#055d6b', margin: '0' }}>{data.title}</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        dangerouslySetInnerHTML={{ __html: data.content }}
                        style={{ fontSize: '16px', color: '#055d6b', margin: '0', borderTop: '1px solid #382925' }}
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </StyledAccodian1>
          </Styledh1>

          <Styledh1>
            In essence, “Creative Antiqueology” is about blending the old with the new,
            the historical with the contemporary, to create something unique and engaging.
          </Styledh1>
        </Styleddiv>

        <div className="page-title text-uppercase">Collections</div>
        <div className="container home-card-coursel">
          <CardCousol />
        </div>
        {/* <div><InteractiveMap/></div> */}

        <div className="container my-4 pb-4">
          <section className="about-design row">
            <div className="col-12 mt-4">
              <div className="page-title">Why Choose Us?</div>
            </div>
            <div className="col-4" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
              <div className="custom-wrapper">
                <img src={item1} alt="icon" className="h-icon" />
                <h2>Authenticity Guaranteed</h2>
                <p>
                  Each item in our collection is meticulously authenticated to ensure its historical significance and value.
                </p>
              </div>
            </div>
            <div className="col-4" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
              <div className="custom-wrapper">
                <img src={item2} alt="icon" className="h-icon" />
                <h2>Expert Knowledge</h2>
                <p>
                  Our team of antique enthusiasts is always on hand to share their knowledge and help you find the perfect piece.
                </p>
              </div>
            </div>
            <div className="col-4" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
              <div className="custom-wrapper">
                <img src={item3} alt="icon" className="h-icon" />
                <h2>Exceptional Quality</h2>
                <p>
                  We take pride in offering only the finest antiques, carefully preserved and restored to their original glory.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
