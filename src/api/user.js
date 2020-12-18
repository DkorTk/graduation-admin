import http from "../http"


export function createPet (data) {
  return http.post("/createPet", {
    data
  })
}
//获取用户列表
export function getUserList () {
  return http.post("/getUserList", {

  })
}
//编辑用户列表
export function setUser ({ email, password, nickname, id }) {
  return http.post("/setUser", {
    email, password, nickname, id
  })
}
//删除用户信息
export function delUser ({ id }) {
  return http.post("/delUser", {
    id
  })
}