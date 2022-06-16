// 负责封装所有与员工管理相关的接口
import request from "@/utils/request";

// 获取员工简单列表
export function getSimpleList() {
  return request({
    url: "/sys/user/simple",
  });
}

// 获取员工列表
export function getEmplist(params) {
  return request({
    url: "/sys/user",
    params,
  });
}

// 新增员工
export function addEmp(data) {
  return request({
    url: "/sys/user",
    method: "post",
    data,
  });
}

// 删除员工
export function delEmp(id) {
  return request({
    url: `/sys/user/${id}`,
    method: "delete",
  });
}

// 批量导入员工
export function importEmpl(data) {
  return request({
    url: "/sys/user/batch",
    method: "POST",
    data,
  });
}

// 保存员工基本信息
export function saveEmp(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: "put",
    data,
  });
}
