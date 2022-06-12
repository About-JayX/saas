// 统一暴露文件
import { login, getUserInfo, getStaffUserInfo } from "./user";
import { getDeptList, delDept, addDept } from "./departments";
import { getSimpleList } from "./employess";
export const loginAPI = login;
export const getUserInfoAPI = getUserInfo;
export const getStaffUserInfoAPI = getStaffUserInfo;
export const getDeptListAPI = getDeptList;
export const delDeptAPI = delDept;
export const getSimpleListApi = getSimpleList;
export const addDeptAPI = addDept;
