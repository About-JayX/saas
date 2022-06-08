import axios from "axios";
// 导入vuex
import store from "@/store";
// 设置基地址
const request = axios.create({
  baseURL: "/api",
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
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
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
