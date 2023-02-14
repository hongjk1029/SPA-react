import React, { useState,useEffect } from "react";

import carData from "../../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import { getVehicles } from "../../services/api/Provider";

import "/node_modules/react-image-gallery/styles/css/image-gallery.css";
import "../../styles/car-details.css";

const CarDetails = () => {
  const [vehicles, setVehicles] = useState([]);
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    _getVehicles();
    window.scrollTo(0, 0);
  }, []);


  async function _getVehicles() {
    getVehicles().then((res) => {
      console.log(res)
      let arr = res[0];
      let vehicle_brand = arr.vehicle_brand;
      let brand_name = vehicle_brand.brand_name;
      let temp_images = [...images];

      res.forEach((img)=>{
        img.vehicle_image.forEach((el)=>{
          temp_images.push({
              original: el.vehical_image,
              thumbnail: el.vehical_image
            });
        })
      })
      
      setVehicles(arr);
      setImages(temp_images);
      setBrand(brand_name);
    });
  }

  return (
    <Helmet title={vehicles.vehicle}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="App">
                <ImageGallery 
                  items={images}
                  showPlayButton={true}
                  showBullets={true}
                  showIndex={true}
                  slideOnThumbnailOver={true}
                />
              </div>
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{brand} {vehicles.vehicle}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${vehicles.price}.00 / Day
                  </h6>

                  <h6 className="rent__price fw-bold fs-4">
                    ${vehicles.monthprice}.00 / Month
                  </h6>
                </div>

                <p className="section__description">
                  {vehicles.vehicle_overview}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.vehicle}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.speed}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {vehicles.gps}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {vehicles.seatType}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {brand}
                  </span>
                </div>
              </div>
              <br></br>
              <button className="btnWhatsapp" href= "https://api.whatsapp.com/send?phone=60123160808">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>    {' '}  
                Contact Us via WhatsApp
              </button>
            </Col>

            <Col lg="7" className="mt-5">
              {/* <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div> */}
            </Col>

            <Col lg="5" className="mt-5">
              {/* <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
