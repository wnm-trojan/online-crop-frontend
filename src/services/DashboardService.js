import axios from "axios";

const getForecastingItems = (type, perioud, from, to, province, district) => {

    if(type != null && from != null && to != null && province == "all" && district == "all")
        return axios.get(`/dashboard/items_for_dashboard/${type}/${from}/${to}`);

    else if(type != null && from != null && to != null && province != "all" && district == "all")
        return axios.get(`/dashboard/items_for_dashboard/${type}/${from}/${to}/${province}`);

    else if(type != null && from != null && to != null && province != "all" && district != "all")
        return axios.get(`/dashboard/items_for_dashboard/${type}/${from}/${to}/${province}/${district}`);
        
    else
        return axios.get(`/dashboard/items_for_dashboard/${type}/${perioud}`);

};

const DashboardService = {
    getForecastingItems,
};

export default DashboardService;