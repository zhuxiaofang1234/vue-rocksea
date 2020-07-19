<template>
    <div class="container">
        <div class="main">
            <el-card>
                <el-form :inline="true" class="demo-form-inline">
                    <el-radio-group v-model="queryInfo.projectType" @change="getProjectType">
                        <el-radio :label="10">全部</el-radio>
                        <el-radio :label="2">自检工程</el-radio>
                        <el-radio :label="1">委外工程</el-radio>
                        <el-radio :label="0">未知工程</el-radio>
                    </el-radio-group>
                    <el-form-item>
                        <el-select placeholder="备案状态" clearable v-model="queryInfo.FilingStatus" @change="getFilingStatus">
                            <el-option label="撤销" value="0"></el-option>
                            <el-option label="正常备案" value="1"></el-option>
                            <el-option label="提前介入" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入工程编号\名称" v-model="queryInfo.Filter"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="success" icon="el-icon-circle-plus-outline">添加</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="tableData"
                        height="780"
                        border
                        style="width:100%">
                    <el-table-column
                            label="序号"
                            width="50"
                           :formatter="formatNum"
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
                    >
                    </el-table-column>
                    <el-table-column
                            prop="proWTComName"
                            label="委托单位"
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
                            <el-tag :type="scope.row.acceptStatus | tagClass">{{scope.row.acceptStatus | statusText}}
                            </el-tag>
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
                        :current-page.sync="queryInfo.currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="queryInfo.pageSize"
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
                queryInfo:{
                  projectType:10,
                  FilingStatus:'',
                  Filter:'',
                  pageSize: 10,
                  currentPage: 1, //当前页码
                },
                totalNum:0,
                tableData: [],
            };
        },
        created() {
            this.getProjectList()
        },
        filters: {
            statusText(val) {
                if (val === undefined) return;
                if (val == 0) {
                    return '待受理'
                } else if (val == 1) {
                    return '受理通过'
                } else if (val == 2) {
                    return '受理驳回'
                }
            },
            tagClass(val) {
                if (val === undefined) return;
                if (val == 0) {
                    return 'primary'
                } else if (val == 1) {
                    return 'success'
                } else if (val == 2) {
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
        methods: {
            formatNum(row, column, cellValue, index){
                return this.queryInfo.pageSize * (this.queryInfo.currentPage - 1)+ index + 1;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
            },
            formatTime(row) {
                return row.acceptTime.substring(0, 10);
            },
            getProjectList() {
                let url = '/api/services/app/ProjectCreation/GetPaged';
                let testType = this.queryInfo.projectType === 10 ? '':this.queryInfo.projectType;
                let params = {
                    TestType:testType,
                    FilingStatus:this.queryInfo.FilingStatus,
                    Filter:this.queryInfo.Filter.trim(),
                    MaxResultCount: this.queryInfo.pageSize,
                    SkipCount: (this.queryInfo.currentPage - 1) * this.queryInfo.pageSize
                };
                this.$http.get(url, params).then(res => {
                    let projectListData = res.result.items;
                    this.totalNum = res.result.totalCount;
                    this.tableData = projectListData;
                }, err => {

                })
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            onSubmit() {
                this.getProjectList();
            },
            handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                this.getProjectList();
            },
            handleCurrentChange(val) {
                this.queryInfo.currentPage = val;
                this.getProjectList();
            },
            getProjectType(val) {
                this.queryInfo.projectType = val;
                this.getProjectList();
            },
            getFilingStatus(val) {
                this.queryInfo.FilingStatus = val;
                this.getProjectList();
            }
        }
    };
</script>

<style scoped lang="scss">
    .header {
        margin-bottom: 10px;
    }

    .el-card {
        height: 100%;
        overflow: hidden;
    }

    .el-form.demo-form-inline {
        text-align: left;
        margin-bottom:25px;
    }

    .el-form-item {
        margin-bottom: 0;
    }

    .el-radio-group {
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

    .el-pagination__total {
        vertical-align: middle;
    }
</style>
