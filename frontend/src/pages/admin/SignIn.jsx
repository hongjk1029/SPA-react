import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import api from "../../services/api/Provider";

import "../../styles/login.css";

const SignIn = ({setIsAdminLogin}) => {
  
 // const [isAdmin, setIsAdmin] = useState()
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await api.login(username, password);
      // After receiving the JWT token from the server, store it in local storage
      localStorage.setItem('token', data['access']);
      setIsAdminLogin(true);
      setUsername('');
      setPassword('');
      navigate("/admin/dashboard");

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        console.log(error)
        console.log("something is wrong")
      }
    }
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
                          <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" required="" autoComplete="on" className="form-control rounded-pill border-0 shadow-sm px-4" ></input>
                        </div>
                        <div className="form-group mb-3">
                          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required="" autoComplete="on" className="form-control rounded-pill border-0 shadow-sm px-4" ></input>
                          {errorMessage ? <><br /> <div className="alert alert-danger rounded-2">{errorMessage}</div></> : <></>}
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
