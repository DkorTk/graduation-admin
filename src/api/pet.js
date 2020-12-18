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
//编辑宠物列表
export function setPetInfo ({ animal, name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state, id }) {
    return http.post("/setPet", {
        animal, name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state, id
    })
}
//删除宠物信息
export function delPetInfo ({ animal, id }) {
    return http.post("/delPet", {
        animal,
        id
    })
}