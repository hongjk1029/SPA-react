import React, { Fragment, useState, useEffect } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import navLinks from "../../assets/data/navLinks";
import { Link, useLocation } from "react-router-dom";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Row, Col } from "reactstrap";

import "../../styles/sidebar.css";


const Layout = () => {

  useEffect(()=> {
    currentPath.pathname === "/admin/sign-in" ? document.body.style.overflow = "hidden": document.body.style.overflow = "auto"
  })

  
  const currentPath = useLocation();
  
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  if (isLogin) {
    return (
      <Fragment>
        <Header isLogin={isLogin} setLogin={setLogin}/>
        <Row>
          <Col lg="auto">
            <Sidebar backgroundColor="#212529" className="sidebar">
              <div className="px-3 pt-3 pb-1">
                <label className="text-secondary">MAIN</label>
              </div>
              <Menu>
                {navLinks.map((item, index) => {
                  if (item.hasChild) {
                    return (
                      <SubMenu key={item.display} label={item.display}>
                        {item.child.map((childItem, index) => (
                          <MenuItem key={index} routerLink={<Link to={childItem.childPath} />} >
                            {childItem.childDisplay}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    );
                  } else {
                    return (
                      <MenuItem key={index} routerLink={<Link to={item.path} />} >
                        {item.display}
                      </MenuItem>
                    )
                  }
                })}
                <hr />
                {/* <MenuItem routerLink={<Link to="/admin/password/edit" />}>Change Admin Password</MenuItem> */}
              </Menu>
            </Sidebar>
          </Col>

          <Col>
            <div>
              <Routers isAdmin={isLogin}/>
            </div>
          </Col>
        </Row>
        <Footer isLogin={isLogin} />
      </Fragment>
    );
  } else {
    if (currentPath.pathname === "/admin/sign-in") {
      return (
        <Fragment>
          <Header isLogin={!isLogin}/>
          <div>
            <Routers isAdmin={isLogin}/>
          </div>
            <Footer isLogin={isLogin}/>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Header isLogin={isLogin}/>
          <div>
            <Routers isAdmin={isLogin} setLogin={setLogin}/>
          </div>
          <Footer isLogin={isLogin}/>
        </Fragment>      
        )
    }
  }

};

export default Layout;
