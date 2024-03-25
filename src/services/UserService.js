import axios from "axios";

const getAll = () => {
return axios.get("/user");
};

const get = (id) => {
return axios.get(`/user/${id}`);
};

const create = (data) => {
return axios.post("/user/create", data);
};

const update = (id, data) => {
return axios.put(`/user/update/${id}`, data);
};

const remove = (id) => {
return axios.delete(`/user/delete/${id}`);
};

const UserService = {
getAll,
get,
create,
update,
remove
};

export default UserService;
