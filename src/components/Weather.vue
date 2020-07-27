<template>
    <el-dialog
        :visible.sync="show"
        width="70%"
        @close="cancel"
        top="4vh"
        center>
        <h3 class="rainTodoTitle">天气预测</h3>
        <div class="rainTodoTable">
            <h4>请选择监测内容：</h4>
            <el-radio-group v-model="radio">
                <el-radio :label="1">1-3天</el-radio><br>
                <el-radio :label="2">3-5天</el-radio><br>
                <el-radio :label="3">5-7天</el-radio><br>
                <el-radio :label="4">7-15天</el-radio><br>
            </el-radio-group>
            <div class="bottom">
                <el-button class="submit" @click="submit">提交</el-button>
            </div>
        </div>


    </el-dialog>
</template>

<script>
    import {getData, setData} from "~/utils/index.js";

    export default {
        name: "Weather",
        props: ['visible'],
        data () {
            return {
                show: false,
                radio: 1
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
            },
            submit(){
                this.$emit("changeImg",this.radio);
                this.show=false
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

    .bottom{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 54px 0 ;
        .submit{
            width: 260px;
            height: 47px;
            background: #1677ff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 6px;
        }
    }


</style>
