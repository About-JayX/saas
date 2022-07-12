import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import "font-awesome/css/font-awesome.min.css";
import "@/icons"; // icon
import "@/permission"; // permission control
// 导入自己封装的插件
import plugin from "./plugin";
Vue.use(plugin);
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI);
import print from "vue-print-nb";
Vue.config.productionTip = false;
Vue.use(print);
// 导入过滤器
import * as filterObj from "./filters";
Object.keys(filterObj).forEach((item) => {
  Vue.filter(item, filterObj[item]);
});
// 导入自定义指令
import directive from "./directives";
let keys = Object.keys(directive);
keys.forEach((item) => {
  Vue.directive(item, directive[item]);
});

import i18n from "@/lang";
new Vue({
  el: "#app",
  i18n,
  router: router,
  store,
  render: (h) => h(App),
});
