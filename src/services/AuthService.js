import apiClient from "../helpers/apiClient";

const AuthService = {
    Login,
    Register
}

function Login(model) {
   return apiClient.post('/Auth/ValidateUser', model)
        .then((res) => res)
        .catch(err => err);
}
function Register(model) {
    return apiClient.post('/Auth/CreateUser', model)
    .then((res) => res)
    .catch(err => err);
}

export default AuthService;