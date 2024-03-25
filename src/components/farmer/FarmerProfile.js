import '../../assets/css/dashboard/Dashboard.css';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect} from "react";
import ProvinceService from '../../services/ProvinceService';
import DistrictService from '../../services/DistrictService';
import UserService from '../../services/UserService';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

const FarmerProfile = (props) => {
  const { auth } = props;
  const id = auth.user.user.user_id;
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const initialCurrentUserState = {
    user_id: auth.user.user.user_id,
    full_name: auth.user.user.full_name,
    adress: auth.user.user.adress,
    city: auth.user.user.city,
    district_id: (auth.user.user.district_id == null) ? "" : auth.user.user.district_id,
    province_id: (auth.user.user.province_id == null) ? "" : auth.user.user.province_id,
    phone_no: auth.user.user.phone_no,
    email: auth.user.user.email,
    update_at: new Date(),

  };
  const [currentUser, setCurrentUser] = useState(initialCurrentUserState);

  console.log(currentUser);

  useEffect(() => {
    retrieveCurrentUser();
  }, []);

  const retrieveCurrentUser = () => {
    UserService.get(id)
    .then((response) => {
      setCurrentUser(response.data);
    })
    .catch((e) => {
      console.log(e);
    });

    ProvinceService.getAll()
    .then((response) => {
      setProvinces(response.data);
    })
    .catch((e) => {
      console.log(e);
    });

    DistrictService.getAll()
    .then((response) => {
      setDistricts(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleProvinceOnly = event => {
    const type_id = event.target.value;
    districtsByProvinceId(type_id);
  }

  const updateUserData = () => {
    var data = {
        full_name: currentUser.full_name,
        adress: currentUser.adress,
        city: currentUser.city,
        district_id: currentUser.district_id,
        province_id: currentUser.province_id,
        phone_no: currentUser.phone_no,
        email: currentUser.email,
        update_at: currentUser.update_at
    };

    UserService.update(id, data)
      .then(response => {
        NotificationManager.success('User Details Updated.');
        navigate('/dashboard/farmer/profile');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const districtsByProvinceId = (province_id) => {
    DistrictService.getByProvinceId(province_id)
    .then((response) => {
        setDistricts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="content-load">
      <div className="page-box">
        <div className='page-header'>
          <div className='row'>
            <div className="col-md-12">
              <h6 className='title'>Manage Profile</h6>
            </div>
          </div>
        </div>
        <div className='page-body'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-10">
                <div className="form">

                    <div className="row mb-3">
                        <label htmlFor="full_name" className="col-sm-4 col-form-label text-end">Full Name :</label>
                        <div className="col-sm-8">
                        <input type="text" name='full_name' className="form-control" id="full_name" placeholder="Your full name" defaultValue={currentUser.full_name} required onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="adress" className="col-sm-4 col-form-label text-end">Address :</label>
                        <div className="col-sm-8">
                        <input type="text" name='adress' className="form-control" id="adress" placeholder="Your address" defaultValue={currentUser.adress} required onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="email" className="col-sm-4 col-form-label text-end">Email :</label>
                        <div className="col-sm-8">
                        <input type="email" name='email' className="form-control" id="email" placeholder="example@gmail.com" defaultValue={currentUser.email} required onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="phone_no" className="col-sm-4 col-form-label text-end">Phone :</label>
                        <div className="col-sm-8">
                        <input type="number" name='phone_no' className="form-control" id="phone_no" placeholder="947XXXXXXXX" defaultValue={currentUser.phone_no} required onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                    <label htmlFor="province_id" className="col-sm-4 col-form-label text-end">Province :</label>
                    <div className="col-sm-8">
                    <select className="form-select" name="province_id" id="province_id" required onChange={handleInputChange, handleProvinceOnly} defaultValue={currentUser.province_id}>
                        <option value="" disabled>Select a province</option>
                        {provinces.map((province, index) => ( 
                        <option key={index} value={province.id}>{province.name}</option>
                        ))}
                    </select>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label htmlFor="district_id" className="col-sm-4 col-form-label text-end">District :</label>
                    <div className="col-sm-8">
                    <select className="form-select" name="district_id" id="district_id" required onChange={handleInputChange} value={currentUser.district_id}>
                        <option value="" disabled>Select a district</option>
                        {districts.map((district, index) => ( 
                        <option key={index} value={district.id}>{district.name}</option>
                        ))}
                    </select>
                    </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="city" className="col-sm-4 col-form-label text-end">City :</label>
                        <div className="col-sm-8">
                        <input type="text" name='city' className="form-control" id="city" placeholder="Your city" defaultValue={currentUser.city} required onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="text-end text-lg-end mt-4 pt-2">
                    <button onClick={updateUserData} className="btn btn-primary btn-md">Update</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
      auth: state,
  }
}

export default connect(mapStateToProps)(FarmerProfile);