import React, { useState , useEffect} from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logo1 from "../../assets/all-images/logo1.svg";
import Helmet from "../Helmet/Helmet";

const quickLinksAdmin = [
  {
    path: "#",
    display: "About",
  },
  {
    path: "#",
    display: "Privacy Policy",
  },
  {
    // path: "#",
    // display: "Contact",
  },
];

const quickLinksCustomer = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "/cars",
    display: "Car Listing",
  },

  {
    path: "/policy",
    display: "Privacy & Policy",
  },

  {
    path: "/terms",
    display: "Terms & Condition",
  },

  {
    // path: "/contact",
    // display: "Contact",
  },
];

const Footer = ({isLogin}) => {

  useEffect(()=> {
    setAdmin(isLogin)
  },[isLogin])

  const [isAdmin, setAdmin] = useState(isLogin);
  const date = new Date();
  const year = date.getFullYear();
  if(isAdmin){
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4" md="4" sm="12">
              <div className="logo footer__logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <img src={logo1} alt="" />
                  </Link>
                </h1>
              </div>
              <p className="footer__logo-content">
                We are an one stop Automotive company that could serve you the best service on your selection of car variety.
              </p>
            </Col>
  
            <Col lg="2" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title">Quick Links</h5>
                <ListGroup>
                  {quickLinksAdmin.map((item, index) => (
                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </Col>
  
            <Col lg="3" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title mb-4">Main Office</h5>
                <p className="office__info">Address: No.11, Lot 6015, Jalan Ipoh Batu 7 1/2, Taman Selayang Makmur, 68100 Selayang, Selangor</p>
                <p className="office__info">Phone: +60123160808</p>
  
                <p className="office__info">Email: smartpowerauto@yahoo.com</p>
  
                <p className="office__info">Office Time: Monday till Saturday 9AM-5PM</p>
              </div>
            </Col>
  
            <Col lg="3" md="4" sm="12">
              <div className="mb-4">
              </div>
            </Col>
  
            <Col lg="12">
              <div className="footer__bottom">
                <p className="footer__description d-flex align-items-center justify-content-center gap-1 pt-4">
                  <i className="ri-copyright-line"></i>Copyright 2022, Developed by
                  SPA tech team. All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
  else{
    return (
      <footer className="footer">
        <Container>
          <Row>
          <Col lg="4" md="4" sm="12">
              <div className="logo footer__logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <img src={logo1} alt="" />
                  </Link>
                </h1>
              </div>
              <p className="footer__logo-content">
                We are an one stop Automotive company that could serve you the best service on your selection of car variety.
              </p>
            </Col>
  
            <Col lg="2" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title">Quick Links</h5>
                <ListGroup>
                  {quickLinksCustomer.map((item, index) => (
                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </Col>
  
            <Col lg="3" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title mb-4">Main Office</h5>
                <p className="office__info">Address: No.11, Lot 6015, Jalan Ipoh Batu 7 1/2, Taman Selayang Makmur, 68100 Selayang, Selangor</p>
                <p className="office__info">Phone: +60123160808</p>
  
                <p className="office__info">Email: smartpowerauto@yahoo.com</p>
  
                <p className="office__info">Office Time: Monday till Saturday 9AM-5PM</p>
              </div>
            </Col>
  
            <Col lg="3" md="4" sm="12">
              <div className="mb-4">
              </div>
            </Col>
  
            <Col lg="12">
              <div className="footer__bottom">
                <p className="footer__description d-flex align-items-center justify-content-center gap-1 pt-4">
                  <i className="ri-copyright-line"></i>Copyright 2022, Developed by
                  SPA tech team. All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        {/* <Helmet> <script defer src="https://widget.tochat.be/bundle.js?key=76872d3b-f925-4359-b7c1-5f94ef9dbe95"></script></Helmet> */}
        <Helmet><script defer src="https://widget.tochat.be/bundle.js?key=d6bff245-9f32-4ecf-aa8a-12c0418bee9d"></script></Helmet>
        
      </footer>
    );
  }
  
};

export default Footer;
