export function isLoggedIn() {
    return !!localStorage.getItem("token");
}

export function login(token) {
    localStorage.setItem("token", token);
}

export function logout(token) {
    localStorage.removeItem(token);
}