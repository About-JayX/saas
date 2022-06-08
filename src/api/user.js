import request from "@/utils/request";
// 登录获取token
export function login(data) {
  return request({
    url: "/sys/login",
    method: "POST",
    data,
  });
}

export function getInfo() {}

export function logout() {}
