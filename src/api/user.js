import request from "@/utils/request";
// 登录获取token
export function login(data) {
  return request({
    url: "/sys/login",
    method: "POST",
    data,
  });
}
// 获取登录用户信息
export function getUserInfo() {
  return request({
    url: "/sys/profile",
    method: "post",
  });
}
// 获取员工基本信息
export function getStaffUserInfo(id) {
  return request({
    url: `/sys/user/${id}`,
  });
}
export function logout() {}
