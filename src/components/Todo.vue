<template>
    <el-dialog
        :visible.sync="show"
        width="70%"
        @close="cancel"
        top="4vh"
        center>
        <h3 class="todoTitle">待办事项列表</h3>
        <div class="todoTable">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="监测路段"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="distance"
                        label="监测里程"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="监测类型">
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
		name: "Todo",
		props: ['visible'],
        data () {
            return {
            	show: false,
	            tableData: [
	            	{
                        name: '津秦线唐山至滦河区间',
                        distance: 'k27+550-+750',
                        type: '路基',
                        content: '形变速率',
                        times: '24小时内完成',
                        id: 1
                    },
                    {
                        name: '津秦线唐山至滦河区间',
                        distance: 'k162+835-K163+098',
                        type: '桥梁',
                        content: '形变速率、累计形变量',
                        times: '7天内完成',
                        id: 2
                    },
		            {
			            name: '津秦线滦河至北戴河区间',
			            distance: 'k879+280-+330',
			            type: '隧道',
			            content: '形变速率、累计形变量、环境安全',
			            times: '7天内完成',
                        id: 3
		            },
		            {
			            name: '津秦线滦河至北戴河区间',
			            distance: 'k883+230-+280',
			            type: '综合',
			            content: '形变速率、累计形变量',
			            times: '7天内完成',
                        id: 4
		            },
		            {
			            name: '津秦线唐山至滦河区间',
			            distance: 'k162+780',
			            type: '桥梁',
			            content: '形变速率、累计形变量',
			            times: '7天内完成',
                        id: 5
		            },
		            {
			            name: '津秦线唐山至滦河区间',
			            distance: 'k162+835-K163+098',
			            type: '桥梁',
			            content: '形变速率',
			            times: '7天内完成',
                        id: 6
		            },
		            {
			            name: '津秦线滦河至北戴河区间',
			            distance: 'k883+230-+280',
			            type: '综合',
			            content: '形变速率、累计形变量',
			            times: '7天内完成',
                        id: 7
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
    .todoTitle{
        width: 100%;
        height: 12.3vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #030303;
        margin: 0;
    }
    .todoTable{
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
