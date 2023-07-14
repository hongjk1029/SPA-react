import React, {useState,useEffect} from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import carBrand from "../../assets/data/carBrand";
import { getBrands, getModels } from "../../services/api/Provider";




const FindCarForm = (props) => {
  let {fromHome} = props
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    _getBrands();
    _getModels();
 }, []);

  function _getBrands() {
    getBrands().then((res) => {
      let arr = res;
      setBrands(arr);
    });
  }

  function _getModels() {
    getModels().then((res) => {
      let arr = res;
      setModels(arr);
    });
  }

  if(fromHome){
    return (
      <Form className="form">
        <div className=" d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Car Brand --</option>
              {brands.map((option, index) => (
                <option key={index} value={option.brand_name}>{option.brand_name}</option>
              ))}
            </select>
          </FormGroup>
  
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Car Model --</option>
              {models.map((option, index) => (
                <option key={index} value={option.vehicle}>{option.vehicle}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup className="select__group">
            <select>
              <option value="sale">Sale</option>
              <option value="rental">Rental</option>
            </select>
          </FormGroup>
          
          <FormGroup className="form__group">
          </FormGroup>
          <FormGroup className="form__group">
          </FormGroup>

        </div>
        <FormGroup className="form__group mt-5 float-end">
          <button className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </Form>
    )
  }
  else{
    return (
      <Form className="form">
        <div className=" d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Car Brand --</option>
              {brands.map((option, index) => (
                <option key={index} value={option.brand_name}>{option.brand_name}</option>
              ))}
            </select>
          </FormGroup>
  
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Car Model --</option>
              {models.map((option, index) => (
                <option key={index} value={option.vehicle}>{option.vehicle}</option>
              ))}
            </select>
          </FormGroup>
          
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Car Year --</option>
              <option value=""></option>
            </select>
          </FormGroup>
  
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Car Variant --</option>
              <option value=""></option>
            </select>
          </FormGroup>
  
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Engine --</option>
              <option value=""></option>
            </select>
          </FormGroup>
  
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Transmission --</option>
              <option value=""></option>
            </select>
          </FormGroup>
  
          <FormGroup className="select__group">
            <select>
              <option value="none">-- Car Mileage --</option>
              <option value="10000">Below 10000</option>
              <option value="10000">10000 - 30000</option>
              <option value="10000">30000 - 50000</option>
              <option value="10000">More than 50000</option>
            </select>
          </FormGroup>
  
          <FormGroup className="select__group">
              <select>
                <option value="sale">Sale</option>
                <option value="rental">Rental</option>
              </select>
          </FormGroup>
          <FormGroup className="select__group">
          </FormGroup>
        </div>
        <FormGroup className="form__group mt-5 float-end">
            <button className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </Form>
    );
  }
  
};

export default FindCarForm ;

