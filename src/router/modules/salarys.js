// 工资
import Layout from "@/layout";
import salarys from "@/views/salarys";

export default {
  path: "/salarys",
  component: Layout,
  children: [
    {
      path: "",
      name: "salarys",
      component: salarys,
      meta: { title: "工资", icon: "money" },
    },
  ],
};


