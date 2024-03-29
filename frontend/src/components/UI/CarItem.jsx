import React, { useState,useEffect } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CarItem = (props) => {
  // Haven't Mapped for automatic, speed, price
  const { id, vehicle_images, vehicle, vehicle_brand, automatic, speed, price_of_sale } = props.item;
  const [priceOfSale, setPriceOfSale] = useState(0);

  useEffect(() => {
    setPriceOfSale(addCommas(price_of_sale));
  }, []);

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={vehicle_images[0].vehicle_image} alt="" className="car__img-adjust"/>
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{vehicle_brand.brand_name} {vehicle}</h4>
          <h6 className="rent__price text-center mt-">
            ${priceOfSale} <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {vehicle}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
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
};

export default CarItem;
