import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import 'font-awesome/css/font-awesome.min.css'
import "@/style/common.scss";
import axios from "axios";
Vue.prototype.$http = axios;

//配置请求的根路径
axios.defaults.baseURL = "";

// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function(config){
  let token = window.sessionStorage.getItem("accessToken");
  if(token){
    //将token放到请求头发送给服务器，将tokenkey放在请求头中
    config.headers.Authorization = "Bearer "+token;
  }
  return config
},function(error){
  return Promise.reject(error);
});

Vue.config.productionTip = false;

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
