import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
import queryString from "querystring";
import zhCN from "./locale/zhCN";
import enUS from "./locale/enUS";
import {
  Button,
  Layout,
  Menu,
  Icon,
  Drawer,
  Radio,
  Dropdown,
  LocaleProvider,
  DatePicker,
  Upload
} from "ant-design-vue";
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Dropdown);
Vue.use(LocaleProvider);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

import "@/mock";
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
