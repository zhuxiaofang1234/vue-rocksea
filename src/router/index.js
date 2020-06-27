import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import Welcome from "../views/Welcome"
import AppInformations from "../views/system/AppInformations"
import SelfUnit from "../views/unit/SelfUnit"
import Devices from "../views/device/Devices"
import EntrustBills from "../views/finance/EntrustBills"
import ProjectCreation from "../views/project/ProjectCreation"
import EntrustCreation from "../views/entrust/EntrustCreation"
import WorkSchedule from "../views/test/WorkSchedule"
import DataAnalysis from "../views/report/DataAnalysis"
import Monitor from "../views/statistical/Monitor"


Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


const routes = [{
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:Welcome,
      },
      {//系统管理
        path:'/AppInformations',
        component:AppInformations,
      },
      {
        path:'/SelfUnit',
        component:SelfUnit,
      },
      {//设备管理
        path:'/Devices',
        component:Devices,
      },
      {//财务管理
        path:'/EntrustBills',
        component:EntrustBills,
      },
      {//工程管理
        path:'/ProjectCreation',
        component:ProjectCreation,
      },
      {//委托管理
        path:'/EntrustCreation',
        component:EntrustCreation,
      },
      {//检测管理
        path:'/WorkSchedule',
        component:WorkSchedule,
      },
      {//报告管理
        path:'/DataAnalysis',
        component:DataAnalysis,
      },
      {//统计查询
        path:'/Monitor',
        component:Monitor,
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to将要访问的路径
  //from代表从哪个路径跳转而来
  if (to.path === "/login") return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem("accessToken");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
