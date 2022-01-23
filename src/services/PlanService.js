import apiClient from "../helpers/apiClient";

const PlanService = {
    GetAll,
    Get,
    Add
}

function GetAll() {
    return apiClient.get('/plan/getall')
        .then((res) => res)
        .catch(err => err);
}
function Get(id) {
    return apiClient.get('/plan/get/' + id)
        .then((res) => res)
        .catch(err => err);
}
function Add(model) {
    return apiClient.post('/plan/add', model)
        .then((res) => res)
        .catch(err => err);
}
export default PlanService;