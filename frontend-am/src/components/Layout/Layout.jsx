import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import navLinks from "../../assets/data/navLinks";
import { Link } from 'react-router-dom';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Row, Col } from "reactstrap";

import "../../styles/sidebar.css";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <Row>
        <Col lg="auto">
          <Sidebar backgroundColor="#212529">
            <div class="px-3 pt-3 pb-1">
             <label class="text-secondary">MAIN</label>
            </div>
            <Menu>
            {navLinks.map((item) => {
              if(item.hasChild){
                return(
                  <SubMenu label={item.display}>
                    {item.child.map((childItem) => (
                        <MenuItem routerLink={<Link to={childItem.childPath} />}>
                          {childItem.childDisplay}
                        </MenuItem>
                      ))}
                  </SubMenu>
                )
              }
              else{
                return(
                  <MenuItem
                    routerLink={<Link to={item.path} />}
                    >
                      {item.display}
                  </MenuItem>
                )
              }
            })}
            </Menu>
          </Sidebar>
        </Col>
        
        <Col>
          <div>
            <Routers />
          </div>
        </Col>
      </Row>
      <Footer />
    </Fragment>
  );
};

export default Layout;
