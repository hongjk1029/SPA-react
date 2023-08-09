import React, { useState,useEffect } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { BsSpeedometer } from "react-icons/bs";
import { FaGasPump } from "react-icons/fa";
import "../../styles/car-item.css";

const addCommas = num => num !== null ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null

const CarItem = (props) => {
  // Haven't Mapped for automatic, speed, price
  const { id, vehicle_images, vehicle, vehicle_brand, fuel_type, mileage, price_of_sale, price_per_month } = props.item;
  const [priceOfSale, setPriceOfSale] = useState(0);

  useEffect(() => {
    setPriceOfSale(price_of_sale);
  }, []);

  if (price_of_sale != null && price_of_sale != 0 && price_of_sale != ''){
    // renturn sale car
    return (
      <Col lg="4" md="4" sm="6" className="mb-5">
        <div className="car__item">
          <div className="car__img">
            <img src={vehicle_images[0].vehicle_image} alt="" className="car__img-adjust"/>
          </div>
  
          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{vehicle_brand.brand_name} {vehicle}</h4>
            
            <h6 className="rent__price text-center mt-">
              {/* ${priceOfSale} <span>/ Day</span> */}
              RM {addCommas(priceOfSale)}
            </h6>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
              <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-car-line"></i> {vehicle}
                    </span>
                  </td>
                  <td>
                    <span className="d-flex align-items-center gap-1">
                      <i><FaGasPump/></i> {fuel_type}
                    </span>
                  </td>
                  <td>
                    <span className="d-flex align-items-center gap-1">
                      <i><BsSpeedometer/></i> {addCommas(mileage) + " km"} 
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
            {/* <Link to={`/cars/${vehicle_brand.brand_name}${vehicle}/${id}`}>
              <button className=" w-50 car__item-btn car__btn-rent">
                Rent
              </button>
            </Link> */}
  
            <Link to={`/cars/${vehicle_brand.brand_name}${vehicle}/${id}`}>
              <button className=" w-100 car__item-btn car__btn-details">
                Details
              </button>
            </Link>
          </div>
        </div>
      </Col>
    );
  }
  else {
    // return rental car
    return (
      <Col lg="4" md="4" sm="6" className="mb-5">
        <div className="car__item">
          <div className="car__img">
            <img src={vehicle_images[0].vehicle_image} alt="" className="car__img-adjust"/>
          </div>
  
          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{vehicle_brand.brand_name} {vehicle}</h4>
            
            <h6 className="rent__price text-center mt-">
              {/* ${priceOfSale} <span>/ Day</span> */}
              RM {addCommas(price_per_month)} <span>/ Month</span>
            </h6>
  
            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
              <span className=" d-flex align-items-center gap-1">
                <i className="ri-car-line"></i> {vehicle}
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i><FaGasPump/></i> {fuel_type}
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i><BsSpeedometer/></i> {addCommas(mileage) + " km"} 
              </span>
            </div>
  
            {/* <Link to={`/cars/${vehicle_brand.brand_name}${vehicle}/${id}`}>
              <button className=" w-50 car__item-btn car__btn-rent">
                Rent
              </button>
            </Link> */}
  
            <Link to={`/cars/${vehicle_brand.brand_name}${vehicle}/${id}`}>
              <button className=" w-100 car__item-btn car__btn-details">
                Details
              </button>
            </Link>
          </div>
        </div>
      </Col>
    );
  }
  
};

export default CarItem;
