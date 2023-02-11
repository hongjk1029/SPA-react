import React, {useState,useEffect} from "react";
import { Container, Row, Col } from "reactstrap";

import HeroSlider from "../../components/UI/HeroSlider";
import Helmet from "../../components/Helmet/Helmet";
import CarItem from "../../components/UI/CarItem";
import FindCarForm from "../../components/UI/FindCarForm";
import AboutSection from "../../components/UI/AboutSection";
import ServicesList from "../../components/UI/ServicesList";
import { getVehicles } from "../../services/api/Provider";

import carData from "../../assets/data/carData";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    _getVehicles();
 }, []);

  function _getVehicles() {
    getVehicles().then((res) => {
      let arr = res;
      setVehicles(arr);
    });
  }

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Find your best car here</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm fromHome={true}/>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers !</h2>
            </Col>

            {vehicles.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
