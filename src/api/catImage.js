import http from "../http"

export function catImage(file) {
    console.log("执行到api");
    const formData = new FormData();
    formData.append("img", file);
    
    return  http.post("/catImage", formData).then(res => {
        console.log(res);
    })
}