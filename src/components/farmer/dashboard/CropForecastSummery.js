import '../../../assets/css/farmer/dashboard/CropForecastSummery.css';
import React from "react";
import { connect } from 'react-redux';
import DemandMonth from './forecast-summeries/DemandMonth';
import AvailableMonth from './forecast-summeries/AvailableMonth';
import NotAvailableMonth from './forecast-summeries/NotAvailableMonth';
import { useTranslation } from "react-i18next";
import * as FaIcons from "react-icons/fa";

const CropForecastSummery = (props) => {

    const { auth } = props;
    const { t } = useTranslation();
    
    return (
        <div className="container forecast-summery mb-4">
            <div className="row analyzer-summery mx-0">
                <div className="col col-md-12">
                    <div className="analyzer-box vegi">
                        <h4>{t('Vegetables_in_next_month')}</h4>
                        {auth.user.user.district != null ? (
                        <h6 className='text-start text-secondary mb-4'>
                            <FaIcons.FaMapMarkerAlt /> In your Area - {auth.user.user.district.name} - <a href='/dashboard/farmer/forecasting-information' className='check'><FaIcons.FaSearch />Check More Information</a>
                        </h6>
                        ):(
                            <React.Fragment></React.Fragment>
                        )}
                        <div className='d-flex'>
                            {/* <DemandMonth/> */}
                            <AvailableMonth/>
                            <NotAvailableMonth/>
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

export default connect(mapStateToProps)(CropForecastSummery);