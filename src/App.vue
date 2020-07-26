<template>
    <div id="app">
<!--        <el-button @click="showDetailsDialog">点我</el-button>-->


        <div :class="show? 'in old' : 'old'" v-if="!show" @click="show = true">
            <img src="./assets/imgs/rd_old_back.png" alt="">
<!--     进入页面的大图       -->
        </div>
        <div :class="show? 'in all' : 'all'" v-else >
            <div v-for="item in details" :class="'items ' + item" @click="showDetailsDialog(item)"></div>
            <img class="backImage" src="./assets/imgs/rd_back.jpg" alt="">
            <img src="./assets/imgs/rd_btn1.png" @click="showWatchDialog" alt="" class="btn btn1">
            <img src="./assets/imgs/rd_btn2.png" @click="showTodoDialog" alt="" class="btn btn2">
        </div>


        <DetailsDialog :type="itemDetails" :visible="detailsDialogVisible" @close="closeDetailsDialog" />
        <AreaDetection :visible="watchDialogVisible" @close="closeWatchDialog" />
        <Todo :visible="toDoDialogVisible" @close="closeTodoDialog" />
    </div>
</template>

<script>
    import DetailsDialog from "~/components/DetailsDialog";
    import AreaDetection from "~/components/AreaDetection";
    import Todo from "~/components/Todo";

    import {setData,getData} from "~/utils/index.js";

    export default {
		data() {
		    return {
			    detailsDialogVisible: false,   //  详情弹窗
			    itemDetails: '',
			    watchDialogVisible: false,   //  详情弹窗
			    toDoDialogVisible: false,   //  详情弹窗
                show: false,

                // 设置长图拖动
                x: 0,
			    scrollLeft: 0,
                dragging: false,
                details: [
                	'daihe',
                    'guanlianzishan',
                    'hangushuichang',
                    'hanxinzhuangsuidao',
                    'hulushansuidao',
                    'jiyunheqiaoliang',
                    'liangshan',
                    'matouyusuidao',
                    'qijialinerhao',
                    'shahe'
                ]
            }
        },
        mounted() {
            let storage = getData('jiyunheqiaoliang');
	        console.log(storage, '======>>>>>');
        },
		methods: {

			showDetailsDialog (item) {
				this.itemDetails = item;
                this.detailsDialogVisible = true;
            },
			showWatchDialog () {
				this.watchDialogVisible = true;
            },
			closeWatchDialog () {
				this.watchDialogVisible = false;
			},
            showTodoDialog () {
	            this.toDoDialogVisible = true;
            },
			closeTodoDialog () {
				this.toDoDialogVisible = false;
			},
			closeDetailsDialog () {
				this.detailsDialogVisible = false;
            }
		},
        components: {
	        DetailsDialog,
            Todo,
            AreaDetection
        }
	}
</script>

<style lang="less">
    body{
        margin: 0;
    }
    #app {
        font-family: Helvetica, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
    }

    .in {
        animation: clipRectSpIn .6s;
    }
    .out{
        animation: clipRectSpOut .6s;
    }
    @keyframes clipRectSpIn {
        0%   {
            clip-path: polygon(50% 20%, 50% 50%, 20% 50%, 50% 50%, 50% 80%, 50% 50%, 80% 50%, 50% 50%);
        }
        100% {
            clip-path: polygon(50% 0%, 0% 0%, 0% 50%, 0% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%);
        }
    }
    .old{
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f2f2f2;
        img{
            width: 92vw;
            height: auto;
        }
    }

    .all{
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        display: flex;
        background: #f2f2f2;
        justify-content: center;
        align-items: center;
        position: relative;
        .backImage{
            background: #fff;
            width: 92vw;
            height: auto;
        }
        .btn{
            width: 11vw;
            height: auto;
            position: absolute;
            bottom:  51px;
            right: 5vw;
            cursor: pointer;
            &:hover{
                width: 11.5vw;
                height: auto;
                transition: all 0.3s;
            }
        }
        .btn1{
            right: 16vw;
        }
        .items {
            position: absolute;
            opacity: 0.5;
            cursor: pointer;
            //background: red;
        }
        .jiyunheqiaoliang{
            width: 180px;
            height: 70px;
            left: 15%;
            top: 70%;
        }
        .daihe{
            width: 70px;
            height: 100px;
            left: 84.5%;
            top: 16.5%;
        }
        .shahe{
            width: 60px;
            height: 110px;
            left: 47%;
            top: 19%;
        }
        .qijialinerhao{
            width: 62px;
            height: 30px;
            left: 35.3%;
            top: 28%;
            transform: rotate(-15deg);
        }
        .hanxinzhuangsuidao{
            width: 50px;
            height: 26px;
            left: 41.5%;
            top: 27%;
            transform: rotate(-6deg);
        }
        .guanlianzishan{
            width: 90px;
            height: 90px;
            left: 36.6%;
            top: 17%;
            transform: rotate(-15deg);
        }
        .liangshan{
            width: 90px;
            height: 90px;
            left: 68%;
            top: 15.6%;
        }
        .matouyusuidao{
            width: 62px;
            height: 30px;
            left: 66.7%;
            top: 25.2%;
            transform: rotate(-2deg)
        }
        .hulushansuidao{
            width: 62px;
            height: 30px;
            left: 72.6%;
            top: 26%;

        }
        .hangushuichang{
            width: 200px;
            height: 100px;
            left: 20.2%;
            bottom: 9%;
        }
    }
</style>
