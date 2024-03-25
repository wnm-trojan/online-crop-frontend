import '../../../assets/css/dashboard/Dashboard.css';
import '../../../assets/css/dealer/Dealer.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';

const CultivationWantedList = (props) => {
    const { auth } = props;
    const navigate = useNavigate();
  
    useEffect(() => {
      
    }, []);
  
    return (
        <div className="content-load">
          <div className="page-box">
            <div className='page-header'>
              <div className='row'>
                <div className="col-md-12">
                  <h6 className='title'>Cultivation wanted List</h6>
                </div>
              </div>
            </div>
            <div className='page-body'>
              <div className='container'>
                <div className='row'>
                  <div className="col-md-12 list">
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

  export default connect(mapStateToProps)(CultivationWantedList);