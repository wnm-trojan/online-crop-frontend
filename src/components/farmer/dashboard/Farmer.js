import '../../../assets/css/dashboard/Dashboard.css';
import '../../../assets/css/farmer/dashboard/Farmer.css';
import React from 'react';
import CultivationChart from './CultivationChart';
import CropForecastSummery from './CropForecastSummery';
import Suggesions from './Suggesions';

const Farmer = () => {
    
    return (
        <div className="content-load">
            <div className="container suggesions mb-4">
                <div className='row'>
                    <div className='col-md-8 mb-3'>
                        <CultivationChart/>
                    </div>
                    <div className='col-md-4 d-flex align-items-center mb-3'>
                        <Suggesions/>
                    </div>
                </div>
            </div>
            <CropForecastSummery/>
        </div>
    )
}

export default Farmer;