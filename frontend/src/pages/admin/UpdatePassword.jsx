import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/common-section.css";

const UpdatePassword = () => {
  return (
    <section>
      <Container>
        <Row>
        <h2>Change Admin Password</h2>
          <hr className="style1 text-secondary"></hr>
          <div className="form-group col-md-11">
            <label htmlFor="oldPassoword">Old Password :</label>
            <input type="password" className="form-control" id="oldPassword" required/>
          </div>

          <div className="form-group col-md-11 mt-4">
            <label htmlFor="newPassword">New Password :</label>
            <input type="password" className="form-control" id="newPassword" required/>
          </div>

          <div className="form-group col-md-11 mt-4">
            <label htmlFor="newPassword2">Confirm Password:</label>
            <input type="password" className="form-control" id="newPassword2" required/>
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

export default UpdatePassword;
