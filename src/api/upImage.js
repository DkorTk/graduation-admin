import http from "../http"

export function uploadImage(file) {
    console.log("执行到api");
    const formData = new FormData();
    formData.append("img", file);
    
    return  http.post("/uploadImage", formData).then(res => {
        console.log(res);
    })
}