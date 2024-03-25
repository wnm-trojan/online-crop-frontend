import '../../../assets/css/dashboard/Dashboard.css';
import React from "react";
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import * as FaIcons from "react-icons/fa";
import FilterForm from "./FilterForm";

const ForecastingInformation = (props) => {

    const { auth } = props;
    const { t } = useTranslation();
    
    return (
        <div className="content-load">
            <div className="page-box">
                <div className='page-header'>
                    <div className='row'>
                        <div className="col-md-12">
                            <h6 className='title'>Forecasting Information</h6>
                        </div>
                    </div>
                </div>
                <div className='page-body'>
                    <FilterForm />
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

export default connect(mapStateToProps)(ForecastingInformation);