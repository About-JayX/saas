// 统一暴露文件
import { login, getUserInfo, getStaffUserInfo } from "./user";

export const loginAPI = login;
export const getUserInfoAPI = getUserInfo;
export const getStaffUserInfoAPI = getStaffUserInfo;
