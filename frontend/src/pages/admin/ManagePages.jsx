import React ,{useState, useRef}from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/common-section.css";
import page from "../../assets/data/pageData.js";

const ManagePages = () => {
  const select = useRef();
  const [chosenPage, setChosenPage] = useState(null);

  return (
    <section>
    <Container>
      <Row>
          <h2>Manage Page</h2>
          <hr className="style1 text-secondary"></hr>
          <div className="form-group col-md-5">
              <label htmlFor="page">Select Page</label>
              <select id="page" className="form-control" ref={select}  defaultValue="" onChange={(e) => setChosenPage(e.target.value)} required>
                  {page.map((option, index) => (
                      <option key={index} value={option.name}>{option.name}</option>
                  ))}
              </select>
          </div>

          <hr className="style1 mt-4 section-line"></hr>

          {/* 2nd row */}
          <div className="form-group col-md-11">
            <label>Selected Page : {chosenPage}</label>
          </div>
          <hr className="style1 mt-4 section-line"></hr>


          {/* 3rd row */}
             <div className="form-group col-md-11">
             <label htmlFor="overview">Page Details</label>
             <textarea rows="3" className="form-control" id="overview" required></textarea>
             </div>
             <hr className="style1 mt-4 section-line"></hr>
      </Row>
      <button type="submit" className="btn btn-secondary float-end">Cancel</button>
      <button type="submit" className="btn btn-primary float-end mx-2">Save Changes</button>

    </Container>
  </section>
  );
};

export default ManagePages;
