const authUser = {
    IsAuth,
    Get,
    Remove
}

function IsAuth() {
    let userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    const isAuth = user ? true : false;
    return isAuth;
}

function Get() {
    let userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    return user;
}
function Remove() {
    localStorage.removeItem('user');
}
export default authUser;