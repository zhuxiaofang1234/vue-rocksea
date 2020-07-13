<template>
    <div class="container">
        <div class="header">
            <el-card>
                <el-form :inline="true" class="demo-form-inline">
                    <el-radio-group>
                        <el-radio :label="">全部</el-radio>
                        <el-radio :label="6">自检工程</el-radio>
                        <el-radio :label="9">委外工程</el-radio>
                        <el-radio :label="10">未知工程</el-radio>
                    </el-radio-group>
                    <el-form-item>
                        <el-select  placeholder="备案状态"  clearable >
                            <el-option label="撤销" value="0"></el-option>
                            <el-option label="正常备案" value="1"></el-option>
                            <el-option label="提前介入" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入工程编号\名称" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="success" icon="el-icon-circle-plus-outline">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div class="main">
            <el-card>
                <el-table
                        :data="tableData"
                        height="680"
                        border
                        style="width:100%">
                    <el-table-column
                            label="序号"
                            type="index"
                            width="50"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="projectCode"
                            label="工程编号"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            prop="jdCode"
                            label="监督编号"
                            width="140"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="projectName"
                            label="工程名称"
                            width="300"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="projectAddress"
                            label="工程地址"
                            width="300"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="proWTComName"
                            label="委托单位"
                            width="300"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="acceptTime"
                            label="受理时间"
                            width="120"
                            :formatter="formatTime"
                    >
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.acceptTime}}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.acceptTime.substring(0, 10)}}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="acceptStatus"
                            label="受理状态"
                            width="100"
                    >
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.acceptStatus | tagClass">{{scope.row.acceptStatus | statusText}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="filingStatus"
                            label="备案状态"
                            width="80"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.filingStatus | filingStatusText}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                        <template slot-scope="scope">
                            <el-row>
                                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                                <el-button type="success" icon="el-icon-check" circle></el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        background
                        layout="total,sizes, prev, pager, next"
                        :total="totalNum">
                </el-pagination>
            </el-card>
        </div>
    </div>
    </template>
<script>
  export default {
    name: "ProjectCreation",
    data() {
      return {
        totalNum: 0,
        pageSize:10,
        currentPage: 1, //当前页码
        tableData: []
      };
    },
    created(){
        this.getProjectList()
    },
    filters: {
      statusText(val) {
        if (val === undefined) return;
        if (val == 0) {
          return '待受理'
        } else if (val == 1) {
          return '受理通过'
        }else if(val==2){
          return '受理驳回'
        }
      },
      tagClass(val) {
        if (val === undefined) return;
        if (val == 0) {
          return 'primary'
        } else if (val == 1) {
          return 'success'
        } else if(val==2){
          return 'danger'
        }
      },
      // 状态显示转换
      filingStatusText(status) {
        const statusMap = {
          0: '撤销',
          1: '正常备案',
          2: '提前介入'
        };
        return statusMap[status]
      }
    },
    methods:{
        formatTime(row){
            return row.acceptTime.substring(0, 10);
        },
      getProjectList(){
        let url = '/api/services/app/ProjectCreation/GetPaged';
        let params ={
            MaxResultCount:this.pageSize,
            SkipCount:(this.currentPage -1)*this.pageSize
        };
        this.$http.get(url,params).then(res=>{
         let projectListData = res.result.items;
          this.totalNum = res.result.totalCount;
          this.tableData = projectListData;
        },err=>{

        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      onSubmit(){
        console.log('submit!')
      },
      handleSizeChange(val){
          this.pageSize = val;
          this.getProjectList();
      },
      handleCurrentChange(val) {
            this.currentPage = val;
           this.getProjectList();
      }
    }
  };
</script>

<style scoped lang="scss">
    .header{
        margin-bottom:10px;
    }
    .el-card{
        height:100%;
        overflow: hidden;
    }
    .el-form.demo-form-inline{
        text-align:left;
    }
    .el-form-item{
        margin-bottom: 0;
    }
    .el-radio-group{
        margin-right: 30px;
        margin-top: 14px;
    }
    .el-pagination {
        white-space: nowrap;
        padding: 2px 5px;
        color: #303133;
        font-weight: 700;
        float: right;
        margin: 20px 0;
    }
    .el-pagination__total{
        vertical-align: middle;
    }
</style>
