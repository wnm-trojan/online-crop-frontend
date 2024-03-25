import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import SalesStockService from '../../../services/SalesStockService';
import CultivationPlanService from "../../../services/CultivationPlanService";
import {NotificationManager} from 'react-notifications';
import { useNavigate } from 'react-router-dom';

const AddToStockForm = (props) => {

    const navigate = useNavigate();

    const initialSaleStockState = {
        user_id: props.auth.user.user.user_id,
        plan_id: null,
        crop_id: null,
        available_qty: 0,
        record_timestamp: new Date()
    };
    const [saleStock, setSaleStock] = useState(initialSaleStockState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSaleStock({ ...saleStock, [name]: value });
    };

    const saveSaleStock = () => {
        var data = {
            user_id: saleStock.user_id,
            plan_id: props.plan.plan_id,
            crop_id: props.plan.crop_id,
            available_qty: saleStock.available_qty,
            record_timestamp: new Date()
        }
        console.log(data);
        SalesStockService.create(data)
            .then(response => {
                NotificationManager.success('Cultivation Plan harvest added to stock.');
                if(response.data.id){
                    updatePlanStockStatus(response.data.plan_id)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const updatePlanStockStatus = (plan_id) => {
        var data = {
            stock_status: true
        }
        CultivationPlanService.updateStockStatus(plan_id, data)
            .then(response => {
                navigate('/dashboard/farmer/stock-list');
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Actual harvest add to stock
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Confirm your actual harvest</h6>
            <br></br>
            <div className="form">
                <div className="row mb-3">
                    <label htmlFor="available_qty" className="col-sm-4 col-form-label text-end">Actual Harvest (kg):</label>
                    <div className="col-sm-8">
                      <input type="number" name='available_qty' className="form-control" id="available_qty" placeholder="Example: 10" required onChange={handleInputChange} />
                    </div>
                </div>
                <div className="text-end text-lg-end mt-4 pt-2">
                <button onClick={saveSaleStock} className="btn btn-primary btn-md">Confirm</button>
                </div>
            </div>
          </Modal.Body>
        </Modal>
    );

}

export default AddToStockForm;