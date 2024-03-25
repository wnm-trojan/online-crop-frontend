import React from 'react';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from '../components/partials/PageNotFound';
import Home from '../components/welcome/Home';
import Articles from '../components/pages/Articles';
import Fertilizers from '../components/pages/Fertilizers';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import AuthRouter from './AuthRouter';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRouteFarmer from './PrivateRouteFarmer';
import PrivateRouteDealer from './PrivateRouteDealer';
import PrivateRouteFertilizer from './PrivateRouteFertilizer';

import Admin from '../components/admin/dashboard/Admin';
import AdminProfile from '../components/admin/AdminProfile';

import Farmer from '../components/farmer/dashboard/Farmer';
import FarmerProfile from '../components/farmer/FarmerProfile';
import CultivationPlan from '../components/farmer/cultivation-plan/CultivationPlan';
import CultivationActivePlan from '../components/farmer/cultivation-plan/CultivationActivePlan';
import CultivationCompletedPlan from '../components/farmer/cultivation-plan/CultivationCompletedPlan';
import CultivationPlanCreate from '../components/farmer/cultivation-plan/CultivationPlanCreate';
import CultivationPlanEdit from '../components/farmer/cultivation-plan/CultivationPlanEdit';
import ForecastingInformation from '../components/farmer/forecasting-information/ForecastingInformation';
import StockList from '../components/farmer/stock/StockList';

import Dealer from '../components/dealer/dashboard/Dealer';
import DealerProfile from '../components/dealer/DealerProfile';
import StockFilter from '../components/dealer/stock-filter/StockFilter';
import CultivationWantedList from '../components/dealer/wanted-cultivation/CultivationWantedList';

import Fertilizer from '../components/fertilizer/dashboard/Fertilizer';
import FertilizerProfile from '../components/fertilizer/FertilizerProfile';
import FertilizerAds from '../components/fertilizer/fertilizer-ads/FertilizerAds';
import FertilizerAdsCreate from '../components/fertilizer/fertilizer-ads/FertilizerAdsCreate';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/articles' element={<Articles/>}/>
            <Route exact path='/fertilizers' element={<Fertilizers/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path=''  element={<AuthRouter/>}>
                <Route exact path='/dashboard/admin' element={<PrivateRouteAdmin/>}>
                    <Route exact path='/dashboard/admin/' element={<Admin/>}/>
                    <Route exact path='/dashboard/admin/profile' element={<AdminProfile/>}/>
                </Route>
                <Route exact path='/dashboard/farmer' element={<PrivateRouteFarmer/>}>
                    <Route exact path='/dashboard/farmer/' element={<Farmer/>}/>
                    <Route exact path='/dashboard/farmer/profile' element={<FarmerProfile/>}/>
                    <Route exact path='/dashboard/farmer/cultivation-plan' element={<CultivationPlan/>}/>
                    <Route exact path='/dashboard/farmer/cultivation-plan/create' element={<CultivationPlanCreate/>}/>
                    <Route exact path='/dashboard/farmer/cultivation-plan/edit/:id' element={<CultivationPlanEdit/>}/>
                    <Route exact path='/dashboard/farmer/cultivation-active-plan' element={<CultivationActivePlan/>}/>
                    <Route exact path='/dashboard/farmer/cultivation-completed-plan' element={<CultivationCompletedPlan/>}/>
                    <Route exact path='/dashboard/farmer/forecasting-information' element={<ForecastingInformation/>}/>
                    <Route exact path='/dashboard/farmer/stock-list' element={<StockList/>}/>
                </Route>
                <Route exact path='/dashboard/dealer' element={<PrivateRouteDealer/>}>
                    <Route exact path='/dashboard/dealer/' element={<Dealer/>}/>
                    <Route exact path='/dashboard/dealer/profile' element={<DealerProfile/>}/>
                    <Route exact path='/dashboard/dealer/stock-filter' element={<StockFilter/>}/>
                    <Route exact path='/dashboard/dealer/wanted-list' element={<CultivationWantedList/>}/>
                </Route>
                <Route exact path='/dashboard/fertilizer' element={<PrivateRouteFertilizer/>}>
                    <Route exact path='/dashboard/fertilizer/' element={<Fertilizer/>}/>
                    <Route exact path='/dashboard/fertilizer/profile' element={<FertilizerProfile/>}/>
                    <Route exact path='/dashboard/fertilizer/fertilizer-ads' element={<FertilizerAds/>}/>
                    <Route exact path='/dashboard/fertilizer/fertilizer-ads/create' element={<FertilizerAdsCreate/>}/>
                </Route>
            </Route>
        </Routes>
    );
  };

export default AppRouter;