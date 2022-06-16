// 统一暴露文件
import { login, getUserInfo, getStaffUserInfo } from "./user";
import {
  getDeptList,
  delDept,
  addDept,
  getDeptDetail,
  updateDept,
} from "./departments";

import {
  getRoleList,
  addRole,
  delRole,
  RoleDetails,
  updateRole,
} from "./setting";

import {
  getSimpleList,
  getEmplist,
  addEmp,
  delEmp,
  importEmpl,
  saveEmp,
} from "./employess";
export const loginAPI = login;
export const getUserInfoAPI = getUserInfo;
export const getStaffUserInfoAPI = getStaffUserInfo;
export const getDeptListAPI = getDeptList;
export const delDeptAPI = delDept;
export const getSimpleListApi = getSimpleList;
export const addDeptAPI = addDept;
export const getDeptDetailAPI = getDeptDetail;
export const updateDeptAPI = updateDept;
export const getRoleListAPI = getRoleList;
export const addRoleAPI = addRole;
export const delRoleAPI = delRole;
export const RoleDetailsAPI = RoleDetails;
export const updateRoleAPI = updateRole;
export const getEmplistAPI = getEmplist;
export const addEmpAPI = addEmp;
export const delEmpAPI = delEmp;
export const importEmplAPI = importEmpl;
export const saveEmpAPI = saveEmp;
