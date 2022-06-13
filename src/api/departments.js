// 负责管理所有与组织架构相关的接口
import request from "@/utils/request";

// 查询企业的部门列表
export function getDeptList() {
  return request({
    url: "/company/department",
  });
}

// 根据 ID 删除部门
export function delDept(id) {
  return request({
    url: `/company/department/${id}`,
    method: "DELETE",
  });
}

// 新增部门
export function addDept(data) {
  return request({
    url: "/company/department",
    method: "post",
    data,
  });
}

// 根据 id 部门详情
export function getDeptDetail(id) {
  return request({
    url: `/company/department/${id}`,
  });
}

// 根据ID修改部门详情
export function updateDept(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: "PUT",
    data,
  });
}
