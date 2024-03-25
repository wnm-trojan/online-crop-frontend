import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import { useNavigate } from 'react-router-dom';

const FarmerInformationModal = (props) => {

    const navigate = useNavigate();

    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Farmer Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="details">
            <table class="table">
              <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{props.farmer.full_name}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{props.farmer.adress}</td>
                </tr>
                <tr>
                  <td><strong>City:</strong></td>
                  <td>{props.farmer.city}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>{props.farmer.phone_no}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{props.farmer.email}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </Modal.Body>
        </Modal>
    );

}

export default FarmerInformationModal;