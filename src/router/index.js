import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
// 导入动态路由
import approvals from "./modules/approvals";
import attendances from "./modules/attendances";
import departments from "./modules/departments";
import employees from "./modules/employees";
import permission from "./modules/permission";
import salarys from "./modules/salarys";
import setting from "./modules/setting";
import social from "./modules/social";
import store from "@/store";
export const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    name: "notFound",
    path: "/404",
    component: () => import("@/views/404"),
    // 如果hidden 为true 则不显示在侧边栏
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true },
];

export const syncRouter = [
  departments,
  employees,
  setting,
  salarys,
  social,
  attendances,
  approvals,
  permission,
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes],
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
