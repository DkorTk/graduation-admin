import http from "../http"


export function createPet (data) {
    return http.post("/createPet", {
        data
    })
}
//获取宠物列表
export function getPetList ({ animal, organ }) {
    return http.post("/getPetList", {
        animal,
        organ
    })
}
//删除宠物信息
export function delPetInfo ({ animal, id }) {
    return http.post("/delPet", {
        animal,
        id
    })
}