// 组织架构
import Layout from "@/layout";
import departments from "@/views/departments";

export default {
  path: "/departments",
  component: Layout,
  children: [
    {
      path: "",
      name: "departments",
      component: departments,
      meta: { title: "组织架构", icon: "tree" },
    },
  ],
};
