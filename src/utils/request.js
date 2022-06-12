import axios from "axios";
// 导入vuex
import store from "@/store";
// 导入router
import router from "@/router";
// 导入提示窗口
import { Message } from "element-ui";
// 设置基地址
import { getTime } from "./auth";
const request = axios.create({
  baseURL: "/api",
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 主动处理token过期问题
    let time = Date.now() - getTime();
    if (time / 3600 / 1000 >= 1) {
      Message.error("登录已过期，请重新登陆！");
      store.dispatch("user/logout");
      // 记录过期前的操作页面
      router.push("/login?back=" + location.href.split("#")[1]);
      return Promise.reject(new Error("登录已过期，请重新登陆！"));
    }
    if (store.getters.token) {
      config.headers.Authorization = "Bearer " + store.getters.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 该项目中接口不会返回报错，所以在我们在响应拦截器人为做出判断
    const data = res.data;
    if (data.success) {
      return data;
    } else {
      return Promise.reject(data.message);
    }
  },
  async (err) => {
    // 被动处理Token过期问题
    if (err.response && err.response.data && err.response.data.code === 10002) {
      await store.dispatch("user/logout");
      Message.error("登陆过期，请重新登录！");
      // 保存过期前的登录信息
      router.push("/login?back=" + location.href.split("#")[1]);
    }
  }
);

export default request;
