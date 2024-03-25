import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useTranslation } from "react-i18next";

const DemandWeek = () => {
 
    const { t } = useTranslation();
    const [DemandWeekData, setDemandWeekData] = useState([]);

    useEffect(() => {
        const getDemandWeekData = async () => {
            const dataFormServer = await fetchData()
            setDemandWeekData(dataFormServer)
        }
        getDemandWeekData();
    }, [])

    const fetchData = async () => {
        const res = await axios.get('/home_page/items/3/7');
        const { data } = res;
        return data;
    }

    return (
        <React.Fragment>
        {DemandWeekData.length > 0 ? (
            <div className="list d-flex">
                <ul>
                    <li className="title">{t('Most_Demand')}</li>
                    {DemandWeekData.map((data, index) => (
                        <li key={index}>
                            {index == 0 ? (
                                <div className="image">
                                    <img src={"/images/analyzer/"+data.image_name} alt={data.crop_name} />
                                </div>
                            ):(
                                <React.Fragment></React.Fragment>
                            )}
                            <span>{data.crop_name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        ):(
            <React.Fragment></React.Fragment>
        )}
        </React.Fragment>
    );
  };

export default DemandWeek;