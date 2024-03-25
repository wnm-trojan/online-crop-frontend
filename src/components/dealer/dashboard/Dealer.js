import '../../../assets/css/dashboard/Dashboard.css';
import RecentCultivations from './RecentCultivations';
import YourAreaCultivations from './YourAreaCultivations';
import React from 'react';

const Dealer = () => {
    
    return (
        <div className="content-load">
            <RecentCultivations />
            <YourAreaCultivations />
        </div>
    )
}

export default Dealer;