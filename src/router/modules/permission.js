// 权限
import Layout from "@/layout";
import permission from "@/views/permission";

export default {
  path: "/permissions",
  component: Layout,
  children: [
    {
      path: "",
      name: "permissions",
      component: permission,
      meta: { title: "权限管理", icon: "lock" },
    },
  ],
};
