import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FiArrowRight } from "react-icons/fi";
import dashboardData from "../assets/adminData/dashboardData";

import "../styles/adminDashboard.css";

const Dashboard = () => {
  return (
  <section>
    <Container>
      <Row>
        <h2>Dashboard</h2>
        <hr class="style1 text-secondary"></hr>
        {dashboardData.slice(0, 5).map((item) => (
          <Col lg="3" md="4" sm="6" className="mb-5">
            <div class="card text-white mb-3 dashboard-card border-0">
              <div className={item.background}>
                <h1 class="text-center text-white">{item.amount}</h1>
                <p class="text-center">{item.displayName}</p>
              </div>
              <div class="card-body text-center bg-light">
                <a href={item.redirectUrl} class="card-link text-secondary text-decoration-none">FULL DETAIL <FiArrowRight/></a>
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
