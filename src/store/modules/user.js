import { loginAPI } from "@/api";
import { getToken, removeToken, setToken } from "@/utils/auth";
const getDefaultState = () => {
  return {
    token: getToken() || "",
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  // 发送登录请求
  async login(ctx, data) {
    let res = await loginAPI(data);
    // 存储vuex和本地token
    ctx.commit("setToken", res.data);
    setToken(res.data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
