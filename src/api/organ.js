import http from "../http"


// 添加机构
export function addOrgan ({ name, account, password }) {
  return http.post("/addOrgan", {
    name, account, password
  })
}
//获取机构列表
export function getOrganList () {
  return http.post("/getOrganList", {
  })
}
// 编辑机构
export function setOrgan ({ name, account, password, id }) {
  return http.post("/setOrgan", {
    name, account, password, id
  })
}
//删除机构信息
export function delOrgan ({ id }) {
  return http.post("/delOrgan", {
    id
  })
}