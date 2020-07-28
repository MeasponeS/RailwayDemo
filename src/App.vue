<template>
    <div id="app">
        <div :class="show? 'in old' : 'old'" v-if="!show" @click="show = true">
            <img src="./assets/imgs/rd_old_back.png" alt="">
<!--     进入页面的大图       -->
        </div>
        <div :class="show? 'in all' : 'all'" v-else >
            <div v-if="!showFlood">
                <div v-for="item in details" :class="'items ' + item" @click="showDetailsDialog(item)"></div>
                <img class="backImage" src="./assets/imgs/rd_back.png" alt="">
                <img src="./assets/imgs/rd_btn1.png" @click="showWatchDialog" alt="" class="btn btn_weather">
                <img src="./assets/imgs/rd_btn2.png" @click="showTodoDialog" alt="" class="btn btn2">
                <!-- 防洪预警-->
                <img src="./assets/imgs/rb_rain_btn1.png" @click="showControlFlood" alt="" class="btn btn_testing">
            </div>
            <div :class="showFlood? 'in all' : 'all'" v-else>
                <div v-for="item in rainDetails" :class="'items ' + item" @click="showDetailsDialog(item)"></div>
                <img v-if="radio==1" class="backImage" src="./assets/imgs/rb_rain1.jpg" alt="">
                <img v-if="radio==2" class="backImage" src="./assets/imgs/rb_rain2.jpg" alt="">
                <img v-if="radio==3" class="backImage" src="./assets/imgs/rb_rain3.jpg" alt="">
                <img v-if="radio==4" class="backImage" src="./assets/imgs/rb_rain4.jpg" alt="">
                <img src="./assets/imgs/rb_jiance_btn.png" @click="closeControlFlood" alt="" class="btn btn_testing">
                <img src="./assets/imgs/rb_weather_btn.png" @click="showWeather" alt="" class="btn btn_weather">
                <img src="./assets/imgs/rd_btn2.png" @click="showRainTodoDialog" alt="" class="btn btn2">
            </div>
        </div>



        <DetailsDialog :type="itemDetails" :visible="detailsDialogVisible" @close="closeDetailsDialog" />
        <AreaDetection :visible="watchDialogVisible" @close="closeWatchDialog" />
        <Todo :visible="toDoDialogVisible" @close="closeTodoDialog" />
        <RainTodo :visible="rainToDoDialogVisible" @close="closeRainTodoDialog"/>
        <Weather :visible="weatherVisible" @close="closeWeather" @changeImg="changeImg"/>
    </div>
</template>

<script>
    import DetailsDialog from "~/components/DetailsDialog";
    import AreaDetection from "~/components/AreaDetection";
    import Todo from "~/components/Todo";
    import RainTodo from "~/components/RainTodo";

    import {setData,getData} from "~/utils/index.js";
    import Weather from "~/components/Weather";

    export default {
		data() {
		    return {
			    detailsDialogVisible: false,   //  详情弹窗
			    itemDetails: '',
			    watchDialogVisible: false,   //  详情弹窗
			    toDoDialogVisible: false,   //  详情弹窗
                rainToDoDialogVisible: false,   //  防洪待办事项
                weatherVisible:false,
                show: false,
                showFlood:false,
                radio:1,
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
                    'shahe',
                    'shigong'
                ],
                rainDetails: [
                    'rain_shuiku',
                    'rain_daihe1',
                    'rain_daihe2',
                    'rain_daihe3',
                    'rain_daihe4',
                    'rain_shahe1',
                    'rain_shahe2',
                    'rain_shahe3',
                    'rain_shahe4',
                    'rain_jiyunhe1',
                    'rain_jiyunhe2',
                    'rain_jiyunhe3',
                    'rain_jiyunhe4',
                    'rain_jiyunhe5',
                    'rain_tafang'

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
            },
            showControlFlood () {
                this.showFlood= true;
            },
            closeControlFlood () {
                this.showFlood= false;
                this.show=true;
            },
            showRainTodoDialog () {
                this.rainToDoDialogVisible = true;
            },
            closeRainTodoDialog () {
                this.rainToDoDialogVisible = false;
            },
            showWeather () {
                this.weatherVisible = true;
            },
            closeWeather () {
                this.weatherVisible = false;
            },
            changeImg(value){
                this.radio=value;
                console.log(this.radio)
            }
		},
        components: {
            Weather,
	        DetailsDialog,
            Todo,
            AreaDetection,
            RainTodo
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
        .btn3{
            top: 2.5vw;
            left: 32vw;
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
        // 以下是防洪预警CSS
        .rain_shuiku{
            width: 190px;
            height: 210px;
            left: 77%;
            top: 8%;
        }
        .rain_daihe1{
            width: 240px;
            height: 220px;
            left: 52.5%;
            top: 0.8%;
        }
        .rain_daihe2{
            width: 90px;
            height: 220px;
            left: 58%;
            top: 26.5%;
        }
        .rain_daihe3{
            width: 90px;
            height: 130px;
            left: 62%;
            top: 48%;
            transform: rotate(-10deg);
        }
        .rain_daihe4{
            width: 200px;
            height: 60px;
            left: 67%;
            top: 60%;
        }
        .rain_shahe1{
            width: 79px;
            height: 87px;
            left: 40.5%;
            top: 20%;
        }
        .rain_shahe2{
            width: 102px;
            height: 87px;
            left: 36.5%;
            top: 29%;
        }
        .rain_shahe3{
            width: 92px;
            height: 184px;
            left: 34.8%;
            top: 37%;
        }
        .rain_shahe4{
            width: 74px;
            height: 65px;
            left: 33%;
            top: 56%;
        }
        .rain_jiyunhe1{
            width: 119px;
            height: 65px;
            left: 4%;
            top: 31%;
        }
        .rain_jiyunhe2{
            width: 78px;
            height: 65px;
            left: 9.5%;
            top: 37%;
        }
        .rain_jiyunhe3{
            width: 74px;
            height: 109px;
            left: 11%;
            top: 43%;
        }
        .rain_jiyunhe4{
            width: 90px;
            height: 65px;
            left: 14%;
            top: 54%;
        }
        .rain_jiyunhe5{
            width: 74px;
            height: 285px;
            left: 16.5%;
            top: 60%;
        }
        .rain_tafang{
            width: 60px;
            height: 60px;
            //background: #1677ff;
            left: 71%;
            top: 19%;
        }
        .shigong{
            width: 150px;
            height: 130px;
            //background: yellow;
            left: 53%;
            top: 24%;
        }
        .btn_testing{
            top: 69%;
            right: 5vw;
        }
        .btn_weather{
            top: 77%;
            right: 5vw;
        }

    }
</style>
