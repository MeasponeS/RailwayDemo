<template>
    <el-dialog
            :visible.sync="showArea"
            width="70%"
            @close="cancel"
            top="4vh"
            center>
        <div class="area">
            <div class="areaHeader">区域监测需求提交</div>
            <div class="areaContent">
                <div class="areaLeft">
                    <el-select v-model="value" placeholder="请选择服务路段">
                        <el-option
                                v-for="item in options"
                                :key="item.label"
                                :label="item.label"
                                :value="item.label">
                        </el-option>
                    </el-select>
                    <div class="inputs">
                        <el-input placeholder="请输入起点" v-model="start"/>
                        <el-input placeholder="请输入终点" v-model="end" />
                    </div>
                    <h4>请选择监测内容：</h4>
                    <el-checkbox class="checkBox" :disabled="true" :checked="true"><span class="name">形变速率</span></el-checkbox>
                    <el-checkbox class="checkBox" v-model="leijixingbianliang"><span class="name">累计变形量</span></el-checkbox>
                    <el-checkbox class="checkBox" v-model="huanjinganquan"><span class="name">环境安全</span></el-checkbox>
                </div>
                <div class="areaRight">
                    <img src="../assets/imgs/rd_thumbil.png" alt="">
                </div>
            </div>
            <div class="bottom">
                <el-button class="submit" @click="submit">提交</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
	import {getData, setData} from "~/utils/index";

	const cityOptions = ['形变速率', '累计变形量', '环境安全'];
	export default {
		name: "AreaDetection",
		props: ['visible'],
        data () {
            return {
	            showArea: false,
	            options: [{
		            value: '1',
		            label: '滨海北至唐山路段'
	            }, {
		            value: '2',
		            label: '唐山至滦河路段'
	            }, {
		            value: '3',
		            label: '滦河至北戴河路段'
	            }, {
		            value: '4',
		            label: '北戴河至秦皇岛路段'
	            }],
	            value: '',
	            checkedCities: ['形变速率'],
	            cities: cityOptions,
	            leijixingbianliang: false,
                huanjinganquan: false,
                start: '',
                end: ''
            }
        },
		watch: {
			visible (val) {
				this.showArea = val;
			}
		},
        methods: {
	        cancel () {
		        this.$emit('close')
	        },
	        submit(){
	        	if (!this.value) {
	        		this.$message.error('请选择服务路段')
                    return
                }
		        if (!this.start) {
			        this.$message.error('请输入起点')
			        return
		        }
		        if (!this.end) {
			        this.$message.error('请输入终点')
			        return
		        }
		        console.log(this, '======>>>>>>>>')
                let storage = getData('totalData');
		        let content = '形变速率';
		        content = this.leijixingbianliang ? content + '、累计形变量': content;
		        content = this.huanjinganquan ? content + '、环境安全' : content
		        let obj = {
                    name: this.value,
                    distance: `${this.start}-${this.end}`,
                    content,
                    type: '测量',
                    times: '待完成',
                    id: storage[storage.length - 1].id + 1
                }
		        storage.unshift(obj);
		        setData('totalData', storage)
		        this.$message.success('提交成功');
		        setTimeout(()=>{
			        this.value = '';
			        this.start = '';
			        this.end = '';
			        this.cancel()
                }, 1000)
            }
        }
	}
</script>

<style lang="less">
    .area{
        box-sizing: border-box;
        padding: 0 108px;
        .areaHeader{
            width: 100%;
            height: 122px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: #030303;
        }
        .areaContent{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .areaRight{
                img{
                    width: 384px;
                    height: 427px;
                }
            }
            .areaLeft{
                width: 384px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                .el-select{
                    width: 100%;
                    height: 32px;
                    font-size: 14px;
                    margin-bottom: 20px;
                }
                .inputs{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 72px;
                    .el-input{
                        width: 156px;
                        height: 32px;
                    }
                }
                h4{
                    margin: 0;
                    font-weight: normal;
                    font-size: 18px;
                    color: #767676;
                    margin-bottom: 44px;
                }
                .el-checkbox-group{
                    display: flex;
                    flex-direction: column;

                }
                .el-checkbox{
                     display: flex;
                     justify-content: flex-start;
                     align-items: center;
                     margin-bottom: 44px;
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
    }
</style>
