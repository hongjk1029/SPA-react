import React, { useRef } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/adminHeader.css";

const navLinks = [
  {
    path: "/admin/dashboard",
    display: "Dashboard",
  },
  {
    path: "/admin/brands",
    display: "Brands",
  },
  {
    path: "/admin/vehicles",
    display: "Vehicles",
  },
  {
    path: "/admin/manage-query",
    display: "Manage Query",
  },
  {
    path: "/admin/manage-pages",
    display: "Manage Pages",
  },
  {
    path: "/admin/contact-info",
    display: "Contact Info",
  },
];

const Header = () => {
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="admin_header__top">
        <Container></Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="admin_header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      Smart Power Auto <br />
                      Automotive : Admin
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4"></Col>

            <Col lg="3" md="3" sm="4"></Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            ></Col>
          </Row>
        </Container>
      </div>
    </header>
  );
};

export default Header;
