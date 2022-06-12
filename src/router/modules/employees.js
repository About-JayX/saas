// 员工管理
import Layout from "@/layout";
import employees from "@/views/employees";

export default {
  path: "/employees",
  component: Layout,
  children: [
    {
      path: "",
      name: "employees",
      component: employees,
      meta: { title: "员工", icon: "people" },
    },
  ],
};
