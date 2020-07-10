import axios from "axios";
import Qs from 'qs';
import {Message, Loading } from 'element-ui'
const $axios = axios.create({
  //设置超时时间
  timeout: 30000,
  baseURL: ""
});

// 在全局请求和响应拦截器中添加请求状态
let loading = null;

//请求拦截器
$axios.interceptors.request.use(function(config) {
  let token = window.sessionStorage.getItem("accessToken");
  if (token) {
    loading = Loading.service({ text: "拼命加载中" });
   // 将token放到请求头发送给服务器，将tokenkey放在请求头中
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

//响应拦截器
$axios.interceptors.response.use(
  response => {
    if (loading) {
        loading.close();
    }
    const code = response.status;
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (loading) {
        loading.close();
    }

    if(error.response){
      switch(error.response.status){
        case 401:
          // 返回401 清除token信息并跳转到登陆页面
          //携带当前页面路由，以期在登录页面完成登录后返回当前页面
          sessionStorage.removeItem('accessToken');
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:
          Message.error('网络请求不存在');
          break;
        default:
          Message.error(error.response.data.message)
      }
    }else{
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }

    }
    return Promise.reject(error)
  }
);

//get,post 请求方法
export default {
  post(url,data) {
    return $axios({
      method:'post',
      url,
      data:data
    })
  },
  get(url,params){
    return $axios({
      method:'get',
      url,
      params
    })
  }
}





