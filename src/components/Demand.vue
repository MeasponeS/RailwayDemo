<template>
    <div class="demand">
        <div class="demandHeader" v-if="activeTab !== 3">
            <span>此标注仅对选定日期生效</span>
        </div>
        <div class="content">
            <div class="common" v-if="activeTab === 1">
                <div class="tips" >
                    <el-checkbox-group
                            v-model="checked"
                            class="group">
                        <el-checkbox :class="item.children.length ? 'checkBox': 'checkBox floodCheckBox'" v-for="item in commonList" :label="item.id" :key="item.id" @change="selectedChange('first')">
                            <div class="name">{{item.name}}</div>
                            <div class="floodInput" v-if="!item.children.length && isShowEditDistance(item)">
                                <el-input class="write" v-model="item.value" type="number" />
                                公里（铁路两侧）
                            </div>
                            <el-checkbox-group
                                    v-model="item.checked"
                                    :min="0"
                                    v-if="isChecked(item, checked)"
                                    :max="1">
                                <el-checkbox class="checkBox" v-for="second in item.children" :label="second.id" :key="second.id" @change="selectedChange('second')">
                                    <div class="name">{{second.name}}</div>
                                    <el-checkbox-group
                                            v-model="second.checked"
                                            :min="0"s
                                            v-if="isChecked(second, item.checked)"
                                            :max="1">
                                        <el-checkbox class="checkBox" v-for="third in second.children" :label="third.id" :key="third.id">
                                            <div class="name">{{third.name}}</div>
                                        </el-checkbox>
                                        <el-input v-if="isShowWhite(second.checked)" class="write" v-model="inputValue" />
                                    </el-checkbox-group>
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="input" v-if="activeTab === 2">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="value">
                </el-input>
            </div>
            <div class="history" v-if="activeTab === 3">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="需求名称"
                            align="center"
                            width="280">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            align="center"
                            label="需求类型">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            align="center"
                            label="提交时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="状态">
                        <temptate slot-scope="scope">
                            <span :class="scope.row.status === '已解决'? 'yes status' : 'not status'">{{scope.row.status}}</span>
                        </temptate>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="demandFooter" v-if="activeTab !== 3">
            <el-button @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import {selectData} from "~/Data/demands";
    import {getData, setData} from "~/utils/index";

    export default {
		name: "Demand",
        props: ['type','tab'],
        data () {
			return {
				inputValue: '',
				activeTab: 1,  // 激活的头部模块
                commonList: '', //通用选项列表
				value: '',  // 自行输入
                all: [],
				checked: [],
				checkedSecond: [],
				checkedThird: [],
				tableData: [{
					date: '2020-07-19',
					name: '周边变化彩钢房现场确认',
					status: '预计7天后',
                    type: '定制'
				}, {
					date: '2020-07-17',
					name: '隧道周边情况排查',
					status: '预计3天后',
					type: '定制'
				}, {
					date: '2020-07-16',
					name: '预警信息排查',
					status: '预计24小时内',
					type: '定制'
				},{
					date: '2020-07-12',
					name: '路基形变速率检测',
					status: '已解决',
					type: '测量'
				},
					{
						date: '2020-07-11',
						name: '桥梁累计形变量检测',
						status: '已解决',
						type: '测量'
					}
				]
            }
        },
        computed : {

        },
        watch: {
	        tab (val) {
	        	this.activeTab = val;
            }
        },
        methods: {
	        isShowEditDistance (item) {
		        return this.checked.includes(item.id) && item.isFlood
	        },
	        isShowWhite (item) {
		        let ary = [12,22,32,42];
		        return ary.includes(item[0])
	        },
	        selectedChange (index) {
		        if (index === 'first') {
					this.checkedSecond = [];
                } else if (index === 'second') {
					this.checkedThird = [];
                }
	        },
	        isChecked (item, ary) {
		        return ary.length && ary.includes(item.id)
	        },
	        submit () {
	        	if (this.activeTab === 2) {
	        		if (!this.value) {
				        this.$message.error('请先填写需求');
				        return
                    } else {
				        this.$message.success('提交成功!')
                        this.$emit('close')
                        this.value = '';
                    }
                } else {
                    if (!this.checked.length) {
	                    this.$message.error('请先选择通用选项');
	                    return
                    } else {
	                    this.$message.success('提交成功!')
	                    this.$emit('close')
                    }
                }
            }
        },
        mounted() {
	        let storage = getData(this.type);
            if (!storage) {
            	setData(this.type,this.tableData)
            } else {
            	this.tableData = storage
            }
	        this.commonList = selectData(this.type);
        }
    }
</script>

<style  lang="less">

    .demand{
        width: 67vw;
        box-sizing: border-box;
        padding-left: 56px;
        padding-top: 68px;
        .content{
            .history{
                width: 90%;
                .el-table{
                    font-size: 18px;
                    color: #000;
                    thead{
                        tr{
                            th{
                                .cell{
                                    font-size: 18px;
                                    color: #767676;
                                    margin-bottom: 17px;
                                }
                            }
                        }
                    }
                    tbody{
                        tr{
                            td{
                                padding: 19px 0;
                            }
                        }
                    }
                }
            }
        }
    }
    .status{
        font-size: 18px;
    }
    .yes{
        color: #00934d;
    }
    .not{
        color: #d20000;
    }
    .write{
        margin-left: 6px;
        transform: translateY(-6px);
        input{
            width: 172px;
            height: 37px;
            border: 1px solid #d1d1d1;
            background: #fff;
            box-sizing: border-box;
            padding-left: 10px;
        }
    }
    .demandHeader{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        border: none;
        padding: 0;
        span{
            font-size: 18px;
            color: #767676;
        }
    }
    .el-checkbox__label{
        padding-top: 3px;
    }
    .el-checkbox-group {
        display: flex;
        justify-content: center;
    }
    .group{
        flex-direction: column;
    }


    .el-checkbox{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-right: 20px;
        margin-bottom: 16px;
    }

    .secondTips{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 30px;
        .thirdTips{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 30px;
        }
    }

    .input{
        width: 90%;
    }

    .el-textarea{
        width: 100%;
    }



    .footer{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .name{
        font-size: 18px;
        color: #000;
        margin-bottom: 16px;
    }
    .checkBox{
        .el-checkbox__inner{
            width: 24px!important;
            height: 24px!important;
        }
    }
    .checkBox{
        .is-checked{
            .el-checkbox__inner{
                &:after{
                    width: 6px;
                    height: 14px;
                    left: 8px;
                }
            }
        }
    }

    .el-textarea__inner{
        width: 100%;
        height: 244px;
        background: #f5f5f5
    }

    .demandFooter{
        width: 90%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 18px;
        .el-button{
            width: 152px;
            height: 47px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            background: #1677ff;
            color: #fff;
        }

    }
    .floodCheckBox{
        .el-checkbox__label{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .floodInput{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #000;
            transform: translateY(-6px);
            margin-left: 10px;
            .el-input{
                transform: translateY(0);
                margin-right: 6px;
                input{
                    width: 80px;
                }
            }
        }
    }



</style>
