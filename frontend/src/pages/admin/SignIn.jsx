import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

import "../../styles/login.css";

const adminData = [
  {
    id: 0,
    email: "admin@gmail.com",
    password: "admin",
  },
  {
    id: 1,
    email: "xiangyik@gmail.com",
    password: "xiangyik",
  },
  {
    id: 2,
    email: "luohwei@gmail.com",
    password: "luohwei",
  },
  {
    id: 3,
    email: "zhemin@gmail.com",
    password: "zhemin",
  },
];

const SignIn = ({setIsAdminLogin}) => {


  const [isAdmin, setIsAdmin] = useState()
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/')
    setIsAdminLogin(true)
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
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" required="" autoComplete="on" className="form-control rounded-pill border-0 shadow-sm px-4" ></input>
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
