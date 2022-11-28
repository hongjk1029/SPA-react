import React, {useState} from "react";
import { Container, Row, Col } from "reactstrap";

const UpdateBrands = () => {
    const [chosenBrand, setChosenBrand] = useState('')
  return (
    <section>
      <Container>
        <Row>
          <h2>Update Brand ({chosenBrand})</h2>
          <hr className="style1 text-secondary"></hr>

          <form className="d-flex form-inline">
            <Col lg="6">
              <div className="form-group mb-2 textbox">
                <input type="text" className="form-control" id="inputBrand" placeholder="Brand" />
              </div>
            </Col>

            <Col lg="2">
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </Col>
          </form>
        </Row>
        
      </Container>
    </section>
  );
};

export default UpdateBrands;
