import React, { Fragment, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AdminHeader from "../Header/adminHeader";
import AdminFooter from "../Footer/adminFooter";
import AdminRouters from "../../routers/AdminRouters";
import CustomerRouters from "../../routers/CustomerRouters";
import navLinks from "../../assets/adminData/navLinks";
import { Link } from 'react-router-dom';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Row, Col } from "reactstrap";

import "../../styles/adminSidebar.css";

const Layout = () => {
  const [isLogin, setLogin] = useState(false);

  if (isLogin) {
    return (
      <Fragment>
      <AdminHeader />
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
            {/* <button type="button" style={{}}> Sign Out</button> */}
            <a class="btn btn-primary" role="button">Sign Out</a>
            </div>
          </Sidebar>
        </Col>
        
        <Col>
          <div>
            <AdminRouters />
          </div>
        </Col>
      </Row>  
      <AdminFooter />
    </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Header />
        <div>
          <CustomerRouters />
        </div>
        <Footer />
      </Fragment>

    )
}
  
};

export default Layout;
