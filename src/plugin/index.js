// 封装插件
import mytool from "@/components/mytool";
import excel from "@/components/excel";
import imgupload from "@/components/imgupload";
export default {
  install: (Vue) => {
    Vue.component("mytool", mytool);
    Vue.component("excel", excel);
    Vue.component("imgupload", imgupload);
  },
};
