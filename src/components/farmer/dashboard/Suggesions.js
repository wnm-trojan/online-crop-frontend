import '../../../assets/css/farmer/dashboard/Suggesions.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux';

const Suggesions = (props) => {
    const { auth } = props;
    const [NotAvaMonthData, setNotAvaMonthData] = useState([]);

    useEffect(() => {
        const getNotAvaMonthData = async () => {
            const dataFormServer = await fetchData()
            setNotAvaMonthData(dataFormServer)
        }
        getNotAvaMonthData();
    }, [])

    const fetchData = async () => {
        const res = await axios.get('/home_page/items/1/30');
        const { data } = res;
        return data;
    }

    return (
        <div className="container suggesions mb-4">
            <div className='row'>
                <div className='col-md-12 d-flex align-items-center mb-3'>
                    <h6 className='com-title mb-0'>Recommended vegetables for cultivation</h6>
                </div>
                <hr></hr>
            </div>
            <div className="row">
                {NotAvaMonthData.length > 0 ? (
                <Carousel>
                    {NotAvaMonthData.map((data, index) => (
                        <Carousel.Item>
                            <div className="image">
                                    <img src={"/images/analyzer/"+data.image_name} alt={data.crop_name} className="img-fluid" />
                            </div>
                            <Carousel.Caption>
                            <p className='m-0'>{data.crop_name}</p>
                            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                            </Carousel.Caption>
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