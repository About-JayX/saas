// 封装插件
import mytool from "@/components/mytool";
export default {
  install: (Vue) => {
    Vue.component("mytool", mytool);
  },
};
