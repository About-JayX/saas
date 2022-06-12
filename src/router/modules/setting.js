// 公司设置
import Layout from "@/layout";
import setting from "@/views/setting";

export default {
  path: "/setting",
  component: Layout,
  children: [
    {
      path: "",
      name: "setting",
      component: setting,
      meta: { title: "公司设置", icon: "setting" },
    },
  ],
};
