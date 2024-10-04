// lib/auth.js
export function checkUserAuthentication() {
    const user = JSON.parse(localStorage.getItem("auth_user"))
    if (!user || !user?.token) {
        localStorage.removeItem("auth_user");
        return false;
    } else {
        return true;
    }
}