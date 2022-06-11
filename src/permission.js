import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 创建白名单
const whiteList = ["/login", "/404"];
router.beforeEach(async (to, from, next) => {
  // 加载进度条
  NProgress.start();
  // 如果存在token
  if (store.getters.token) {
    //   判断是否去登录页面
    if (to.path == "/login") {
      // 页面不会跳转到登录页面，不会进入到后置守卫
      NProgress.done();
      // 直接跳转到首页
      return next("/");
    } else {
      // 判断vuex中是否存在数据，不存在则发送请求获取
      if (!store.getters.username) {
        // 先获取完成数据之后放行，所以调用await
        await store.dispatch("user/getUserInfo");
      }
      return next();
    }
  } else {
    //   判断是否在白名单内
    if (whiteList.includes(to.path)) {
      // 放行
      return next();
    } else {
      Message.error("请先登录！");
      //   保存去的页面，并且打回登陆页面
      router.push({
        name: "login",
        query: {
          back: to.path,
        },
      });
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});
