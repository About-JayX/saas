import { loginAPI, getUserInfoAPI, getStaffUserInfoAPI } from "@/api";
import {
  getToken,
  removeToken,
  setToken,
  setTime,
  removeTime,
} from "@/utils/auth";
const getDefaultState = () => {
  return {
    token: getToken() || "",
    name: "",
    avatar: "",
    userInfo: {},
  };
};

const state = getDefaultState();

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token;
    // 存储本地token
    setToken(token);
    // 存储获取token的时间
    setTime();
  },
  // 存储用户信息
  setUserInfo(state, obj) {
    state.userInfo = obj;
  },
};

const actions = {
  // 发送登录请求
  async login(ctx, data) {
    let res = await loginAPI(data);
    // 存储vuex和本地token
    ctx.commit("setToken", res.data);
  },
  //获取用户信息请求
  async getUserInfo(ctx) {
    let res = await getUserInfoAPI();
    // 获取登录信息请求中不包含头像，所以需要再发送一个新的获取头像的请求
    let res1 = await getStaffUserInfoAPI(res.data.userId);
    let completeUeserInfo = {};
    // 定义一个对象，将两次获取到的对象展开存储在一个新的对象中
    completeUeserInfo = { ...res.data, ...res1.data };
    ctx.commit("setUserInfo", completeUeserInfo);
  },
  logout(ctx) {
    // 删除vuex中的token
    ctx.commit("setToken", "");
    // 删除vuex中的用户信息
    ctx.commit("setUserInfo", {});
    // 删除本地token
    removeToken();
    // 移除存储token 的时间
    removeTime();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
