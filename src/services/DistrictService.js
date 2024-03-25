import axios from "axios";

const getAll = () => {
    return axios.get("/district");
};

const getByProvinceId = (province_id) => {
    return axios.get(`/district/province/${province_id}`);
};

const DistrictService = {
    getAll,
    getByProvinceId,
};

export default DistrictService;