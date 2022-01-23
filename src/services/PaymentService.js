import apiClient from "../helpers/apiClient";

const PaymentService = {
    SavePaymentDetails,
    CreateOrder,
    GetAllUsersPayment
}

function CreateOrder(model) {
    return apiClient.post('/payment/createorder', model)
        .then((res) => res)
        .catch(err => err);
}
function SavePaymentDetails(model) {
    return apiClient.post('/payment/savepaymentdetails', model)
        .then((res) => res)
        .catch(err => err);
}
function GetAllUsersPayment(UserId) {
    return apiClient.post(`/payment/GetAllUsersPayment?UserId=${UserId}`)
        .then((res) => res)
        .catch((err) => err);
}
export default PaymentService;