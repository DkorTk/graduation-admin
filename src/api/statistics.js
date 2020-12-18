import http from "../http"

//获取统计查询
export function getStatistics () {
  return http.post("/getStatistics", {})
}
