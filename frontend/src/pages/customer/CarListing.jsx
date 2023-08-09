import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import CarItem from "../../components/UI/CarItem";
import carData from "../../assets/data/carData";
import FindCarForm from "../../components/UI/FindCarForm";
import { getVehiclesBySaleType } from "../../services/api/Provider";

const CarListing = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    _getVehiclesBySaleType("sale");
  }, []);

  function _getVehiclesBySaleType(saleType) {
    getVehiclesBySaleType(saleType).then((res) => {
      let arr = res;
      setVehicles(arr);
    });
  }

  return (
    <Helmet title="Cars">
      <CommonSection title="Sales Car Listing" />
      <section>
        <Container>
          <Row>
            {vehicles.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
