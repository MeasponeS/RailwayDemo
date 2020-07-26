<template>
    <div class="historyContent">
        <div class="historyInfo">
            <el-select v-model="value" placeholder="请选择" @change="dateChange">
                <el-option
                        v-for="item in options"
                        :key="item.date"
                        :label="item.date"
                        :value="item.date">
                </el-option>
            </el-select>
            <div class="content">
                <img :src="innerContentUrl" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import {historyInfo} from "~/Data/history";
    import _ from 'lodash'
    export default {
		name: "History",
        props: ['type'],
        data () {
		    return {
		    	value: '',
			    options: [],
			    innerContentUrl: ''
            }
        },
        watch : {
		    type (val) {
		    	this.getInfo(val)
            }
        },
        mounted() {
			this.getInfo(this.type)
        },
	    methods: {
		    getInfo (type) {
		    	let asset = type + 'Img'
		    	let item = historyInfo[asset];
			    this.value = item[0].date;
			    this.innerContentUrl = item[0].img;
			    this.options = item;
            },
	        dateChange (e) {
		        if (e === '新增需求') {
		        	this.$emit('changeTab',3, 'active');
		        	return
                }
		        // _.map(history, item=> {
		        // 	if (item.date === e) {
		        // 		this.innerContentUrl = item.img
                //     }
                // })
	        }
        }
	}
</script>

<style scoped lang="less">
    .historyContent{
        width: 67vw;
        .el-select{
            width: 332px;
            margin-left: 5vw;
            margin-top: 40px;
        }
        height: 74vh;
        box-sizing: border-box;
        overflow: auto;
        img{
            width: 100%;
            height: auto;
        }
    }
</style>
