import React ,{useState, useRef}from "react";
import { Container, Row, Col } from "reactstrap";
import carBrand from "../../../assets/data/carBrand.js";
import accessoriesData from "../../../assets/data/accessoriesData.js";
import "../../../styles/common-section.css";

const AddVehicles = () => { 
    const salesTypeData = [ { id: 1, name: "Rental", }, { id: 2, name: "Sale", }, ];
    const [chosenSalesType, setChosenSalesType] = useState("");
    const select = useRef();
    
  return (
    <section>
      <Container>
        <Row>
          <h2>Add Vehicle</h2>
          <hr className="style1 text-secondary"></hr>

          {/* 1st row */}
          <div className="form-group col-md-5">
            <label htmlFor="title">Vehicle Title <span style={{color: "red"}}>*</span></label>
            <input type="text" className="form-control" id="title" required />
          </div>
          <div className="form-group col-md-1"></div>
          <div className="form-group col-md-5">
            <label htmlFor="brand">Select Brand <span style={{color: "red"}}>*</span></label>
            <select id="brand" className="form-control" required>
              {carBrand.map((option, index) => (
                <option key={index} value={option.value}>{option.value}</option>
              ))}
            </select>
          </div>

          <hr className="style1 mt-4 section-line"></hr>

          {/* 2nd row */}
          <div className="form-group col-md-11">
            <label htmlFor="overview">Vehicle Overview <span style={{color: "red"}}>*</span></label>
            <textarea rows="3" className="form-control" id="overview" required ></textarea>
          </div>

          {/* 3rd row */}
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="modelYear">Model Year <span style={{color: "red"}}>*</span></label>
            <input type="text" className="form-control" id="modelYear" required />
          </div>
          <div className="form-group col-md-1 mt-3"></div>
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="capacity">Seating Capacity <span style={{color: "red"}}>*</span></label>
            <input type="text" className="form-control" id="capacity" required />
          </div>

          {/* 4th row */}
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="plate">Vehicle Plate <span style={{color: "red"}}>*</span></label>
            <input type="text" className="form-control" id="plate" required />
          </div>
          <div className="form-group col-md-1 mt-3"></div>
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="mileage">Vehicle Mileage (Per KM) <span style={{color: "red"}}>*</span></label>
            <input type="text" className="form-control" id="mileage" required />
          </div>

          {/* 5th row */}
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="fuelType">Select Fuel Type <span style={{color: "red"}}>*</span></label>
            <select id="fuelType" className="form-control" required>
              <option value="">None</option>
            </select>
          </div>
          <div className="form-group col-md-1 mt-3"></div>
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="saleType">Select Sale Type <span style={{color: "red"}}>*</span></label>
            <select
              id="page"
              className="form-control"
              ref={select}
              defaultValue=""
              onChange={(e) => setChosenSalesType(e.target.value)}
              required
            >
              {salesTypeData.map((option, index) => (
                <option key={index} value={option.name}>{option.name}</option>
              ))}
            </select>
          </div>

          {/* 6th row */}
          {chosenSalesType === "Rental" ? (
            <>
              <div className="form-group col-md-5 mt-3">
                <label htmlFor="plate">Price Per Week (RM) <span style={{color: "red"}}>*</span></label>
                <input type="text" className="form-control" id="pricePerWeek" required />
              </div>
              <div className="form-group col-md-1 mt-3"></div>
              <div className="form-group col-md-5 mt-3">
                <label htmlFor="mileage">Price Per Month (RM) <span style={{color: "red"}}>*</span></label>
                <input type="text" className="form-control" id="pricePerMonth" required />
              </div>
            </>
          ) : <></>}
            {chosenSalesType === "Sale" ? (
            <>
              <div className="form-group col-md-5 mt-3">
                <label htmlFor="plate">Price of Cost (RM) <span style={{color: "red"}}>*</span></label>
                <input type="text" className="form-control" id="priceOfCost" required />
              </div>
              <div className="form-group col-md-1 mt-3"></div>
              <div className="form-group col-md-5 mt-3">
                <label htmlFor="mileage">Price of Sale (RM) <span style={{color: "red"}}>*</span></label>
                <input type="text" className="form-control" id="priceOfSale" required />
              </div>
            </>
          ) : <></>}

          {/* 7th row */}
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="status">Status <span style={{color: "red"}}>*</span></label>
            <select id="status" className="form-control" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <hr className="style1 mt-4 section-line"></hr>

          {/* 8th row */}
          <h5>Upload Images <span style={{color: "red"}}>*</span></h5>
          <input className="form-control mt-2" type="file" id="formFileMultipleImages" multiple />

          <hr className="style1 mt-4 section-line"></hr>

          {/* 9th row */}
          <h5>Upload Document Images <span style={{color: "red"}}>*</span></h5>
          <input className="form-control mt-2" type="file" id="formFileMultipleDocuments" multiple />

          <hr className="style1 mt-4 section-line"></hr>

          {/* 10th row */}
          <h5>Accessories <span style={{color: "red"}}>*</span></h5>
          {accessoriesData.map((option, index) => (
            <div className="form-check form-check-inline col-md-3 mt-3" key={index} >
              <input className="form-check-input" type="checkbox" id={option.value} value={option.value} />
              <label className="form-check-label" htmlFor={option.value}>
                {option.value}
              </label>
            </div>
          ))}

          <hr className="style1 mt-4 section-line"></hr>
        </Row>
        <button type="submit" className="btn btn-secondary float-end"> Cancel </button>
        <button type="submit" className="btn btn-primary float-end mx-2"> Save Changes </button>
      </Container>
    </section>
  );
}

export default AddVehicles;