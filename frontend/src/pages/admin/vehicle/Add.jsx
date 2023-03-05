import React ,{useState, useRef, useEffect}from "react";
import { Container, Row, Col } from "reactstrap";
import accessoriesData from "../../../assets/data/accessoriesData.js";
import "../../../styles/common-section.css";
import { getBrands, addVehicle } from "../../../services/api/Provider";

const accessoriesList = []

const AddVehicles = () => { 
    const salesTypeData = [ /*{ id: 1, name: "Rental", },*/ { id: 2, name: "Sale", }, ];
    const [chosenSalesType, setChosenSalesType] = useState("Sale");
    const select = useRef();
    const [brands, setBrands] = useState([]);
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleOverview, setVehicleOverview] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [priceOfCost, setPriceOfCost] = useState('');
    const [priceOfSale, setPriceOfSale] = useState('');
    const [modelYear, setModelYear] = useState('');
    const [seatingCapacity, setSeatingCapacity] = useState('');
    const [mileage, setMileage] = useState('');
    const [vehicleImages, setVehicleImages] = useState([]);
    const [accessories, setAccessories] = useState([]);
    //const [vehicleImageURLs, setVehicleImageURLs] = useState([]);

    useEffect(() => {
      _getBrands();
      //const newImageUrls = [];
      //vehicleImages.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
      //setVehicleImageURLs(newImageUrls)
      //console.log(vehicleImageURLs)
    }, []);

 function _getBrands() {
  getBrands().then((res) => {
      let arr = res;
      setBrands(arr);
    });
  }

  function changeSalesType(e){
    if (e.target.value == "Rental"){
      setPriceOfCost('');
      setPriceOfSale('');
    }
    else{
      //set Price Per Week (RM) and Price Per Month (RM) to empty
    }
  }

  function onImageChange(e){
    setVehicleImages([...e.target.files])
  }

  function onAccessoriesChange(e){
    if (accessoriesList.includes(e.target.value)){
      const index = accessoriesList.findIndex(obj => obj == e.target.value)
      if (index !== -1){
        accessoriesList.splice(index, 1);
      }
    }
    else{
      accessoriesList.push(e.target.value)
    }
    setAccessories(accessoriesList);
  }

  const clearForm = event =>{
    setVehicleName('');
    setVehicleOverview('');
    setVehiclePlate('');
    setPriceOfCost('');
    setPriceOfSale('');
    setModelYear('');
    setSeatingCapacity('');
    setMileage('');
    document.getElementById("vehicleForm").reset()
  }

  const saveVehicle = event =>{
    event.preventDefault();
    alert('Confirm to save?')

    const fileData = new FormData();
    vehicleImages.forEach((file) => fileData.append('vehicle_images[]', file, file.name));

  //   for (var pair of fileData.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1].name); 
  //    }
    //console.log(fileData)
    //console.log(vehicleImages)
    let brandName = document.getElementById("brand").value
    let fuelType = document.getElementById("fuelType").value
    addVehicle(vehicleName, brandName, vehicleOverview, vehiclePlate, priceOfCost, priceOfSale, fuelType, modelYear, seatingCapacity, mileage, fileData, accessories);

    clearForm();
  };
  

  return (
    <section>
      <Container>
        
          <h2>Add Vehicle</h2>
          <hr className="style1 text-secondary"></hr>

          <form id="vehicleForm" onSubmit={saveVehicle}>

          {/* 1st row */}
          <Row>
            <Col lg="5">
              <label htmlFor="title">Vehicle Title</label>
              <input type="text" className="form-control" id="vehicle_name"
              onChange={event => setVehicleName(event.target.value)} value={vehicleName} required />
            </Col>

            <Col lg="5">
              <label htmlFor="brand">Select Brand</label>
              <select id="brand" className="form-control" required>
              <option key='' value=''>--Select One--</option>
                {brands.map((option, index) => (
                  <option key={index} value={option.id}>{option.brand_name}</option>
                ))}
              </select>
            </Col>
          </Row>

          <hr className="style1 mt-4 section-line"></hr>

          {/* 2nd row */}
          <Row>
            <Col lg="10">
              <label htmlFor="overview">Vehicle Overview</label>
              <textarea rows="3" className="form-control" id="overview"
              onChange={event => setVehicleOverview(event.target.value)} value={vehicleOverview} required></textarea>
            </Col>
          </Row>

          {/* 3rd row */}
          <Row className="mt-3">
            <Col lg="5">
              <label htmlFor="modelYear">Model Year</label>
              <input type="text" className="form-control" id="modelYear"
              onChange={event => setModelYear(event.target.value)} value={modelYear} required/>
            </Col>
            
            <Col lg="5">
              <label htmlFor="capacity">Seating Capacity</label>
              <input type="text" className="form-control" id="capacity"
              onChange={event => setSeatingCapacity(event.target.value)} value={seatingCapacity} required/>
            </Col>
          </Row>

          {/* 4th row */}
          <Row className="mt-3">
            <Col lg="5">
              <label htmlFor="plate">Vehicle Plate</label>
              <input type="text" className="form-control" id="plate"
              onChange={event => setVehiclePlate(event.target.value)} value={vehiclePlate} required />
            </Col>
            
            <Col lg="5">
              <label htmlFor="mileage">Vehicle Mileage (Per KM)</label>
              <input type="text" className="form-control" id="mileage" 
              onChange={event => setMileage(event.target.value)} value={mileage} required/>
            </Col>
          </Row>

          {/* 5th row */}
          <Row className="mt-3">
            <Col lg="5">
              <label htmlFor="fuelType">Select Fuel Type</label>
              <select id="fuelType" className="form-control" required>
                <option value="">--Select One--</option>
                <option key="fueltype1" value="Petrol">Petrol</option>
                <option key="fueltype2" value="Electric">Electric</option>
                <option key="fueltype3" value="Hybrid">Hybrid</option>
              </select>
            </Col>
            
            <Col lg="5">
              <label htmlFor="saleType">Select Sale Type</label>
              <select
                id="page"
                className="form-control"
                ref={select}
                defaultValue=""
                onChange={(e) => setChosenSalesType(e.target.value, changeSalesType(e))}
                required
              >
                {salesTypeData.map((option, index) => (
                  <option key={index} value={option.name}>{option.name}</option>
                ))}
              </select>
            </Col>
          </Row>

          {/* 6th row */}
          {chosenSalesType === "Rental" ? (
            <>
              <Row className="mt-3">
                <Col lg="5">
                  <label htmlFor="plate">Price Per Week (RM)</label>
                  <input type="text" className="form-control" id="pricePerWeek" required />
                </Col>
                  
                <Col lg="5">
                  <label htmlFor="mileage">Price Per Month (RM)</label>
                  <input type="text" className="form-control" id="pricePerMonth" required />
                </Col>
              </Row>
            </>
          ) : <></>}
            {chosenSalesType === "Sale" ? (
            <>
              <Row className="mt-3">
                <Col lg="5">
                  <label htmlFor="plate">Price of Cost (RM)</label>
                    <input type="text" className="form-control" id="priceOfCost"
                    onChange={event => setPriceOfCost(event.target.value)} value={priceOfCost} required />
                </Col>
                
                <Col lg="5">
                  <label htmlFor="mileage">Price of Sale (RM)</label>
                    <input type="text" className="form-control" id="priceOfSale" 
                    onChange={event => setPriceOfSale(event.target.value)} value={priceOfSale} required />
                </Col>
              </Row>
            </>
          ) : <></>}

          {/* 7th row 
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="status">Status</label>
            <select id="status" className="form-control" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div> */}

          <hr className="style1 mt-4 section-line"></hr>

          {/* 8th row */}
          <Row className="mt-2">
          <h5>Upload Images</h5>
            <Col lg="10">
              <input className="form-control mt-2" type="file" id="formFileMultipleImages" multiple 
              accept="image/*" onChange={onImageChange} required/>
            </Col>
          </Row>

          <hr className="style1 mt-4 section-line"></hr>

          {/* 9th row */}
          <Row className="mt-2">
          <h5>Upload Document Images</h5>
            <Col lg="10">
              <input className="form-control mt-2" type="file" id="formFileMultipleDocuments" multiple />
            </Col>
          </Row>

          <hr className="style1 mt-4 section-line"></hr>

          {/* 10th row */}
          <Row className="mt-3">
          <h5>Accessories</h5>
            {accessoriesData.map((option, index) => (
              <div className="form-check form-check-inline col-md-3 mt-3" key={index} >
                <input className="form-check-input" type="checkbox" id={option.value} value={option.value} onChange={onAccessoriesChange}/>
                <label className="form-check-label" htmlFor={option.value}>
                  {option.value}
                </label>
              </div>
            ))}
          </Row>
          <Row>
            
          </Row>

          <hr className="style1 mt-4 section-line"></hr>

          <button type="button" className="btn btn-secondary float-end" onClick={clearForm}> Clear </button>
          <button type="submit" className="btn btn-primary float-end mx-2"> Save Changes </button>

          </form>
      </Container>
    </section>
  );
}

export default AddVehicles;