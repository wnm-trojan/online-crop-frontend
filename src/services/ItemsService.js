import axios from "axios";

const getAll = () => {
    return axios.get("/crop_master");
};

const ItemsService = {
    getAll,
};

export default ItemsService;
