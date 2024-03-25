import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useTranslation } from "react-i18next";

const AvailableWeek = () => {
 
    const { t } = useTranslation();
    const [AvaWeekData, setAvaWeekData] = useState([]);

    useEffect(() => {
        const getAvaWeekData = async () => {
            const dataFormServer = await fetchData()
            setAvaWeekData(dataFormServer)
        }
        getAvaWeekData();
    }, [])

    const fetchData = async () => {
        const res = await axios.get('/home_page/items/2/7');
        const { data } = res;
        return data;
    }

    return (
        <React.Fragment>
        {AvaWeekData.length > 0 ? (
        <div className="list d-flex">
            <ul>
                <li className="title">{t('Most_Available')}</li>
                {AvaWeekData.map((data, index) => (
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

export default AvailableWeek;