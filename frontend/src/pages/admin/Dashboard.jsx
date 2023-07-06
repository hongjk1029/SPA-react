import React, {useState,useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import { FiArrowRight } from "react-icons/fi";
import { getBrands, getVehicles } from "../../services/api/Provider";

import "../../styles/dashboard.css";

const Dashboard = () => {
  const [brands, setBrands] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    _getBrands();
    _getVehicles();
 }, []);

  function _getBrands() {
    getBrands().then((res) => {
      let arr = res;
      setBrands(arr);
    });
  }

  function _getVehicles() {
    getVehicles().then((res) => {
      let arr = res;
      setVehicles(arr);
    });
  }

  const dashboardData = [
    {
      id: 1001,
      amount: vehicles.length,
      displayName: "LISTED VEHICLES",
      redirectUrl:"/admin/vehicles",
      background: "card-header pt-4 bg-danger"
    },
    {
      id: 1002,
      amount: brands.length,
      displayName: "LISTED BRANDS",
      redirectUrl: "/admin/brands",
      background: "card-header pt-4 bg-success"
    },
    // {
    //   id: 1003,
    //   amount: 1,
    //   displayName: "QUERIES",
    //   redirectUrl: "/admin/manage-query",
    //   background: "card-header pt-4 bg-primary"
    // },
  ];

  return (
  <section>
    <Container>
      <Row>
        <h2>Dashboard</h2>
        <hr className="style1 text-secondary"></hr>
        {dashboardData.slice(0, 5).map((item, index) => (
          <Col lg="3" md="4" sm="6" className="mb-5" key={index}>
            <div className="card text-white mb-3 dashboard-card border-0">
              <div className={item.background}>
                <h1 className="text-center text-white">{item.amount}</h1>
                <p className="text-center">{item.displayName}</p>
              </div>
              <div className="card-body text-center bg-light">
                <a href={item.redirectUrl} className="card-link text-secondary text-decoration-none">FULL DETAIL <FiArrowRight/></a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>

  );
};

export default Dashboard;
