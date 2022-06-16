// 封装插件
import mytool from "@/components/mytool";
import excel from '@/components/excel'
export default {
  install: (Vue) => {
    Vue.component("mytool", mytool);
    Vue.component("excel", excel);
  },
};
