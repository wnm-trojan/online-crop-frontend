import '../../../assets/css/dashboard/Dashboard.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';
import FertilizerAdsService from '../../../services/FertilizerAdsService';

const FertilizerAds = (props) => {
    const { auth } = props;
    const [fertilizerAds, setFertilizerAds] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      retrieveFertilizerAds();
    }, []);
  
    const retrieveFertilizerAds = () => {
        FertilizerAdsService.getAll()
        .then((response) => {
            setFertilizerAds(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
        retrieveFertilizerAds();
    };

    return (
        <div className="container">
          <div className="page-box">
            <div className='page-header'>
              <div className='row'>
                <div className="col-md-12">
                  <h6 className='title'>Fertilizer Ad List</h6>
                </div>
              </div>
            </div>
            <div className='page-body'>
              <div className='container'>
                <div className='row'>
                    {fertilizerAds.map((data, index) => (  
                    <div className="col-md-6 list mb-3" key={index}>
                        <div className='row'>
                            <div className='col-md-3'>
                                <img src="/images/fertilizers/1.jpg" alt="ad1" className="img-fluid" />
                            </div>
                            <div className='col-md-9 text-start'>
                                <h5>{data.fertilizer_name}</h5>
                                <p>{data.details}</p>
                            </div>
                        </div>
                    </div>
                    ))}
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

  export default connect(mapStateToProps)(FertilizerAds);