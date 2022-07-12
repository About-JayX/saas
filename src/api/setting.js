// 导入 axios
import request from "@/utils/request";

// 添加角色
export function addRole(data) {
  return request({
    url: "/sys/role",
    method: "post",
    data,
  });
}

// 删除角色

export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: "DELETE",
  });
}

// 获取角色详情
export function RoleDetails(id) {
  return request({
    url: `/sys/role/${id}`,
    method: "GET",
  });
}

// 更新角色
export function updateRole(id, data) {
  return request({
    url: `/sys/role/${id}`,
    method: "PUT",
    data,
  });
}
