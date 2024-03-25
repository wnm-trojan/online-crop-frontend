import axios from "axios";

const getAll = () => {
    return axios.get("/province");
};

const ProvinceService = {
    getAll,
};

export default ProvinceService;
