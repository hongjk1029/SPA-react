import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/common-section.css";

const ContactInfo = () => {
  return (
    <section>
      <Container>
        <Row>
        <h2>Update Contact Info</h2>
          <hr className="style1 text-secondary"></hr>
          <div className="form-group col-md-11">
            <label htmlFor="oldPassoword">Address :</label>
            <textarea className="form-control" id="address" required/>
          </div>

          <div className="form-group col-md-11 mt-4">
            <label htmlFor="newPassword">Email :</label>
            <input type="email" className="form-control" id="email" required/>
          </div>

          {/* 3rd row */}
          <div className="form-group col-md-11 mt-4">
            <label htmlFor="newPassword2">Contact Number:</label>
            <input type="text" className="form-control" id="phoneNumber" required/>
          </div>
        </Row>

        <div className="mt-4">
          <button type="submit" className="btn btn-secondary float-end">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary float-end mx-2">
            Save Changes
          </button>
        </div>
        
      </Container>
    </section>
  );
};

export default ContactInfo;
