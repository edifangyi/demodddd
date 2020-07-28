import cookies from "react-cookies";

const token = "adminToken";

// 存储token
export function setToken(value){
    cookies.save(token, value);
}
export function getToken(){
    return cookies.load(token);
}
