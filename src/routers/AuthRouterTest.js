import React from 'react';
import {Route, Routes} from 'react-router-dom';
import PrivateRouteFarmer from './PrivateRouteFarmer';
import PrivateRouteDealer from './PrivateRouteDealer';
import PrivateRouteFertilizer from './PrivateRouteFertilizer';
import Farmer from '../components/farmer/Farmer';
import CultivationPlan from '../components/farmer/cultivation-plan/Index';
import Dealer from '../components/dealer/Dealer';
import Fertilizer from '../components/fertilizer/Fertilizer';

const AuthRouterTest = () => {
    return (
        <Routes>
            <Route exact path='/' element={<PrivateRouteFarmer/>}>
                <Route exact path='/dashboard/farmer' element={<Farmer/>}/>
                <Route exact path='/dashboard/farmer/cultivation-plan' element={<CultivationPlan/>}/>
            </Route>
            <Route exact path='/' element={<PrivateRouteDealer/>}>
                <Route exact path='/dashboard/dealer' element={<Dealer/>}/>
            </Route>
            <Route exact path='/' element={<PrivateRouteFertilizer/>}>
                <Route exact path='/dashboard/fertilizer' element={<Fertilizer/>}/>
            </Route>
        </Routes>
    );
  };

export default AuthRouterTest;