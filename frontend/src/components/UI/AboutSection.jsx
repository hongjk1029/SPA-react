import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/main-page.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "0px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to Smart Power Auto</h2>
              <p className="section__description">
              Smart Power Auto is a used car dealership located in the Selayang region of Selangor, 
              Malaysia. It is one of the select few dealerships in Malaysia that specializes in the 
              purchase and sale of high-end used cars along with other select few car brands. Smart 
              Power Auto was established with the purpose of serving used car buyers and sellers with 
              the best-in-class deals and service. <br></br>
              A few popular used luxury car brands Smart Power Auto deals in include Audi, BMW, 
              Mercedes-Benz, GMC, Jaguar, Ford, Maserati, Volkswagen, Volvo and many more. We buy and 
              sell a broad selection of car types which include Hatchback, Sedan, SUV/Crossovers, Coupe, 
              and Convertibles.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Insurance Service
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Customer Prioritization
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Reliablilty Service
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Fast and Efficient
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
