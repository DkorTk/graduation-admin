import http from "../http"


export function adminLogin({email, password}) {
    return  http.post("/adminLogin", {
        email,
        password
    })
}