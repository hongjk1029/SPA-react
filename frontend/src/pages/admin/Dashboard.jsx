import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FiArrowRight } from "react-icons/fi";
import dashboardData from "../../assets/data/dashboardData";

import "../../styles/dashboard.css";

const Dashboard = () => {
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
