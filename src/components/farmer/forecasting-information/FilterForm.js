import React, { useState, useEffect} from "react";
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import ProvinceService from '../../../services/ProvinceService';
import DistrictService from '../../../services/DistrictService';
import DashboardService from '../../../services/DashboardService';
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {NotificationManager} from 'react-notifications';

const FilterForm = (props) => {

    var future = new Date();
    future.setDate(future.getDate() + 30);
    const { auth } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(future);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      retrieveFilters();
      forecastItems();
    }, []);
  
    const retrieveFilters = () => {
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
  
    const initialFiltersState = {
      type: 1,
      perioud: 30,
      farm_province_id: "all",
      farm_district_id: "all",
      from_date: fromDate,
      to_date: toDate
    };
    const [filters, setFilters] = useState(initialFiltersState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleProvinceOnly = event => {
        const type_id = event.target.value;
        districtsByProvinceId(type_id);
    }

    const forecastItems = () => {
        console.log(filters);
        DashboardService.getForecastingItems(filters.type, filters.perioud, fromDate.toJSON().slice(0, 10), toDate.toJSON().slice(0, 10), filters.farm_province_id, filters.farm_district_id)
        .then(response => {
            setItems(response.data);
            console.log(response.data);
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
        <div className='container'>
            <div className='row'>
                <div className="col-md-12">
                    <div className="">
                        <div className="row px-3">
                            <div className="col col-md-2 px-0">
                                <div className="form-outline mb-4">
                                    <select 
                                        name="type"
                                        id="type" 
                                        className="form-control form-control-md"
                                        onChange={handleInputChange}
                                        defaultValue="">
                                        <option value="1">Not Available Items</option>
                                        <option value="2">Available Items</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col col-md-2 px-0">
                                <div className="form-outline mb-4">
                                    <DatePicker className='form-control' selected={fromDate} onChange={(date) => setFromDate(date)} />
                                </div>
                            </div>
                            <div className="col col-md-2 px-0">
                                <div className="form-outline mb-4">
                                    <DatePicker className='form-control' selected={toDate} onChange={(date) => setToDate(date)} />
                                </div>
                            </div>
                            <div className="col col-md-2 px-0">
                                <div className="form-outline mb-4">
                                <select 
                                    className="form-select" 
                                    name="farm_province_id" 
                                    id="farm_province_id" 
                                    onChange={handleInputChange, handleProvinceOnly} 
                                    defaultValue="all">
                                    <option value="all">All province</option>
                                    {provinces.map((province, index) => ( 
                                        <option key={index} value={province.id}>{province.name}</option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div className="col col-md-2 px-0">
                                <div className="form-outline mb-4">
                                <select 
                                    className="form-select" 
                                    name="farm_district_id" 
                                    id="farm_district_id" 
                                    onChange={handleInputChange} 
                                    defaultValue="all">
                                    <option value="all">All district</option>
                                    {districts.map((district, index) => ( 
                                        <option key={index} value={district.id}>{district.name}</option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div className="col col-md-2 px-0">
                                <button onClick={forecastItems} className="btn btn-primary btn-md d-block w-100">Forecast</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <br></br>
                <div className="col-md-12">
                    <div className="">
                    { items.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    {/* <th scope="col">qty (kg)</th> */}
                                </tr>
                            </thead>
                            <tbody>
                            {items.map((data, index) => (
                                <tr key={index}>
                                    <th>{ index + 1 }</th>
                                    <td>
                                        <img src={"/images/analyzer/"+data.image_name} alt={data.crop_name} className="img-fluid" width={55} />
                                    </td>
                                    <td>{ data.crop_name }</td>
                                    {/* <td>{ data.qty_kg }</td> */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <h5><BsIcons.BsEmojiFrown /> No result</h5>
                    )}
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

export default connect(mapStateToProps)(FilterForm);