import http from "../http"


export function createPet(data) {
    return  http.post("/createPet", {
        data
    })
}