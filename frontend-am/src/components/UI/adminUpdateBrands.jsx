import React, {useState} from "react";
import { Container, Row, Col } from "reactstrap";

const UpdateBrand = () => {
    const [chosenBrand,setChosenBrand] = useState('')
  return (
    <section>
      <Container>
        <Row>
          <h2>Update Brand ({chosenBrand})</h2>
          <hr class="style1 text-secondary"></hr>

          <form class="d-flex form-inline">
            <Col lg="6">
              <div class="form-group mb-2 textbox">
                <input type="text" class="form-control" id="inputBrand" placeholder="Brand" />
              </div>
            </Col>

            <Col lg="2">
              <button type="submit" class="btn btn-primary mb-2">Submit</button>
            </Col>
          </form>
        </Row>
        
      </Container>
    </section>
  );
};

export default UpdateBrand;
