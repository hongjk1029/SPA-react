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
    const [vehicleImageURLs, setVehicleImageURLs] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});

    useEffect(() => {
      _getBrands();
      const newImageUrls = [];
      vehicleImages.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
      setVehicleImageURLs(newImageUrls)
    }, [vehicleImages]);

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

    let brandName = document.getElementById("brand").value
    let fuelType = document.getElementById("fuelType").value

    const fileData = new FormData();  
    vehicleImages.forEach((file) => fileData.append('vehicle_images', file, file.name));
    accessories.forEach((data) => fileData.append('accessories', data));

    fileData.append('vehicle', vehicleName)
    fileData.append('vehicle_brand', brandName)
    fileData.append('vehicle_overview', vehicleOverview)
    fileData.append('number_plate', vehiclePlate)
    fileData.append('price_of_cost', priceOfCost)
    fileData.append('price_of_sale', priceOfSale)
    fileData.append('fuel_type', fuelType)
    fileData.append('model_year', modelYear)
    fileData.append('seating_capacity', seatingCapacity)
    fileData.append('mileage', mileage)
    
    setErrorMessage(validator(fileData));
    addVehicle(fileData);
  };

  const validator = (data) => {
    let err = {};
    const brandName = data.get('vehicle_brand');
    const fuelType = data.get('fuel_type');
    var regexp = /^[0-9]*\.[0-9]{2}$/;

    if (vehicleName == '') {
      err.vehicleName = 'Vehicle Title is required.';
    }
    if (vehicleOverview == '') {
      err.vehicleOverview = 'Vehicle Overview is required.';
    }
    if (vehiclePlate == '') {
      err.vehiclePlate = 'Vehicle Plate is required.';
    }
    if (modelYear == '') {
      err.modelYear = 'Model Year is required.';
    }
    if (fuelType == '') {
      err.fuelType = 'Fuel Type is required.'
    }
    if (brandName == '') {
      err.brandName = 'Brand Name is required.'
    }

    if (priceOfCost == '') {
      err.priceOfCost = 'Price of Cost is required.'
    } else if (priceOfCost < 0) {
      err.priceOfCost = 'Price of Cost cannot be lesser than 0.'
    } else if (!regexp.test(priceOfCost)) {
      err.priceOfCost = 'Price cannot more than 2 decimal places.'
    }

    if (priceOfSale == '') {
      err.priceOfSale = 'Price of Sale is required.'
    }  else if (priceOfSale < 0) {
      err.priceOfSale = 'Price of Sale cannot be lesser than 0.'
    } else if (!regexp.test(priceOfSale)) {
      err.priceOfSale = 'Price cannot more than 2 decimal places.'
    }

    if (seatingCapacity == '') {
      err.seatingCapacity = 'Seating Capacity is required.'
    }
    if (mileage == '') {
      err.mileage = 'Mileage is required.'
    }
    if (accessories == '') {
      err.accessories = 'Accessories are required.'
    }

    return err;
  };

  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      console.log('No error found');
      clearForm();
    }
    else {
      console.log(errorMessage);
    }
  }, [errorMessage])
  

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
                onChange={event => setVehicleName(event.target.value)} value={vehicleName}/>
                <span className="text-danger">{ errorMessage.vehicleName }</span>
            </Col>

            <Col lg="5">
              <label htmlFor="brand">Select Brand</label>
              <select id="brand" className="form-control">
              <option key='' value=''>--Select One--</option>
                {brands.map((option, index) => (
                  <option key={index} value={option.id}>{option.brand_name}</option>
                ))}
              </select>
              <span className="text-danger">{ errorMessage.brandName }</span>
            </Col>
          </Row>

          <hr className="style1 mt-4 section-line"></hr>

          {/* 2nd row */}
          <Row>
            <Col lg="10">
              <label htmlFor="overview">Vehicle Overview</label>
              <textarea rows="3" className="form-control" id="overview"
              onChange={event => setVehicleOverview(event.target.value)} value={vehicleOverview} ></textarea>
              <span className="text-danger">{ errorMessage.vehicleOverview }</span>
            </Col>
          </Row>

          {/* 3rd row */}
          <Row className="mt-3">
            <Col lg="5">
              <label htmlFor="modelYear">Model Year</label>
              <input type="number" className="form-control" id="modelYear"
              onChange={event => setModelYear(event.target.value)} value={modelYear} />
              <span className="text-danger">{ errorMessage.modelYear }</span>
            </Col>
            
            <Col lg="5">
              <label htmlFor="capacity">Seating Capacity</label>
              <input type="number" className="form-control" id="capacity"
              onChange={event => setSeatingCapacity(event.target.value)} value={seatingCapacity} />
              <span className="text-danger">{ errorMessage.seatingCapacity }</span>
            </Col>
          </Row>

          {/* 4th row */}
          <Row className="mt-3">
            <Col lg="5">
              <label htmlFor="plate">Vehicle Plate</label>
              <input type="text" className="form-control" id="plate"
              onChange={event => setVehiclePlate(event.target.value)} value={vehiclePlate}  />
              <span className="text-danger">{ errorMessage.vehiclePlate }</span>
            </Col>
            
            <Col lg="5">
              <label htmlFor="mileage">Vehicle Mileage (Per KM)</label>
              <input type="number" className="form-control" id="mileage" 
              onChange={event => setMileage(event.target.value)} value={mileage} />
              <span className="text-danger">{ errorMessage.mileage}</span>
            </Col>
          </Row>

          {/* 5th row */}
          <Row className="mt-3">
            <Col lg="5">
              <label htmlFor="fuelType">Select Fuel Type</label>
              <select id="fuelType" className="form-control" >
                <option value="">--Select One--</option>
                <option key="fueltype1" value="Petrol">Petrol</option>
                <option key="fueltype2" value="Electric">Electric</option>
                <option key="fueltype3" value="Hybrid">Hybrid</option>
              </select>
              <span className="text-danger">{ errorMessage.fuelType}</span>
            </Col>
            
            <Col lg="5">
              <label htmlFor="saleType">Select Sale Type</label>
              <select
                id="page"
                className="form-control"
                ref={select}
                defaultValue=""
                onChange={(e) => setChosenSalesType(e.target.value, changeSalesType(e))}
                
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
                  <input type="text" className="form-control" id="pricePerWeek"  />
                </Col>
                  
                <Col lg="5">
                  <label htmlFor="mileage">Price Per Month (RM)</label>
                  <input type="text" className="form-control" id="pricePerMonth"  />
                </Col>
              </Row>
            </>
          ) : <></>}
            {chosenSalesType === "Sale" ? (
            <>
              <Row className="mt-3">
                <Col lg="5">
                  <label htmlFor="plate">Price of Cost (RM)</label>
                    <input type="number" step=".01" className="form-control" id="priceOfCost"
                    onChange={event => setPriceOfCost(event.target.value)} value={priceOfCost}  />
                    <span className="text-danger">{ errorMessage.priceOfCost }</span>
                </Col>
                
                <Col lg="5">
                  <label htmlFor="mileage">Price of Sale (RM)</label>
                    <input type="text" className="form-control" id="priceOfSale" 
                    onChange={event => setPriceOfSale(event.target.value)} value={priceOfSale}  />
                    <span className="text-danger">{ errorMessage.priceOfSale }</span>
                </Col>
              </Row>
            </>
          ) : <></>}

          {/* 7th row 
          <div className="form-group col-md-5 mt-3">
            <label htmlFor="status">Status</label>
            <select id="status" className="form-control" >
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
              accept="image/*" onChange={onImageChange} />
            </Col>
          </Row>
          {vehicleImageURLs?.length > 0 && <Row className="d-flex flex-wrap mt-4">
            {vehicleImageURLs.map((item, index) => (
              <Col key={index} lg="auto" sm="auto" md="auto" className="mt-2">
                <img
                  src={item}
                  className="img-fluid img-thumbnail img-preview-size"
                  alt={item}
                />
              </Col>
            ))}
          </Row>}

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
            <span className="text-danger">{ errorMessage.accessories }</span>
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