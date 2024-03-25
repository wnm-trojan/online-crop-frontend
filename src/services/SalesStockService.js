import axios from "axios";

  const getAll = () => {
    return axios.get("/sales_stock");
  };
  
  const get = (id) => {
    return axios.get(`/sales_stock/${id}`);
  };

  const getByFarmer = (farmer_id) => {
    return axios.get(`/sales_stock/get_by_farmer/${farmer_id}`)
  };

  const getByProvince = (province_id) => {
    return axios.get(`/sales_stock/get_by_province_id/${province_id}`)
  };

  const getByDistrict = (district_id) => {
    return axios.get(`/sales_stock/get_by_district_id/${district_id}`)
  };
  
  const create = (data) => {
    return axios.post("/sales_stock/create", data);
  };
  
  const update = (id, data) => {
    return axios.put(`/sales_stock/update/${id}`, data);
  };
  
  const remove = (id) => {
    return axios.delete(`/sales_stock/delete/${id}`);
  };
  
  const removeAll = () => {
    return axios.delete(`/sales_stock/delete`);
  };
  
  const SalesStockService = {
    getAll,
    get,
    getByFarmer,
    getByProvince,
    getByDistrict,
    create,
    update,
    remove,
    removeAll,
  };
  
  export default SalesStockService;
