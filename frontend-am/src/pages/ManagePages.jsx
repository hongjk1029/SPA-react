import React ,{useState, useRef}from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/common-section.css";
import page from "../assets/data/pageData.js";

const ManagePages = () => {
  const select = useRef();
  const [chosenPage, setChosenPage] = useState(null);

  return (
    <section>
    <Container>
      <Row>
          <h2>Manage Page</h2>
          <hr class="style1 text-secondary"></hr>
          <div class="form-group col-md-5">
              <label for="page">Select Page</label>
              <select id="page" class="form-control" ref={select}  defaultValue="" onChange={(e) => setChosenPage(e.target.value)}required>
                  <option value="" selected>----Select----</option>
                  {page.map((option) => (
                      <option value={option.name}>{option.name}</option>
                  ))}
              </select>
          </div>

          <hr class="style1 mt-4 section-line"></hr>

          {/* 2nd row */}
          <div class="form-group col-md-11">
            <label>Selected Page : {chosenPage}</label>
          </div>
          <hr class="style1 mt-4 section-line"></hr>


          {/* 3rd row */}
             <div class="form-group col-md-11">
             <label for="overview">Page Details</label>
             <textarea rows="3" className="form-control" id="overview" required></textarea>
             </div>
             <hr class="style1 mt-4 section-line"></hr>
      </Row>
      <button type="submit" class="btn btn-secondary float-end">Cancel</button>
      <button type="submit" class="btn btn-primary float-end mx-2">Save Changes</button>

    </Container>
  </section>
  );
};

export default ManagePages;
