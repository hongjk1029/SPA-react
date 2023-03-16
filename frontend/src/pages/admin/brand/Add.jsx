import React, {useState} from "react";
import { Container, Row, Col } from "reactstrap";
import { addBrand } from "../../../services/api/Provider";


const AddBrands = () => {
  const [brandName, setBrandName] = useState('');

  const saveBrand = event =>{
    event.preventDefault();
    if(brandName.trim().length !== 0){
      addBrand(brandName);
      setBrandName('');
    }
    else{
      window.alert('Form Cannot Be Empty!')
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <h2>Add Brand</h2>
          <hr className="style1 text-secondary"></hr>

          <form className="d-flex form-inline" onSubmit={saveBrand}>
            <Col lg="6">
              <div className="form-group mb-3 textbox">
                <input type="text" className="form-control" id="brand_name" name="brand_name" placeholder="Brand" 
                  onChange={event => setBrandName(event.target.value)} value={brandName} required/>
              </div>
            </Col>

            <Col lg="2">
              <a>&nbsp;&nbsp;</a>
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </Col>
          </form>
        </Row>
        
      </Container>
    </section>
  );
};

export default AddBrands;
