import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
//import "../styles/car-listing.css";

const AddCar = () => {
  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
            <div>Add Car</div>
        </Container>
      </section>
    </Helmet>
  );
};

export default AddCar;
