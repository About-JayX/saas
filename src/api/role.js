import request from "@/utils/request";
// 获取所有的角色列表
export function getRoleList(params) {
  return request({
    url: "/sys/role",
    method: "GET",
    params,
  });
}

export function setRole(data) {
  return request({
    url: "/sys/role/assignPrem",
    method: "put",
    data,
  });
}

// 获取角色详情
export function getRole(id) {
  return request({
    url: `/sys/role/${id}`,
  });
}

// 给角色分配权限
export function setRolePer(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}