import React ,{useState, useRef, useEffect}from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import accessoriesData from "../../../assets/data/accessoriesData.js";
import { getBrands, getVehiclesById, getBrandById, updateVehicleById } from "../../../services/api/Provider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import "../../../styles/common-section.css";

let deletedImageList = [];
let deletedDocumentList = [];

function UpdateVehicles(){ 
    const location = useLocation();
    const navigate = useNavigate();
    let accessoriesList = location.state.Accessories;
    let vehicleId = location.state.Id;
    const salesTypeData = [ /*{ id: 1, name: "Rental", },*/ { id: 2, name: "Sale", }, ];
    const [chosenSalesType, setChosenSalesType] = useState("Sale");
    const select = useRef();
    const [brandId, setBrandId] = useState(0);
    const [brands, setBrands] = useState([]);
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleOverview, setVehicleOverview] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [priceOfCost, setPriceOfCost] = useState('');
    const [priceOfSale, setPriceOfSale] = useState('');
    const [modelYear, setModelYear] = useState('');
    const [seatingCapacity, setSeatingCapacity] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuelType, setFuelType] = useState('');
    //const [vehicleImages, setVehicleImages] = useState([]);
    const [newVehicleImages, setNewVehicleImages] = useState([]);
    const [deletedVehicleImages, setDeletedVehicleImages] = useState([]);
    const [vehicleImageList, setVehicleImageList] = useState(location.state.VehicleImages);
    const [vehicleImageURLs, setVehicleImageURLs] = useState([]);

    const [newVehicleDocuments, setNewVehicleDocuments] = useState([]);
    const [deletedVehicleDocuments, setDeletedVehicleDocuments] = useState([]);
    const [vehicleDocumentList, setVehicleDocumentList] = useState(location.state.VehicleDocuments);
    const [vehicleDocumentURLs, setVehicleDocumentURLs] = useState([]);

    const [accessories, setAccessories] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);

    useEffect(() => {
      _getBrands(); 
      _getVehiclesById(vehicleId);
      window.scrollTo(0, 0);
      deletedImageList = []
    }, []);

    useEffect(() => {
      const newImageUrls = [];
      newVehicleImages.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
      setVehicleImageURLs(newImageUrls);
    }, [newVehicleImages]);

    useEffect(() => {
      const newDocUrls = [];
      newVehicleDocuments.forEach(doc => newDocUrls.push(doc));
      setVehicleDocumentURLs(newDocUrls);
    }, [newVehicleDocuments]);

    function _getVehiclesById(vehicleId) {
      getVehiclesById(vehicleId).then((res) => {
        _getBrandById(res.vehicle_brand.id)
        setVehicleName(res.vehicle)
        setVehicleOverview(res.vehicle_overview)
        setVehiclePlate(res.number_plate)
        setPriceOfCost(res.price_of_cost)
        setPriceOfSale(res.price_of_sale)
        setModelYear(res.model_year)
        setSeatingCapacity(res.seating_capacity)
        setMileage(res.mileage)
        setFuelType(res.fuel_type)
        setVehicleImageList(res.vehicle_images)
        setVehicleDocumentList(res.vehicle_documents)
        setAccessories(res.accessories)
      });
    }

    function _getBrandById(brandId){
      getBrandById(brandId).then((res) =>{
          setBrandId(res.id);
      });
    }

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
      setNewVehicleImages([...e.target.files])
    }

    function onDocumentChange(e){
      setNewVehicleDocuments([...e.target.files])
    }

    function onImagePreviewClick(imageId){
      if(window.confirm('Confirm to delete this image?')){
        setVehicleImageList(vehicleImageList.filter(item => item.id != imageId));
        setDeletedVehicleImages(deletedImageList);
        deletedImageList.push(imageId);
      }
    }

    function onDocumentPreviewClick(docId){
      if(window.confirm('Confirm to delete this document?')){
        setVehicleDocumentList(vehicleDocumentList.filter(item => item.id != docId));
        setDeletedVehicleDocuments(deletedDocumentList);
        deletedDocumentList.push(docId);
      }
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
      if (accessories.length != 0) {
        setAccessories([])
      }
      document.getElementById("vehicleForm").reset()
    }
      
    const saveVehicle = event =>{
      event.preventDefault();

      if(window.confirm('Confirm to save?')){
        let brandName = document.getElementById("brand").value
        let fuelType = document.getElementById("fuelType").value
    
        const fileData = new FormData();  
        newVehicleImages.forEach((file) => fileData.append('vehicle_images', file, file.name));
        newVehicleDocuments.forEach((file) => fileData.append('vehicle_documents', file, file.name));
        deletedVehicleImages.forEach((data) => fileData.append('delete_images', data));
        deletedVehicleDocuments.forEach((data) => fileData.append('delete_documents', data));
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

        updateVehicleById(vehicleId, fileData).then(response => 
        { 
          if (response?.request?.statusText != "Bad Request"){
            setAlertStatus(true)
            setTimeout(() => {
                navigate("/admin/vehicles",{
                replace: true
              })}, 3000)
          } 
        });
      }
    };

    

    return (
        <section>
          <Container>
            
              <h2>Update Vehicle</h2>
              <hr className="style1 text-secondary"></hr>

              {
                alertStatus ? (
                <Alert color="success">
                  <strong>Success!</strong> Your information have been successfully updated.
                </Alert>) : false
              }
    
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
                  <select value={brandId} id="brand" className="form-control" onChange={e => setBrandId(e.target.value)} required>
                    <option value="">--Select One--</option>
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
                  <select value={fuelType} id="fuelType" className="form-control" onChange={e => setFuelType(e.target.value)} required>
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
                  accept="image/*" onChange={onImageChange}/>
                </Col>
              </Row>
              <Row className="d-flex flex-wrap mt-4">
                {vehicleImageList.map((item, index) => (
                  <Col key={index} lg="auto" sm="auto" md="auto" className="mt-2 ">
                    <div className="image-column">
                      <img
                        src={item.vehicle_image}
                        id={item.id}
                        className="img-fluid img-thumbnail img-preview-size img"
                        alt={item.vehicle_image}
                        onClick={event => onImagePreviewClick(event.target.id)}
                      />
                      <button type="button" className="text-white delete-icon-middle" onClick={() => onImagePreviewClick(item.id)}>
                        <RiDeleteBin6Line/>
                      </button>
                      
                    </div>
                    
                  </Col>
                ))}
                {vehicleImageURLs.map((item, index) => (
                  <Col key={index} lg="auto" sm="auto" md="auto" className="mt-2">
                    <img
                      src={item}
                      className="img-fluid img-thumbnail img-preview-size"
                      alt={item}
                    />
                  </Col>
                ))}
              </Row>
                  

              <hr className="style1 mt-4 section-line"></hr>
    
              {/* 9th row */}
              <Row className="mt-2">
              <h5>Upload Document</h5>
                <Col lg="10">
                  <input className="form-control mt-2" type="file" id="formFileMultipleDocuments" multiple onChange={onDocumentChange}/>
                </Col>
              </Row>
              <Row className="d-flex flex-wrap mt-4">
                {vehicleDocumentList.map((item, index) => (
                  <div key={index}> 
                    <a href={item.document} 
                      target="_blank"
                      rel="noopener noreferrer">
                      {item.document.substring(item.document.lastIndexOf("/") + 1)}
                    </a>
                    <IoMdClose
                      onClick={event => onDocumentPreviewClick(item.id)} 
                      className="delete-icon-document"
                    />
                    <br></br>
                  </div>
                ))}
                {vehicleDocumentURLs.map((item, index) => (
                  <div key={index}> 
                  <a href={item.name} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="disable-click">
                    {item.name}
                  </a>
                  <br></br>
                </div>
                ))}
              </Row>
    
              <hr className="style1 mt-4 section-line"></hr>
    
              {/* 10th row */}
              <Row className="mt-3">
              <h5>Accessories</h5>
                {accessoriesData.map((option, index) => (
                  <div className="form-check form-check-inline col-md-3 mt-3" key={index} >
                    <input className="form-check-input" type="checkbox" defaultChecked={accessoriesList.includes(option.value)?true:false} key={index} id={option.value} value={option.value} onChange={onAccessoriesChange}/>
                    <label className="form-check-label" htmlFor={option.value}>
                      {option.value}
                    </label>
                  </div>
                ))}
              </Row>

              <hr className="style1 mt-4 section-line"></hr>
    
              <button type="button" className="btn btn-secondary float-end" onClick={clearForm} hidden> Clear </button>
              <button type="submit" className="btn btn-primary float-end mx-2"> Save Changes </button>
    
              </form>
          </Container>
        </section>
      );
}

export default UpdateVehicles;