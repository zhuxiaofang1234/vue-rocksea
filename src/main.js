import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import 'font-awesome/css/font-awesome.min.css'
import "@/style/common.scss"
import http from "./api/http.js"

ElementUI.Dialog.props.closeOnClickModal.default = false;
Vue.prototype.$http = http;

Vue.config.productionTip = false;

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
