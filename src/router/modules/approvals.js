// 审批

import Layout from "@/layout";
import approvals from "@/views/approvals";

export default {
  path: "/approvals",
  component: Layout,
  children: [
    {
      path: "",
      name: "approvals",
      component: approvals,
      meta: { title: "审批", icon: "tree-table" },
    },
  ],
};
