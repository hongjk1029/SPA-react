import React from "react";
import { Container, Row, Col } from "reactstrap";

const AddBrands = () => {
  return (
    <section>
      <Container>
        <Row>
          <h2>Add Brand</h2>
          <hr className="style1 text-secondary"></hr>

          <form className="d-flex form-inline">
            <Col lg="6">
              <div className="form-group mb-3 textbox">
                <input type="text" className="form-control" id="inputBrand" placeholder="Brand" required/>
              </div>
            </Col>

            <Col lg="2">
              <a>&nbsp;&nbsp;</a>
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </Col>
          </form>
        </Row>
        
      </Container>
    </section>
  );
};

export default AddBrands;
