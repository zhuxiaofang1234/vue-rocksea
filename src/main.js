import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/common.scss";
import Toast from "@/components/toast/Toast.vue";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Toast);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
