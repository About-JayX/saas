import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "./zh";
import en from "./en";
Vue.use(VueI18n);
export default new VueI18n({
  messages: {
    en: { ...en },
    zh: { ...zh },
  },
  locale: "zh",
});
