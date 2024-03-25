import '../../assets/css/auth/Login.css';
import React, { useState } from 'react';
import LoginImg from '../../assets/images/login.png';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAuthAction } from '../../redux/actions/AuthAction';

function Login(props) {
  const { login } = props;
  const [loginState, setLoginState] = useState({});
  const navigate = useNavigate();
    return (
      <div className="login">
          <div className="vh-100">
            <div className="container-fluid h-custom">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  <img src={LoginImg} className="img-fluid" alt="Login"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form className="login-form" onSubmit={(event) => {
                    event.preventDefault();
                    login(loginState, navigate);
                  }}>
                    <div className="divider d-flex align-items-center my-4">
                      <h3 className="text-center fw-bold mx-3 mb-0">Sign in</h3>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="username" id="form3Example3" className="form-control form-control-md"
                        placeholder="Enter username" onChange={(event) => {
                          const username = event.target.value;
                          setLoginState({ ...loginState, ...{ username }})
                        }} />
                      {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                    </div>

                    <div className="form-outline mb-3">
                      <input type="password" id="form3Example4" className="form-control form-control-md"
                        placeholder="Enter password" onChange={(event) => {
                          const password = event.target.value;
                          setLoginState({ ...loginState, ...{ password }})
                        }} />
                      {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check mb-0">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          Remember me
                        </label>
                      </div>
                      <a href="#!" className="text-body">Forgot password?</a>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button type="submit" className="btn btn-primary btn-md">Login</button>
                      <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    user: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginState, navigate) => {
      dispatch(loginAuthAction(loginState, navigate));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);