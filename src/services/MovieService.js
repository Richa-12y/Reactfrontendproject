import apiClient from "../helpers/apiClient";

const MovieService = {
    GetAll,
    Get,
    Add,
    Update,
    Delete
}

function GetAll() {
    return apiClient.get('/movie/getall')
        .then((res) => res)
        .catch(err => err);
}
function Get(id) {
    return apiClient.get('/movie/get/' + id)
        .then((res) => res)
        .catch(err => err);
}

function Add(model) {
    return apiClient.post('/movie/add/', model)
        .then((res) => res)
        .catch(err => err);
}
function Update(model) {
    return apiClient.put('/movie/update/' + model.id, model)
        .then((res) => res)
        .catch(err => err);
}
function Delete(id) {
    return apiClient.delete('/movie/delete/' + id)
        .then((res) => res)
        .catch(err => err);
}

export default MovieService;