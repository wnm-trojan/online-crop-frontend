import axios from "axios";

  const getAll = () => {
    return axios.get("/cultivation_plan");
  };
  
  const get = (id) => {
    return axios.get(`/cultivation_plan/${id}`);
  };

  const getByUser = (user) => {
    return axios.get(`/cultivation_plan/get_by_farmer_id/${user}`)
  }

  const getFarmerActiveComplete = (plan_type, user, current_date) => {
    return axios.get(`/cultivation_plan/get_farmer_active_complete_plan/${plan_type}/${user}/${current_date}`)
  }
  
  const create = (data) => {
    return axios.post("/cultivation_plan/create", data);
  };
  
  const update = (id, data) => {
    return axios.put(`/cultivation_plan/update/${id}`, data);
  };
  
  const remove = (id) => {
    return axios.delete(`/cultivation_plan/delete/${id}`);
  };
  
  const removeAll = () => {
    return axios.delete(`/cultivation_plan/delete`);
  };
  
  const findByTitle = (title) => {
    return axios.get(`/cultivation_plan?title=${title}`);
  };

  const updateStockStatus = (id, data) => {
    return axios.put(`/cultivation_plan/update_stock_status/${id}`, data);
  }
  
  const CultivationPlanService = {
    getAll,
    get,
    getByUser,
    getFarmerActiveComplete,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    updateStockStatus,
  };
  
  export default CultivationPlanService;
