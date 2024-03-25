import React, { useState, useEffect } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux';

const Suggesions = (props) => {
    const { auth } = props;
    const [fertilizerAds, setFertilizerAds] = useState([]);

    useEffect(() => {
        const getNotAvaMonthData = async () => {
            const dataFormServer = await fetchData()
            setFertilizerAds(dataFormServer)
        }
        getNotAvaMonthData();
    }, [])

    const fetchData = async () => {
        const res = await axios.get('/home_page/fertilizers');
        const { data } = res;
        return data;
    }

    return (
        <div className="container">
            <div className='row mb-3'>
                <div className='col-md-12 d-flex align-items-center mb-3'>
                    <h6 className='com-title mb-0'>Recent Fertilizers</h6>
                </div>
                <hr></hr>
            </div>
            <div className="row">
                {fertilizerAds.length > 0 ? (
                <Carousel>
                    {fertilizerAds.map((data, index) => (
                        <Carousel.Item>
                            <div className="col-md-12 list mb-3" key={index}>
                                <div className='row'>
                                    <div className='col-md-12 text-center'>
                                        <img src="/images/fertilizers/1.jpg" alt="ad1" className="img-fluid" width="120" />
                                    {/* </div>
                                    <div className='col-md-10 text-start'> */}
                                        <h5>{data.fertilizer_name}</h5>
                                        <p>{data.details}</p>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                ):(
                    <React.Fragment></React.Fragment>
                )}
            </div>
        </div>
    );

};

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

export default connect(mapStateToProps)(Suggesions);