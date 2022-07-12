// 封装所有与权限管理相关的接口
import request from "@/utils/request";

// 根据 ID 更新权限点详情
export function updatePerByIdApi(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: "PUT",
    data,
  });
}

// 根据 ID 获取权限点详情
export function getPerByIdApi(id) {
  return request({
    url: `/sys/permission/${id}`,
  });
}

// 根据 ID 删除权限点
export function delPerByIdApi(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: "DELETE",
  });
}

// 添加权限点
export function addPerApi(data) {
  return request({
    url: "/sys/permission",
    method: "POST",
    data,
  });
}

// 获取所有权限点
export function getPerListApi() {
  return request({
    url: "/sys/permission",
  });
}
