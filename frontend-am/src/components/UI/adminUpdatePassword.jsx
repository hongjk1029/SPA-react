import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/admin-common-section.css";

const UpdatePassword = () => {
  return (
    <section>
      <Container>
        <Row>
        <h2>Change Admin Password</h2>
          <hr class="style1 text-secondary"></hr>
          <div class="form-group col-md-11">
            <label for="oldPassoword">Old Password :</label>
            <input type="password" className="form-control" id="oldPassword" required/>
          </div>

          <hr class="style1 mt-4 section-line"></hr>

          <div class="form-group col-md-11">
            <label for="newPassword">New Password :</label>
            <input type="password" className="form-control" id="newPassword" required/>
          </div>

          <hr class="style1 mt-4 section-line"></hr>

          {/* 3rd row */}
          <div class="form-group col-md-11">
            <label for="newPassword2">Confirm Password:</label>
            <input type="password" className="form-control" id="newPassword2" required/>
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

export default UpdatePassword;
