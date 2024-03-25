import '../../assets/css/pages/Fertilizers.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import FertilizerAdsService from '../../services/FertilizerAdsService';

const Fertilizers = () => {

    const [fertilizerAds, setFertilizerAds] = useState([]);
  
    useEffect(() => {
      retrieveFertilizerAds();
    }, []);
  
    const retrieveFertilizerAds = () => {
        FertilizerAdsService.getHomeAll()
        .then((response) => {
            setFertilizerAds(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
        retrieveFertilizerAds();
    };

    return (
        <div className='content-load pt-70'>
            <div className='page-body'>
                <section className='fertilizers'>
                    <div className='container'>
                        <div className='row mb-3'>
                            <div className='col-12'>
                                <h4 className='page-title'>All Fertilizers</h4>
                            </div>
                        </div>
                        <div className='row'>
                            {fertilizerAds.map((data, index) => (  
                            <div className="col-md-6 list mb-3" key={index}>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <img src="/images/fertilizers/1.jpg" alt="ad1" className="img-fluid" />
                                    </div>
                                    <div className='col-md-9 text-start'>
                                        <h5>{data.fertilizer_name}</h5>
                                        <p>{data.details}</p>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )

}

export default Fertilizers;