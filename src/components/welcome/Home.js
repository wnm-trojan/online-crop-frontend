import '../../assets/css/welcome/Home.css';
import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import CountUp from 'react-countup';
import HomeBanner from './HomeBanner';
import DemandWeek from './DemandWeek';
import DemandMonth from './DemandMonth';
import AvailableWeek from './AvailableWeek';
import AvailableMonth from './AvailableMonth';
import NotAvailableWeek from './NotAvailableWeek';
import NotAvailableMonth from './NotAvailableMonth';
import FertilizerAds from './FertilizerAdsHome';
import { useTranslation } from "react-i18next";

export default function Home() {
    
    const { t } = useTranslation();

    const [userCount, setUserCount] = useState([]);

    useEffect(() => {
        const gteUserCount = async () => {
            const dataFormServer = await fetchData()
            setUserCount(dataFormServer)
        }
        gteUserCount();
    }, [])

    const fetchData = async () => {
        const res = await axios.get('/home_page/registerd_user_counts');
        const { data } = res;
        return data;
    }

    return (
      <div className="home">
            <HomeBanner/>
            <div className="container-fluid">
                <div className="row register-links">
                    <div className="col col-md-4">
                        <Link to='/register'>
                        <div className="register-box">
                            <div className="counter">
                                <h2><CountUp end={userCount.farmer_count} duration={5} />+</h2>
                                <h6>{t('Registered_Farmers')}</h6>
                            </div>
                            <div className="text">
                                <p>{t('Register')}</p>
                                <h4>{t('As_a_Farmer')}</h4>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col col-md-4">
                        <Link to='/register'>
                        <div className="register-box">
                            <div className="counter">
                                <h2><CountUp end={userCount.dealer_count} duration={5} />+</h2>
                                <h6>{t('Registered_Dealers')}</h6>
                            </div>
                            <div className="text">
                                <p>{t('Register')}</p>
                                <h4>{t('As_a_Dealer')}</h4>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col col-md-4">
                        <Link to='/register'>
                        <div className="register-box">
                            <div className="counter">
                                <h2><CountUp end={userCount.fertilizer_count} duration={5} />+</h2>
                                <h6>{t('Registered_Fertilizers')}</h6>
                            </div>
                            <div className="text">
                                <p>{t('Register')}</p>
                                <h4>{t('As_a_Fertilizer')}</h4>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-3">
                        <div className="sidebar-view">
                            <a href='/images/ad/vegitable-prices.jpg' target='_blank'>
                                <img src="/images/ad/vegitable-prices.jpg" alt="ad2" className="img-fluid mb-3" />
                            </a>
                            <a href='/images/ad/ad1.jpg' target='_blank'>
                                <img src="/images/ad/ad1.jpg" alt="ad1" className="img-fluid mb-3" />
                            </a>
                            <a href='/images/ad/ad2.webp' target='_blank'>
                                <img src="/images/ad/ad2.webp" alt="ad2" className="img-fluid mb-3" />
                            </a>
                        </div>
                    </div>
                    <div className="col col-md-9">
                        <div className="row analyzer-summery mx-0 mb-5">
                            <div className="col col-md-6">
                                <div className="analyzer-box vegi">
                                    <h4>{t('Vegetables_in_this_week')}</h4>
                                    {/* <DemandWeek/> */}
                                    <AvailableWeek/>
                                    <NotAvailableWeek/>
                                    <div className="more d-none">
                                        <a href="/login">More Details</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-6">
                                <div className="analyzer-box vegi">
                                    <h4>{t('Vegetables_in_next_month')}</h4>
                                    {/* <DemandMonth/> */}
                                    <AvailableMonth/>
                                    <NotAvailableMonth/>
                                    <div className="more d-none">
                                        <a href="/login">More Details</a>
                                    </div>
                                </div>
                            </div>
                            {/*
                            <div className="col col-md-6">
                                <div className="analyzer-box fruit">
                                    <h4>Fruits in next month</h4>
                                    <div className="list d-flex">
                                        <div className="image">
                                            <img src="/images/analyzer/watermelon.jpg" alt="carrot" />
                                        </div>
                                        <ul>
                                            <li className="title">Most demand</li>
                                            <li>Watermelon</li>
                                            <li>Avacado</li>
                                            <li>Pineapple</li>
                                        </ul>
                                    </div>
                                    <div className="list d-flex">
                                        <div className="image">
                                            <img src="/images/analyzer/avacado.jpg" alt="carrot" />
                                        </div>
                                        <ul>
                                            <li className="title">Most available</li>
                                            <li>Avacado</li>
                                            <li>Pineapple</li>
                                            <li>Orange</li>
                                        </ul>
                                    </div>
                                    <div className="list d-flex">
                                        <div className="image">
                                            <img src="/images/analyzer/banana.jpg" alt="carrot" />
                                        </div>
                                        <ul>
                                            <li className="title">Not available</li>
                                            <li>Banana</li>
                                            <li>Orange</li>
                                            <li>Strawberry</li>
                                        </ul>
                                    </div>
                                    <div className="more">
                                        <a href="/login">More Details</a>
                                    </div>
                                </div>
                            </div>
                            */}
                        </div>

                        <div className="row harvest-stock mx-0 d-none">
                            <div className="col col-md-6">
                                <div className="stock-box">
                                    <h4>Stock available in today</h4>
                                    <ul>
                                        <li>
                                            <h6>Carrot <span>100 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Cabbage <span>90 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Green Beans <span>85 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Beetroot <span>50 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Watermelon <span>20 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Banana <span>35 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Orange <span>15 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                    </ul>
                                    <div className="more">
                                        <a href="/login">More Details</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-6">
                                <div className="stock-box">
                                    <h4>Stock available in next week</h4>
                                    <ul>
                                        <li>
                                            <h6>Carrot <span>100 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Cabbage <span>90 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Green Beans <span>85 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Beetroot <span>50 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Watermelon <span>20 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Banana <span>35 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                        <li>
                                            <h6>Orange <span>15 Metric Tons</span></h6>
                                            <p>In all area</p>
                                        </li>
                                    </ul>
                                    <div className="more">
                                        <a href="/login">More Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row fertilizer-home mx-0 mb-5'>
                            <FertilizerAds/>
                        </div>

                        <div className='row articles mx-0 mb-5'>
                            <div className='col col-md-12'>
                                <div className='hm-title'>
                                    <h5 className='mb-0 text-start'>{t('Latest_Articles')}</h5>
                                </div>
                            </div>
                            <div className='col col-md-4 card'>
                                <div className="card-box">
                                    <img src={"/images/articles/articles1.jpg"} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title mb-4">Agriculture Organic Farming – Livestock and Vegetable Crops</h6>
                                        <a href="https://www.capel.ac.uk/course/agriculture/agriculture-organic-farming-livestock-and-vegetable-crops-award-level-1/" className="btn btn-primary" target='_blank'>Read More</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col col-md-4 card'>
                                <div className="card-box">
                                    <img src={"/images/articles/articles2.jpg"} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title mb-4">The Competitive Economics Of Vertical And Greenhouse Farming</h6>
                                        <a href="https://aigrow.lk/" className="btn btn-primary" target='_blank'>Read More</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col col-md-4 card'>
                                <div className="card-box">
                                    <img src={"/images/articles/articles3.jpg"} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title mb-4">New Farming Frontiers—Heat, Pesticides, and Virtual Reality</h6>
                                        <a href="https://daily.jstor.org/sustainability-now-new-farming-frontiers-heat-pesticides-virtual-reality/" className="btn btn-primary" target='_blank'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
      </div>
    );
}