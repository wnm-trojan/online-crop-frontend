import React from 'react';
import Banner1 from '../../assets/images/banner1.png';

const HomeBanner = () => {
    return (
        <div className="home-banner mb-5">
            <img src={Banner1} alt="home-banner" className="img-fluid" />
        </div>
    );
  };

export default HomeBanner;