// 社保
import Layout from "@/layout";
import social from "@/views/social";

export default {
  path: "/social",
  component: Layout,
  children: [
    {
      path: "",
      name: "social",
      component: social,
      meta: { title: "社保", icon: "table" },
    },
  ],
};
