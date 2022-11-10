import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/common-section.css";
import carBrand from "../../assets/data/carBrand.js";
import accessoriesData from "../../assets/data/accessoriesData.js";


const AddVehicles = () => { 
  return(
    <section>
      <Container>
        <Row>
            <h2>Add Vehicle</h2>
            <hr class="style1 text-secondary"></hr>

            {/* 1st row */}
            <div class="form-group col-md-5">
            <label for="title">Vehicle Title</label>
            <input type="text" class="form-control" id="title" required/>
            </div>
            <div class="form-group col-md-1"></div>
            <div class="form-group col-md-5">
                <label for="brand">Select Brand</label>
                <select id="brand" class="form-control" required>
                    <option value="" selected>--Select--</option>
                    {carBrand.map((option) => (
                        <option value={option.value}>{option.value}</option>
                    ))}
                </select>
            </div>

            <hr class="style1 mt-4 section-line"></hr>

            {/* 2nd row */}
            <div class="form-group col-md-11">
            <label for="overview">Vehicle Overview</label>
            <textarea
                    rows="3"
                    className="form-control"
                    id="overview"
                    required
                  ></textarea>
            </div>

            {/* 3rd row */}
            <div class="form-group col-md-5 mt-3">
                <label for="modelYear">Model Year</label>
                <input type="text" class="form-control" id="modelYear" required/>
            </div>
            <div class="form-group col-md-1 mt-3"></div>
            <div class="form-group col-md-5 mt-3">
                <label for="capacity">Seating Capacity</label>
                <input type="text" class="form-control" id="capacity" required/>
            </div>

            {/* 4th row */}
            <div class="form-group col-md-5 mt-3">
                <label for="plate">Vehicle Plate</label>
                <input type="text" class="form-control" id="plate" required/>
            </div>
            <div class="form-group col-md-1 mt-3"></div>
            <div class="form-group col-md-5 mt-3">
                <label for="mileage">Vehicle Mileage (Per KM)</label>
                <input type="text" class="form-control" id="mileage" required/>
            </div>

            {/* 5th row */}
            <div class="form-group col-md-5 mt-3">
                <label for="fuelType">Select Fuel Type</label>
                <select id="fuelType" class="form-control" required>
                    <option value="" selected>--Select--</option>
                    <option value="">None</option>
                </select>
            </div>
            <div class="form-group col-md-1 mt-3"></div>
            <div class="form-group col-md-5 mt-3">
                <label for="saleType">Select Sale Type</label>
                <select id="saleType" class="form-control" required>
                    <option value="" selected>--Select--</option>
                    <option value="">None</option>
                </select>
            </div>

            {/* 6th row */}
            <div class="form-group col-md-5 mt-3">
                <label for="status">Status</label>
                <select id="status" class="form-control" required>
                    <option value="" selected>--Select--</option>
                    <option value="active" selected>Active</option>
                    <option value="inactive" selected>Inactive</option>
                </select>
            </div>

            <hr class="style1 mt-4 section-line"></hr>
            
            {/* 7th row */}
            <h5>Upload Images</h5>
            <input class="form-control mt-2" type="file" id="formFileMultiple" multiple />
                
            <hr class="style1 mt-4 section-line"></hr>

            {/* 8th row */}
            <h5>Accessories</h5>
                {accessoriesData.map((option) => (
                    <div class="form-check form-check-inline col-md-3 mt-3">
                        <input class="form-check-input" type="checkbox" id={option.value} value={option.value}/>
                        <label class="form-check-label" for={option.value}>{option.value}</label>
                    </div>
                ))}

            <hr class="style1 mt-4 section-line"></hr>  
            
        </Row>
        <button type="submit" class="btn btn-secondary float-end">Cancel</button>
        <button type="submit" class="btn btn-primary float-end mx-2">Save Changes</button>

      </Container>
    </section>
  )
}

export default AddVehicles;