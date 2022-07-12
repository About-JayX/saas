import { constantRoutes, syncRouter } from "@/router";

export default {
  namespaced: true,
  state: {
    routers: [...constantRoutes],
  },
  mutations: {
    changeRouter(state, obj) {
      state.routers = [...constantRoutes, ...obj];
      console.log(state.routers);
    },
  },
  actions: {
     setRouter(ctx, obj) {
      const newRouter = syncRouter.filter((item) => {
        let path = item.path.split("/")[1];
        return obj.includes(path);
      });
      ctx.commit("changeRouter", newRouter);
      return newRouter;
    },
  },
};
