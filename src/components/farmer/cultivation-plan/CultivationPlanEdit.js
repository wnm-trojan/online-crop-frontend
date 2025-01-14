import '../../../assets/css/dashboard/Dashboard.css';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect} from "react";
import CultivationPlanService from '../../../services/CultivationPlanService';
import ProvinceService from '../../../services/ProvinceService';
import DistrictService from '../../../services/DistrictService';
import ItemsService from '../../../services/ItemsService';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {NotificationManager} from 'react-notifications';

const CultivationPlanEdit = (props) => {
  const { auth } = props;
  const {id} = useParams();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [items, setItems] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [harvestDate, setHarvestDate] = useState(new Date());

  const initialCultivationState = {
    farmer_id: auth.user.user.user_id,
    farm_province_id: "",
    farm_district_id: "",
    crop_id: "",
    planned_start_date: new Date(),
    planned_harvest_date: new Date(),
    expected_harvest_kg: null,
    created_date: new Date().toJSON().slice(0, 10),
    modified_date: new Date().toJSON().slice(0, 10),
    last_modify_by: auth.user.user.user_id

  };
  const [cultivation, setCultivation] = useState(initialCultivationState);

  useEffect(() => {
    retrieveCultivation();
  }, []);

  const retrieveCultivation = () => {
    CultivationPlanService.get(id)
    .then((response) => {
      setCultivation(response.data);
      setStartDate(new Date(response.data.planned_start_date))
      setHarvestDate(new Date(response.data.planned_harvest_date))
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

    ItemsService.getAll()
    .then((response) => {
      setItems(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCultivation({ ...cultivation, [name]: value });
  };

  const handleProvinceOnly = event => {
    const type_id = event.target.value;
    districtsByProvinceId(type_id);
  }

  const updateCultivation = () => {
    var data = {
      farm_province_id: cultivation.farm_province_id,
      farm_district_id: cultivation.farm_district_id,
      crop_id: cultivation.crop_id,
      planned_start_date: startDate,
      planned_harvest_date: harvestDate,
      expected_harvest_kg: cultivation.expected_harvest_kg,
      modified_date: new Date().toJSON().slice(0, 10),
    };

    CultivationPlanService.update(id, data)
      .then(response => {
        NotificationManager.success('Cultivation Plan Updated.');
        navigate('/dashboard/farmer/cultivation-plan');
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
              <h6 className='title'>Cultivation Plan craete</h6>
            </div>
          </div>
        </div>
        <div className='page-body'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-10">
                <div className="form">
                  <div className="row mb-3">
                    <label htmlFor="farm_province_id" className="col-sm-4 col-form-label text-end">Province :</label>
                    <div className="col-sm-8">
                    <select className="form-select" name="farm_province_id" id="farm_province_id" required onChange={handleInputChange, handleProvinceOnly} value={cultivation.farm_province_id}>
                      <option value="" disabled>Select a province</option>
                      {provinces.map((province, index) => ( 
                        <option key={index} value={province.id}>{province.name}</option>
                      ))}
                    </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="farm_district_id" className="col-sm-4 col-form-label text-end">District :</label>
                    <div className="col-sm-8">
                    <select className="form-select" name="farm_district_id" id="farm_district_id" required onChange={handleInputChange} value={cultivation.farm_district_id}>
                      <option value="" disabled>Select a district</option>
                      {districts.map((district, index) => ( 
                        <option key={index} value={district.id}>{district.name}</option>
                      ))}
                    </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="crop_id" className="col-sm-4 col-form-label text-end">Crop Item :</label>
                    <div className="col-sm-8">
                    <select className="form-select" name="crop_id" id="crop_id" required onChange={handleInputChange} value={cultivation.crop_id}>
                      <option value="" disabled>Select a crop item</option>
                      {items.map((item, index) => ( 
                        <option key={index} value={item.crop_id}>{item.crop_name}</option>
                      ))}
                    </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="expected_harvest_kg" className="col-sm-4 col-form-label text-end">Plan Start Date :</label>
                    <div className="col-sm-8">
                      <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="expected_harvest_kg" className="col-sm-4 col-form-label text-end">Harvest Date :</label>
                    <div className="col-sm-8">
                      <DatePicker className='form-control' selected={harvestDate} onChange={(date) => setHarvestDate(date)} />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="expected_harvest_kg" className="col-sm-4 col-form-label text-end">Expected Harvest (kg) :</label>
                    <div className="col-sm-8">
                      <input type="number" name='expected_harvest_kg' className="form-control" id="expected_harvest_kg" placeholder="Example: 10" defaultValue={cultivation.expected_harvest_kg} required onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="text-end text-lg-end mt-4 pt-2">
                    <button onClick={updateCultivation} className="btn btn-primary btn-md">Update</button>
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

export default connect(mapStateToProps)(CultivationPlanEdit);