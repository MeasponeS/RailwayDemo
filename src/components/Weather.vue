<template>
    <el-dialog
            :visible.sync="show"
            width="30%"
            @close="cancel"
            center>
        <h3 class="rainTodoTitle">天气预测</h3>
        <div class="rainTodoTable1">
            <h4>请选择预测天气时间：</h4>
            <el-radio-group v-model="radio">
                <el-radio :label="1">今天</el-radio><br>
                <el-radio :label="2">三天后</el-radio><br>
                <el-radio :label="3">七天后</el-radio><br>
                <el-radio :label="4">十四天后</el-radio><br>
            </el-radio-group>
            <div class="bottom">
                <el-button class="submit" @click="cancel">取消</el-button>
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
        height: 7.3vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #030303;
        margin: 0;
        border-bottom: 1px solid #f2f2f2;
    }
    .rainTodoTable1{
        width: 100%;
        overflow: auto;
        padding: 0 26px;
        box-sizing: border-box;
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
        .el-radio-group{
            padding: 0 20px;
            .el-radio{
                margin-bottom: 10px;
            }
        }
    }

    .bottom{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 ;
        .submit{
            width: 120px;
            height: 39px;
            background: #1677ff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 6px;
            &:first-child{
                background: #fff;
                color: #1677ff;
                border-color: #1677ff;
            }
        }
    }


</style>