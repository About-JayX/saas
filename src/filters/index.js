// 管理当前项目的所有过滤器
import employees from "@/api/constant/employees";
// 导入moment.js
import moment from "moment";
import store from "@/store";
export const numberToWord = function (val) {
  // 数字转文本
  const obj = employees.hireType.find((item) => {
    return item.id === +val;
  });
  return obj ? obj.value : "未知";
};

export const Timeformat = function (val) {
  return moment(val).format("YYYY-MM-DD");
};

export const controlBtn = function (val) {
  return !store.getters.userInfo.roles.points.includes(val);
};
