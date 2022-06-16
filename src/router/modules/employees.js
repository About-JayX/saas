// 员工管理
import Layout from "@/layout";
import employees from "@/views/employees";
import importEmp from "@/views/employees/components/importEmp";
import detail from "@/views/employees/detail";
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
    { path: "import", name: "importEmp", component: importEmp, hidden: true },
    { path: "detail", name: "detail", component: detail, hidden: true },
  ],
};
