<template>
    <div class="container" ref="container">
        <div class="main">
            <el-card>
                <el-form :inline="true" class="demo-form-inline search-form">
                    <el-radio-group class="projectType" v-model="queryInfo.projectType" @change="getProjectType">
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
                        <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加</el-button>
                    </el-form-item>
                </el-form>
                <div class="wrapper">
                    <el-table
                            :data="tableData"
                             max-height="100%"
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
                </div>
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

        <!--添加工程-->
        <el-dialog title="添加工程信息" :visible.sync="dialogFormVisible" width="90%" top="2vh" class="projectFrom">
            <div class="map-wrapper">

            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
                <el-form-item label="工程名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="建设单位" prop="name">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="委托单位" prop="name">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="勘察单位" prop="name">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="设计单位" prop="name">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="承建单位" prop="name">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="施工单位" prop="name">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="监理单位" prop="name">
                    <el-input></el-input>
                </el-form-item>
                <!--提前介入、监督编号、监督部门-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="是否提前介入" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="监督编号">
                            <el-input v-model="ruleForm.delivery"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="监督部门">
                            <el-input v-model="ruleForm.delivery"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!--提交介入原因-->
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="提交介入原因" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--工程地址-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="工程地址" prop="name">
                            <el-cascader
                                    v-model="value"
                                    :options="options"
                                    @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="详细地址">
                            <el-input v-model="ruleForm.delivery"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--结构形式、层数、总桩数-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="结构形式" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="层数(层)" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总桩数" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--建筑面积、基底面积 开工日期-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item prop="region">
                            <span slot="label">建筑面积(m<sup>2</sup>)</span>
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="region">
                            <span slot="label">基底面积(m<sup>2</sup>)</span>
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="开工日期" prop="region">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--地基类型、地基设计标高、地基承载力特征值-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="地基类型" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="地基设计标高(m)" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="地基承载力特征值(kPa)" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--基桩类型、砼强度等级、桩端持力层-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="基桩类型" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="砼设计强度等级" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="桩端持力层" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--设计桩长、桩径、压板面积-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="设计桩长(m)" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="桩径(mm)" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="region">
                            <span slot="label">压板面积(m<sup>2</sup>)</span>
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--承载力特征值，要求最大试验荷载-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-select class="dzczl" v-model="dzczltzz" placeholder="请选择">
                                    <el-option
                                            v-for="item in dzczltzzArr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled">
                                    </el-option>
                                </el-select>

                            <el-input  class="dzczl-input"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="要求最大荷载(kN)" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--现场联系人，联系电话、现场联系人邮箱-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="现场联系人" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="现场联系人邮箱" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--建设单位联系人，联系电话、建设单位联系人邮箱-->
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="建设单位联系人" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="建设单位联系人邮箱" prop="region">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--备注说明-->
                <el-form-item label="备注说明" prop="name">
                    <el-input type="textarea" v-model="ruleForm.delivery"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "ProjectCreation",
        data() {
            return {
                dzczltzz:'',
                dzczltzzArr: [{
                    value: '1',
                    label: '设计单桩承载力特征值(kN)'
                }, {
                    value: '2',
                    label: '设计单桩抗拔承载力特征值(kN)',
                    disabled: true
                }, {
                    value: '3',
                    label: '设计单桩抗拔承载力设计值(kN)',
                }, {
                    value: '4',
                    label: '设计单桩抗拔承载力标准值(kN)',
                }, {
                    value: '5',
                    label: '单桩承载力值(kN)'
                },
                    {
                        value: '6',
                        label: '单桩承载力容许值(kN)'
                    },
                    {
                        value: '7',
                        label: '基础锚杆抗拔承载力特征值(kN)'
                    },
                    {
                        value: '8',
                        label: '设计抗拔承载力设计值(kN)'
                    },

                ],
                queryInfo:{
                  projectType:10,
                  FilingStatus:'',
                  Filter:'',
                  pageSize: 10,
                  currentPage: 1, //当前页码
                },
                totalNum:0,
                tableData: [],
                dialogFormVisible: false,
              ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
              rules: {
                name: [
                  { required: true, message: '请输入活动名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                  { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                  { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                  { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                  { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                  { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                  { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
              },
              formLabelWidth: '120px',
                value: [],
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }]
            };
        },
        created() {
            this.getProjectList()
        },
        mounted() {
            console.log(window.getComputedStyle(this.$refs.container).height)
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
            },
          submitFrom(formName){
              this.$refs[formName].valiate((valid)=>{
                if (valid) {
                  alert('submit!');
                } else {
                  console.log('error submit!!');
                  return false;
                }
              })
          },
            handleChange(value) {
                console.log(value);
            }

        }
    };
</script>

<style scoped lang="scss">
    .header {
        margin-bottom: 10px;
    }
    .wrapper{
        height: calc(100% - 140px);
    }

    .el-card {
        height: 100%;
        overflow: hidden;
    }

    .search-form.demo-form-inline {
        text-align: left;
        margin-bottom:25px;
    }

    .search-form .el-form-item {
        margin-bottom: 0;
    }

    .projectType.el-radio-group {
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
    .el-dialog{
        position:relative;
        .map-wrapper{
            position:absolute;
            width:380px;
            height:400px;
            top:600px;
            right:25px;
            border:1px solid #DCDFE6
        }
    }
    .input-wrap{
        display: inline-block;
        vertical-align: middle
    }
    .el-select.dzczl{
        width:260px;
        margin-right:10px;
        margin-left:70px;
    }
    .el-input.dzczl-input {
        width: calc(100% - 342px);
    }

</style>
