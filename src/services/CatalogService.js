import apiClient from "../helpers/apiClient";

const CatalogService = {
    GetAll,
    Get
}

function GetAll() {
    return apiClient.get('/catalog/getall')
        .then((res) => res)
        .catch(err => err);
}
function Get(id) {
    return apiClient.get('/catalog/get/' + id)
        .then((res) => res)
        .catch(err => err);
}
export default CatalogService;
