import React, { useRef , useState , useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import "../../styles/header.css";
import { RiShutDownLine } from "react-icons/ri";
import logo1 from "../../assets/all-images/logo1.svg";
import { Helmet } from 'react-helmet';


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    // path: "/contact",
    // display: "Contact",
  },
];

const NotAdminPage = () => {
  const location = useLocation();
  return !location.pathname.includes('/admin');
};

const Header = ({ isLogin, setLogin}) => {
  
  useEffect(()=> {
    setAdmin(isLogin)
  },[isLogin])

  const [isAdmin, setAdmin] = useState(isLogin);

  const currentPath = useLocation();

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  function navigateToWhatsApp() {
    // window.location.href = 'https://api.whatsapp.com/send?phone=60123160808';
    window.open('https://api.whatsapp.com/send?phone=60123160808', '_blank');
  }


  const handleSignOut = () => { localStorage.clear();setLogin(false); navigate("/admin/sign-in")}

  if(currentPath.pathname === "/admin/sign-in"){
    return (
      <header className="header">
      {/* =============== header middle =========== */}
      <div className="header__top"></div>
      <div className="header__middle">
        <Container>
          <Row>
          <Col lg="4" md="3" sm="4">
                <div className="logo" style={{height:'50px', marginTop:'-20px'}}>
                  <h1>
                    <Link to="/home" className=" d-flex align-items-center gap-2">
                       <img src={logo1} alt="" />
                    </Link>
                  </h1>
                </div>
              </Col>
            <Col lg="3" md="3" sm="4"> </Col>
            <Col lg="3" md="3" sm="4"> </Col>
            <Col lg="2" md="3" sm="0"> </Col>
          </Row>
        </Container>
      </div>
    </header>
    )
  }
  else if(isAdmin){
    return (
      <header className="header">

        {/* ============ header top ============ */}
        <div className="header__top">
          <Container></Container>
        </div>
  
        {/* =============== header middle =========== */}
        <div className="header__middle">
          <Container style={{height:'100%'}}>
            <Row >
              <Col lg="4" md="3" sm="4">
                <div className="logo" style={{height:'50px', marginTop:'-20px'}}>
                  <h1>
                    <Link to="/home" className=" d-flex align-items-center gap-2">
                       <img src={logo1} alt="" />
                    </Link>
                  </h1>
                </div>
              </Col>
  
              <Col lg="3" md="3" sm="4"></Col>
  
              <Col lg="3" md="3" sm="4"></Col>
  
              <Col lg="2" md="3" sm="0" >
              <button className="btnSignout rounded-3" type="button" style={{height:'50px', marginTop:'-20px', float:'right'}} onClick={handleSignOut}>
            <RiShutDownLine />
              {' '}Sign Out 
            </button>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    );
  }
    else{
      return (
        <header className="header">
          {NotAdminPage() && (
            // <Helmet>
            //   <script defer src="https://widget.tochat.be/bundle.js?key=76872d3b-f925-4359-b7c1-5f94ef9dbe95" />
            // </Helmet>
                    <Helmet>
                      <script defer src="https://widget.tochat.be/bundle.js?key=d6bff245-9f32-4ecf-aa8a-12c0418bee9d"/>
                    </Helmet>

          )}
        {/* ============ header top ============ */}
        <div className="header__top">
          <Container>
        
          </Container>
        </div>
  
        {/* =============== header middle =========== */}
        <div className="header__middle">
          <Container>
            <Row>
            <Col lg="4" md="3" sm="4">
                <div className="logo" style={{height:'50px', marginTop:'-20px'}}>
                  <h1>
                    <Link to="/home" className=" d-flex align-items-center gap-2">
                       <img src={logo1} alt="" />
                    </Link>
                  </h1>
                </div>
              </Col>
  
              <Col lg="3" md="3" sm="4"> </Col>
  
              <Col lg="3" md="3" sm="4"> </Col>
  
              <Col lg="2" md="3" sm="0" className=" d-flex align-items-center justify-content-end " >
                <button className="header__btn btn ">
                  {/* <Link to="/contact">
                    <i className="ri-phone-line"></i> Request a call
                  </Link> */}
                    <Link onClick={navigateToWhatsApp}>
                      <i className="ri-phone-line"></i> Request a quote
                    </Link>
                </button>
              </Col>
            </Row>
          </Container>
        </div>
  
        {/* ========== main navigation =========== */}
  
        <div className="main__navbar">
          <Container>
            <div className="navigation__wrapper d-flex align-items-center justify-content-between">
              <span className="mobile__menu">
                <i className="ri-menu-line" onClick={toggleMenu}></i>
              </span>
  
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <div className="menu">
                  {navLinks.map((item, index) => (
                    <NavLink to={item.path} className={(navClass) => navClass.isActive ? "nav__active nav__item" : "nav__item" } key={index} >
                      {item.display}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      )
    }
};

export default Header;
