import React, {useState,useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import CarItem from "../../components/UI/CarItem";
import carData from "../../assets/data/carData";
import FindCarForm from "../../components/UI/FindCarForm";
import { getVehiclesBySaleType } from "../../services/api/Provider";

const RentalListing = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    _getVehiclesBySaleType('rental');
 }, []);

  function _getVehiclesBySaleType(saleType) {
    getVehiclesBySaleType(saleType).then((res) => {
      let arr = res;
      setVehicles(arr);
    });
  }

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row className="form__row" lg="12">
            <Col lg="4" md="4">
              <div className="find__cars-left">
                <h2>Find your best car here</h2>
              </div>
            </Col>

            <Col lg="8" md="8" sm="12">
              <FindCarForm />
            </Col>
          </Row>
          <br></br><br></br>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {vehicles.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default RentalListing;
