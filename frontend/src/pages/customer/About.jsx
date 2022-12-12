import React from "react";

import CommonSection from "../../components/UI/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import AboutSection from "../../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";

import driveImg from "../../assets/all-images/drive.jpg";

import "../../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  WHAT WE DO FOR CUSTOMER AND DEALER
                </h2>

                <p className="section__description">
                  Transparent and secure :<br></br> 
                  No commissions, no pressure and no hidden fees. We offer a complete transparent car selling process and guarantee cash for your car.
                </p>

                <p className="section__description">
                  Nationwide Coverage :<br></br> 
                  No matter where the vehicle is from, we will make sure that the vehicle is delivered to wherever you are.
                </p>

                <p className="section__description">
                  Purchasing Made Easy :<br></br> 
                  Smart Power Auto has a large vehicle listing up for grabs with full comprehensive inspection report and pictures available for viewing.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+60123160808</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>
  );
};

export default About;
