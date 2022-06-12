// 负责封装所有与员工管理相关的接口
import request from "@/utils/request";

// 获取员工简单列表
export function getSimpleList() {
  return request({
    url: "/sys/user/simple",
  });
}
