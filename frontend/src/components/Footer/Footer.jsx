import React, { useState } from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

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
    path: "#",
    display: "Contact",
  },
];

const quickLinksCustomer = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "#",
    display: "Privacy Policy",
  },

  {
    path: "/cars",
    display: "Car Listing",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = ({isLogin}) => {
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
                    <i className="ri-car-line"></i>
                    <span>
                      Smart Power Auto <br />Automotive : Admin
                    </span>
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
                <p className="office__info">Address: HQ address</p>
                <p className="office__info">Phone: HQ phone</p>
  
                <p className="office__info">Email: HQ email</p>
  
                <p className="office__info">Office Time: HQ working time</p>
              </div>
            </Col>
  
            <Col lg="3" md="4" sm="12">
              <div className="mb-4">
                {/* <h5 className="footer__link-title">Newsletter</h5>
                <p className="section__description">Subscribe our newsletter</p>
                <div className="newsletter">
                  <input type="email" placeholder="Email" />
                  <span>
                    <i className="ri-send-plane-line"></i>
                  </span>
                </div> */}
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
                    <i className="ri-car-line"></i>
                    <span>
                      Smart Power Auto <br />Automotive
                    </span>
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
                <p className="office__info">Address: HQ address</p>
                <p className="office__info">Phone: HQ phone</p>
  
                <p className="office__info">Email: HQ email</p>
  
                <p className="office__info">Office Time: HQ working time</p>
              </div>
            </Col>
  
            <Col lg="3" md="4" sm="12">
              <div className="mb-4">
                {/* <h5 className="footer__link-title">Newsletter</h5>
                <p className="section__description">Subscribe our newsletter</p>
                <div className="newsletter">
                  <input type="email" placeholder="Email" />
                  <span>
                    <i className="ri-send-plane-line"></i>
                  </span>
                </div> */}
              </div>
            </Col>
  
            <Col lg="12">
              <div className="footer__bottom">
                <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
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
  
};

export default Footer;
