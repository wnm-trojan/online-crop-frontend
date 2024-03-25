import '../../../assets/css/farmer/dashboard/CultivationChart.css';
import React, {useState, useEffect} from "react";
import { ProgressBar } from "react-bootstrap";
import CultivationPlanService from '../../../services/CultivationPlanService';
import { connect } from 'react-redux';

const CultivationChart = (props) => {
    var current_date = new Date().toJSON().slice(0, 10);
    const { auth } = props;
    const [cultivation, setCultivation] = useState([]);
    
    useEffect(() => {
        retrieveCultivation();
    }, [])

    const retrieveCultivation = () => {
        CultivationPlanService.getFarmerActiveComplete('active', auth.user.user.user_id, current_date)
        .then((response) => {
        setCultivation(response.data);
        })
        .catch((e) => {
        console.log(e);
        });
    };

    const calculateProgress = (startDate, harvestDate) => {
        var date1 = new Date(startDate);
        var date2 = new Date(harvestDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        // console.log(diffDays);

        var date3 = new Date();
        var timeDiff1 = Math.abs(date1.getTime() - date3.getTime());
        var diffDays1 = Math.ceil(timeDiff1 / (1000 * 3600 * 24)); 
        // console.log(diffDays1);

        var diff = Math.round((diffDays1 / diffDays) * 100)
        // console.log(diff);

        return diff;
    }
    
    return (
        <div className="container cultivation-chart mb-4">
            <div className='row'>
                <div className='col-md-12 d-flex align-items-center mb-3'>
                    <h5 className='com-title mb-0'>Active Cultivation Plans</h5>
                    <a href='/dashboard/farmer/cultivation-plan' className='ms-auto me-0'>View All</a>
                </div>
                <hr></hr>
            </div>
            <div className="row">
                {cultivation.map((data, index) => (
                    <div className='col-md-12 mb-4' key={index}>
                        <h6 className='text-start'>{data.crop_master.crop_name} Cultivation</h6>
                        <ProgressBar variant="success" now={calculateProgress(data.planned_start_date, data.planned_harvest_date)} label={`${calculateProgress(data.planned_start_date, data.planned_harvest_date)}%`} />
                        <div className='date-range d-flex'>
                            <span className='ms-0 me-auto'>{data.planned_start_date}</span>
                            <span className='me-0'>{data.planned_harvest_date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

export default connect(mapStateToProps)(CultivationChart);