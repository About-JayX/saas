// 社保
import Layout from "@/layout";
import social from "@/views/social";

export default {
  path: "/social_securitys",
  component: Layout,
  children: [
    {
      path: "",
      name: "social_securitys",
      component: social,
      meta: { title: "社保", icon: "table" },
    },
  ],
};
