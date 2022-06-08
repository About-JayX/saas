import router from "./router";
import store from "./store";
import { Message } from "element-ui";
// 创建白名单
const whiteList = ["/login", "/404"];
router.beforeEach((to, from, next) => {
  // 如果存在token
  if (store.getters.token) {
    //   判断是否去登录页面
    if (to.path == "/login") {
      // 直接跳转到首页
      next("/");
    } else {
      // 放行
      next();
    }
  } else {
    //   判断是否在白名单内
    if (whiteList.includes(to.path)) {
      // 放行
      next();
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
