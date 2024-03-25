import '../../assets/css/auth/Register.css';
import React, { useState, useEffect } from 'react';
import LoginImg from '../../assets/images/login.png';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAuthAction } from '../../redux/actions/AuthAction';

function Register(props) {
  const { register } = props;
  const [userState, setUserState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const created_at = new Date();
    setUserState({...userState, ...{ created_at } })
  }, [])

  return (
    <div className="register">
      <div className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={LoginImg} className="img-fluid" alt="register"/>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form 
                className="register-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  register(userState, navigate);
                }}
              >
                <div className="divider d-flex align-items-center my-4">
                  <h3 className="text-center fw-bold mx-3 mb-0">Register</h3>
                </div>

                <div className="form-outline mb-4">
                  <select 
                    id="form3Example2" 
                    className="form-control form-control-md"
                    required
                    onChange={(event) => {
                      const type_id = event.target.value;
                      setUserState({...userState, ...{ type_id } })
                    }}
                    defaultValue="">
                    <option value="" disabled>Select user type</option>
                    <option value="2">Register as a farmer</option>
                    <option value="3">Register as a dealer</option>
                    <option value="4">Register as a fertilizer</option>
                  </select>
                </div>

                <div className="form-outline mb-4">
                  <input 
                    type="username" 
                    id="form3Example3" 
                    className="form-control form-control-md"
                    placeholder="Enter a valid username"
                    required
                    onChange={(event) => {
                      const username = event.target.value;
                      setUserState({...userState, ...{ username } })
                    }}
                  />
                  {/* <label className="form-label" htmlFor="form3Example3">Username address</label> */}
                </div>

                <div className="form-outline mb-3">
                  <input 
                    type="password" 
                    id="form3Example4" 
                    className="form-control form-control-md"
                    placeholder="Enter password" 
                    required
                    onChange={(event) => {
                      const password = event.target.value;
                      setUserState({...userState, ...{ password } })
                    }}
                  />
                  {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                </div>

                {/* <div className="form-outline mb-3">
                  <input 
                    type="password" 
                    id="form3Example5" 
                    className="form-control form-control-md"
                    placeholder="Verify password" 
                    onChange={(event) => {
                      const verifyPassword = event.target.value;
                      setUserState({...userState, ...{ verifyPassword } })
                    }}  
                  />
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                </div> */}

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-md">Sign up</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">You have an account? <a href="/login" className="link-danger">Login</a></p>
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
    register: (userState, navigate) => {
      dispatch(registerAuthAction(userState, navigate));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);