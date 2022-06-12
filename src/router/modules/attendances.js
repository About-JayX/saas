// 我是考勤页面
import Layout from "@/layout";
import attendances from "@/views/attendances";

export default {
  path: "/attendances",
  component: Layout,
  children: [
    {
      path: "",
      name: "attendances",
      component: attendances,
      meta: { title: "考勤", icon: "skill" },
    },
  ],
};
