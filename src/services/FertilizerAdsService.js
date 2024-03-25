import axios from "axios";

const getHomeAll = () => {
    return axios.get("/home_page/fertilizers");
};

const getAll = () => {
    return axios.get("/fertilizers");
};

const get = (id) => {
    return axios.get(`/fertilizers/${id}`);
};

const create = (data) => {
    return axios.post("/fertilizers/create", data);
};

const FertilizerAdsService = {
    getHomeAll,
    getAll,
    get,
    create,
};

export default FertilizerAdsService;