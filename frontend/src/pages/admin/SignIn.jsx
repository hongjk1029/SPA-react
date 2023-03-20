import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { getAdminToken } from "../../services/api/Provider";

import "../../styles/login.css";

const SignIn = ({setIsAdminLogin}) => {


 // const [isAdmin, setIsAdmin] = useState()
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // function validateForm() {
  //   return email.length > 0 && password.length > 0;
  // }

  function handleSubmit(event) {
    console.log("Sign In Button is Clicked")
    event.preventDefault();
    getAdminToken()
    setIsAdminLogin(true);
    navigate("/admin/dashboard");
    // Find the user from the adminData array
    // const user = adminData.find((user) => user.email === email && user.password === password);

    // Check if the user exists
    // if (user) {
    //   setSuccessMessage("Login successful");
    //   setIsAdminLogin(true);
    //   navigate("/admin/dashboard");
    // } else {
    //   setErrorMessage("Invalid email or password");
    // }
  }

  const clearForm = event =>{
    document.getElementById("vehicleForm").reset()
  }

  return (
    <section>
      <Container>
        <div className="container-flud">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image"></div>
            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-8 mx-auto">
                      <h3 className="display-5">Admin Login</h3>
                      <hr />
                      <form onSubmit={handleSubmit} id="signInForm">
                        <div className="form-group mb-3">
                          <input onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Email address" required="" autoComplete="on" className="form-control rounded-pill border-0 shadow-sm px-4" ></input>
                        </div>
                        <div className="form-group mb-3">
                          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required="" autoComplete="on" className="form-control rounded-pill border-0 shadow-sm px-4" ></input>
                          {errorMessage ? <><br /> <div className="alert alert-danger rounded-2">{errorMessage}</div></> : <></>}
                          {successMessage ? <><br /> <div className="alert alert-success rounded-2">{successMessage}</div></> : <></>}
                        </div>
                        <div className="d-grid">
                          <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"> Sign in </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignIn;
