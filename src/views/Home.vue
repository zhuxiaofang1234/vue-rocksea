<template>
    <el-container>
        <el-header>
            <div :class="[{samllWidth:isCollapse},'header-l']"></div>
            <!--顶部菜单-->
            <div :class="[isCollapse ? 'smallLeft' :'largeLeft' ,'header-r']">
                <div class="menu-collapse" @click="toggleCollapse">
                    <i class="el-icon-s-fold"></i>
                </div>
                <el-menu
                        :default-active="topActiveIndex"
                        class="el-menu-first"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#fff"
                        text-color="#000"
                        active-text-color="#409EFF"
                >
                    <el-menu-item  v-for="item in menuData" :index="item.name">
                        <i :class="'fa fa-'+ item.icon"></i>
                        <span slot="title">{{item.displayName}}</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-header>
        <el-container>
            <el-aside :style="{width:isCollapse ? '64px' : '200px'}">
                <!--侧边栏菜单-->
                <el-menu
                        :default-openeds ="indexArray"
                        :unique-opened="true"
                        class="el-menu-vertical-demo"
                        :default-active="activeIndex"
                        :router="true"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        @open="handleOpen"
                        @close="handleClose"
                        @select="selectedMenu"
                        background-color="#3a3f51"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <!--一级菜单-->
                    <el-submenu class="sideMenu" v-for="item1 in currentMenuData" :index="item1.name">
                        <template slot="title">
                            <i :class="'fa fa-'+ item1.icon"></i>
                            <span>{{item1.displayName}}</span>
                        </template>
                        <!--二级菜单 包含三级菜单-->

                       <el-submenu v-for= "item2 in item1.items"  :index="item2.name" v-if="item2.items.length>0">
                            <template slot="title">{{item2.displayName}}</template>
                            <!--三级菜单-->
                           <el-menu-item  v-for="item3 in item2.items" :index="item3.name">{{item3.displayName}}</el-menu-item>
                        </el-submenu>
                        <!--只有二级菜单，没有三级菜单-->
                        <el-menu-item :index="item2.name" v-else>{{item2.displayName}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        topActiveIndex:"UnitManagement", //默认选中顶部菜单的index
        activeIndex: "SelfUnit", //默认选中侧边栏菜单一级index
        indexArray:null, //默认展开的菜单
        menuData:[], //菜单数据
        currentMenuData:[], //侧边菜单数据
        isCollapse: false,
      };
    },
    created(){
    this.getGetCurrentLoginInformations();
    },
    methods: {
      handleSelect(key, keyPath) { //选择顶部菜单，渲染二级菜单
       this.currentMenuData = this.menuData.filter(function(item){
          return item.name === key
        });
          this.openChildMenu ()
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      selectedMenu(key,keyPath){
        console.log(keyPath);
      },
       async getGetCurrentLoginInformations(){
        var res = await this.$http.get('/api/services/app/Session/GetCurrentLoginInformations');
         const  result = res.result;
           let menuData = result.menu.items;
           this.menuData = menuData;
           //默认渲染的二级菜单
           var defalutCode = this.topActiveIndex; //默认的code
              this.currentMenuData = menuData.filter(function(item){
               return item.name === defalutCode
           });
              this.openChildMenu();
      },
        openChildMenu (){ //默认展开二级菜单
            this.indexArray = [];
            if(this.currentMenuData.length!==0){ //一级菜单
                let code1 = this.currentMenuData[0].name;
                this.indexArray.push(code1);
                if(this.currentMenuData[0].items.length!==0){ //有二级菜单
                    let code2 =  this.currentMenuData[0].items[0].name;
                    this.indexArray.push(code2);
                    if(this.currentMenuData[0].items[0].items.length!==0){ //三级菜单
                        let code3 =  this.currentMenuData[0].items[0].items[0].name;
                        this.activeIndex = code3;
                      this.$router.push({path:'/'+code3})
                    }else{ //没有三级菜单
                        this.activeIndex = code2;
                        this.$router.push({path:'/'+code2}) //路由跳转
                    }
                }
            }
        },
      toggleCollapse(){
        this.isCollapse = !this.isCollapse
      }
    }
  };
</script>
<style scoped lang="scss">
    .el-header
   {
    text-align: center;
    height: 60px;
    padding: 0;
    }
    .header-l{
        width:200px;
        height: 100%;
        float: left;
        background-color:#3a3f51;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #454b61;
        -webkit-transition: width 0.3s;
        transition: width 0.3s;
        overflow: hidden;
    }
    .header-l.samllWidth,.el-aside.samllWidth{
        width:64px !important;
    }
    .header-r{
        height:100%;
        position: relative;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
    }
    .header-r.smallLeft{
        margin-left:64px;
    }
    .header-r.largeLeft{
        margin-left:200px;
    }
    .header-r .menu-collapse{
        position: absolute;
        left:3px;
        top:10px;
        font-size: 30px;
        color:#666;
    }

    .el-aside {
        width:200px;
        background-color: #3a3f51;
        color: #fff;
        height: 100%;
        text-align: left;
    }


    .el-container {
        height: 100%;
    }

    .el-menu {
        border-right: 0;
    }

    .el-menu-first.el-menu {
        float: right;
    }
    .el-menu-first .fa{
        margin-right:8px;
    }
    .el-menu-item.is-active .fa{
        color:#409EFF
    }

    .sideMenu .fa{
        margin-right: 10px;
    }
    .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        overflow: hidden;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

</style>
