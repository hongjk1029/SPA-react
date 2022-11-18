import React, { Fragment } from "react";

import Header from "../Header/adminHeader";
import Footer from "../Footer/adminFooter";
import Routers from "../../routers/Routers";
import navLinks from "../../assets/adminData/navLinks";
import { Link } from 'react-router-dom';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Row, Col } from "reactstrap";

import "../../styles/adminSidebar.css";

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
            <hr />
            <MenuItem routerLink={<Link to= "/admin/password/edit" />} > Change Admin Password </MenuItem>
            </Menu>
            <div style={{position: 'absolute' ,bottom: 25 ,left: 25}}>
            <button type="button" class="btn btn-secondary btn-lg" onClick={{}}>Sign Out</button>
            </div>
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
