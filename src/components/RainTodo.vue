<template>
    <el-dialog
        :visible.sync="show"
        width="70%"
        @close="cancel"
        top="4vh"
        center>
        <h3 class="rainTodoTitle">待办事项列表</h3>
        <div class="rainTodoTable">
            <el-table
                    :data="RainTableData"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="监测河流"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="distance"
                        label="河流宽度"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="检测类型">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="监测内容">
                </el-table-column>
                <el-table-column
                        prop="times"
                        label="预计时效">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </el-dialog>
</template>

<script>
	import {getData, setData} from "~/utils/index.js";

	export default {
		name: "RainTodo",
		props: ['visible'],
        data () {
            return {
            	show: false,
	            RainTableData: [
	            	{
                        name: '沙河',
                        distance: '20—30米',
                        type: '河流',
                        content: '形变速率',
                        times: '24小时内完成',
                        id: 1
                    },
                    {
                        name: '汗枯水厂',
                        distance: '5-7米',
                        type: '湖泊',
                        content: '形变速率、累计形变量',
                        times: '7天内完成',
                        id: 2
                    },
		            {
			            name: '戴河',
			            distance: '32-53米',
			            type: '河流',
			            content: '形变速率、累计形变量、环境安全',
			            times: '7天内完成',
                        id: 3
		            },

                ]
            }
        },
		watch: {
			visible (val) {
				this.show = val;
				if (val) {
					let storage = getData('totalData');
					if (!storage) {
						setData('totalData',this.tableData)
					} else {
						this.tableData = storage;
					}
                }
			}
		},
        methods: {
	        cancel () {
		        this.$emit('close')
	        },
	        deleteItem (scope) {
		        this.tableData = getData('totalData').filter(item => item.id !== scope.row.id)
                setData('totalData', this.tableData)
	        }
        },
        mounted() {

        }
	}
</script>

<style  lang="less">
    .rainTodoTitle{
        width: 100%;
        height: 12.3vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #030303;
        margin: 0;
    }
    .rainTodoTable{
        width: 100%;
        height: 74vh;
        overflow: auto;
        padding: 0 46px;
        box-sizing: border-box;
        margin-bottom: 52px;
        thead{
            tr{
                th{
                    background: #ededed;
                    font-size: 18px;
                    color: #000;
                    padding: 18px 0;
                }
            }
        }
        tbody{
            tr{
                td{
                    padding: 23px 0;
                }
            }
        }
    }
</style>
