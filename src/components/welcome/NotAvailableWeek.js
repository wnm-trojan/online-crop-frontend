import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useTranslation } from "react-i18next";

const NotAvailableWeek = () => {
 
    const { t } = useTranslation();
    const [NotAvaWeekData, setNotAvaWeekData] = useState([]);

    useEffect(() => {
        const getNotAvaWeekData = async () => {
            const dataFormServer = await fetchData()
            setNotAvaWeekData(dataFormServer)
        }
        getNotAvaWeekData();
    }, [])

    const fetchData = async () => {
        const res = await axios.get('/home_page/items/1/7');
        const { data } = res;
        return data;
    }

    return (
        <React.Fragment>
        {NotAvaWeekData.length > 0 ? (
        <div className="list d-flex">
            <ul>
                <li className="title">{t('Not_Available')}</li>
                {NotAvaWeekData.map((data, index) => (
                    <li key={index}>
                        {index == 0 ? (
                            <React.Fragment>
                            <div className="image">
                                <img src={"/images/analyzer/"+data.image_name} alt={data.crop_name} />
                            </div>
                            </React.Fragment>
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

export default NotAvailableWeek;