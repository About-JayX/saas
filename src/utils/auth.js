// 存储Token
import Cookies from "js-cookie";

const TokenKey = "myToken";
const TokenTime = "TokenTime";
// 获取token
export function getToken() {
  return Cookies.get(TokenKey);
}
// 存储token
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey);
}

// 存储token的时间
export function setTime() {
  return Cookies.set(TokenTime, Date.now());
}
// 获取存储token的时间
export function getTime() {
  return Cookies.get(TokenTime);
}
// 删除存储token的时间

export function removeTime() {
  return Cookies.remove(TokenTime);
}
