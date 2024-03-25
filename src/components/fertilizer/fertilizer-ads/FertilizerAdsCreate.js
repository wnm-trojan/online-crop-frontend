import '../../../assets/css/dashboard/Dashboard.css';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect} from "react";
import FertilizerAdsService from '../../../services/FertilizerAdsService';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

const FertilizerAdsCreate = (props) => {
  const { auth } = props;
  const navigate = useNavigate();

  const initialFertilizer = {
    details: "",
    fertilizer_name: "",
    user_id: auth.user.user.user_id,
    created_date: new Date().toJSON().slice(0, 10),

  };

  const [fertilizer, setFertilizers] = useState(initialFertilizer);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFertilizers({ ...fertilizer, [name]: value });
  };

  const saveFertilizers = () => {
    var data = {
        details: fertilizer.details,
        fertilizer_name: fertilizer.fertilizer_name,
        user_id: auth.user.user.user_id,
        created_date: new Date().toJSON().slice(0, 10),
    };

    FertilizerAdsService.create(data)
      .then(response => {
        NotificationManager.success('New fertilizer created.');
        navigate('/dashboard/fertilizer/fertilizer-ads');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="content-load">
      <div className="page-box">
        <div className='page-header'>
          <div className='row'>
            <div className="col-md-12">
              <h6 className='title'>Fertilizer ad create</h6>
            </div>
          </div>
        </div>
        <div className='page-body'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-10">
                <div className="form">

                    <div className="row mb-3">
                        <label htmlFor="fertilizer_name" className="col-sm-4 col-form-label text-end">Fertilizer Name :</label>
                        <div className="col-sm-8">
                            <input type="text" name='fertilizer_name' className="form-control" id="fertilizer_name" placeholder="Fertilizer Name" required onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="details" className="col-sm-4 col-form-label text-end">Description :</label>
                        <div className="col-sm-8">
                            <textarea name='details' className="form-control" id="details" placeholder="Details" required onChange={handleInputChange} rows="8"></textarea>
                        </div>
                    </div>

                    <div className="text-end text-lg-end mt-4 pt-2">
                    <button onClick={saveFertilizers} className="btn btn-primary btn-md">Create</button>
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

export default connect(mapStateToProps)(FertilizerAdsCreate);