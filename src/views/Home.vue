<template>
    <el-container>
        <el-header>
            <div class="imageArea"></div>
            <!--顶部菜单-->
            <el-menu
                    :default-active="topActiveIndex"
                    class="el-menu-first"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
            >
                <el-menu-item  v-for="item in menuData" :index="item.name">{{item.displayName}}</el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!--侧边栏菜单-->
                <el-menu
                        :default-openeds ="indexArray"
                        :unique-opened="true"
                        class="el-menu-vertical-demo"
                        :default-active="activeIndex"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <!--一级菜单-->
                    <el-submenu  v-for="item1 in currentMenuData" :index="item1.name">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item1.displayName}}</span>
                        </template>
                        <!--二级菜单-->
                        <el-submenu v-for= "item2 in item1.items"  :index="item2.name">
                            <template slot="title">{{item2.displayName}}</template>
                            <!--三级菜单-->
                            <el-menu-item  v-for="item3 in item2.items" :index="item3.name">{{item3.displayName}}</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
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
        indexArray:[], //默认展开的菜单
        menuData:[],
        currentMenuData:[]
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
       async getGetCurrentLoginInformations(){
         const {data:res} =  await this.$http.get('/api/services/app/Session/GetCurrentLoginInformations');
         const  result = res.result;
           let menuData = result.menu.items;
           this.menuData = menuData;
           console.log(menuData);

           //默认渲染的二级菜单
           var defalutCode = this.topActiveIndex; //默认的code
              this.currentMenuData = menuData.filter(function(item){
               return item.name === defalutCode
           });
              this.openChildMenu();


      },
        openChildMenu (){ //默认展开二级菜单
            if(this.currentMenuData.length!==0){ //一级菜单
                let code1 = this.currentMenuData[0].name;
                this.indexArray.push(code1);
                if(this.currentMenuData[0].items.length!==0){ //二级菜单
                    let code2 =  this.currentMenuData[0].items[0].name;
                    this.indexArray.push(code2);
                    if(this.currentMenuData[0].items[0].items.length!==0){ //三级菜单
                        let code3 =  this.currentMenuData[0].items[0].items[0].name;
                        this.activeIndex = code3;
                    }else{
                        this.activeIndex = code2;
                    }
                }
            }
        }
    }
  };
</script>
<style scoped lang="scss">
    .el-header {
        padding: 0;
    }
    .el-header,
    .el-footer {
        background-color: #545c64;
        text-align: center;
        line-height: 60px;
    }

    .imageArea {
        width: 100px;
        background-color: #e9eef3;
    }

    .el-aside {
        background-color: #464c5b;
        color: #fff;
        line-height: 200px;
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

    .el-menu-item-group {
        background-color: #657180;
    }

    .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
