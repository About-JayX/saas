// 权限
import Layout from "@/layout";
import permission from "@/views/permission";

export default {
  path: "/permission",
  component: Layout,
  children: [
    {
      path: "",
      name: "permission",
      component: permission,
      meta: { title: "权限管理", icon: "lock" },
    },
  ],
};
