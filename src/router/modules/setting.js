// 公司设置
import Layout from "@/layout";
import setting from "@/views/setting";

export default {
  path: "/settings",
  component: Layout,
  children: [
    {
      path: "",
      name: "settings",
      component: setting,
      meta: { title: "公司设置", icon: "setting" },
    },
  ],
};
