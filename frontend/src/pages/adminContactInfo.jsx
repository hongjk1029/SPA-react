import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/common-section.css";

const ContactInfo = () => {
  return (
    <section>
      <Container>
        <Row>
        <h2>Update Contact Info</h2>
          <hr class="style1 text-secondary"></hr>
          <div class="form-group col-md-11">
            <label for="oldPassoword">Address :</label>
            <textarea className="form-control" id="address" required/>
          </div>

          <hr class="style1 mt-4 section-line"></hr>

          <div class="form-group col-md-11">
            <label for="newPassword">Email :</label>
            <input type="email" className="form-control" id="email" required/>
          </div>

          <hr class="style1 mt-4 section-line"></hr>

          {/* 3rd row */}
          <div class="form-group col-md-11">
            <label for="newPassword2">Contact Number:</label>
            <input type="text" className="form-control" id="phoneNumber" required/>
          </div>

          <hr class="style1 mt-4 section-line"></hr>

        </Row>
        <button type="submit" class="btn btn-secondary float-end">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary float-end mx-2">
          Save Changes
        </button>
      </Container>
    </section>
  );
};

export default ContactInfo;
