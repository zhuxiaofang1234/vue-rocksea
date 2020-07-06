<template>
       <el-card>
           <el-table
                   :data="tableData"
                   height="250"
                   border
                   style="width: 100%">
               <el-table-column
                       prop="date"
                       label="日期"
                       width="180">
               </el-table-column>
               <el-table-column
                       prop="name"
                       label="姓名"
                       width="180">
               </el-table-column>
               <el-table-column
                       prop="address"
                       label="地址">
               </el-table-column>
           </el-table>
       </el-card>
    </template>
<script>
  export default {
    name: "ProjectCreation",
    data() {
      return {
        tableData: [{
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }]
      };
    }
  };
</script>

<style scoped lang="scss">
    .el-card{
        height:100%;
        overflow: hidden;
    }
    .box{
        height:300px;
        width:300px;
        border: 1px solid #222;
    }
    .inner-box{
        margin:0 20px;
        width:100%;
        height:200px;
        background: greenyellow;
    }

</style>