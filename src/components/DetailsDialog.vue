<template>
    <div class="title">
        <el-dialog
                :visible.sync="show"
                width="78%"
                @close="cancel"
                top="8vh"
                center>
            <div class="detailsContent">
                <div class="tabHeader header">
                    <div class="headerImg">
                        <img src="../assets/imgs/rd_logo.png" alt="">
                    </div>
                    <ul class="tabs" v-if="active === 3">
                        <li v-for="item in headers" @click="changeTab(item.id, 'header')" :class="header === item.id ? 'active' : ''">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="content">
                    <ul class="tabs">
                        <li v-for="item in tabs" @click="changeTab(item.id, 'active')" :class="active === item.id ? 'active' : ''">
                            {{item.name}}
                        </li>
                    </ul>
                    <Info :infoType="infoType" v-if="active === 1" />
                    <History :type="type" @changeTab="changeTab" v-if="active === 2" />
                    <Demand :type="infoType" @close="cancel" :tab="header" v-if="active === 3"/>
                </div>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    import Demand from "~/components/Demand";
    import History from "~/components/History";
    import Info from "~/components/Info";
	export default {
		name: "Header",
        props: ['visible','type'],
        data () {
		    return {
			    active: 1,
                show: false,
                header: 1,
			    infoType: '',
                tabs: [
                    {name: '基本信息', id: 1},
                    {name: '历史结果', id: 2},
                    {name: '新增需求', id: 3}
                ],
			    headers: [
				    {name: '通用选项', id: 1},
				    {name: '手动输入', id: 2},
				    {name: '历史需求', id: 3}
			    ]
            }
        },
        watch: {
	        visible (val) {
	        	this.show = val;
            },
            type (val) {
	            this.infoType = val;
            }
        },
        methods: {
	        cancel () {
	        	this.header = 1;
	        	this.active = 1;
	            this.$emit('close')
            },
	        confirm () {
                this.cancel()
            },
	        changeTab (id, type) {
	        	if (type === 'active') {
	        		this.header = 1
                }
	        	this[type] = id;
            }
        },
        mounted() {
        },
		components: {
			Demand, History,Info
        }
	}
</script>

<style lang="less">
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .el-dialog__wrapper{
        overflow: hidden;
    }
    .el-dialog__body{
        padding: 0!important;
        overflow: hidden;
    }
    .el-dialog__header{
        padding: 0!important;
    }
    .header{
        width: 100%;
        height: 90px;
        padding: 0 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 2px solid #edf2f8;
        padding-left: 44px;
    }

    .tabHeader{
        .headerImg{
            img{
                width: 90px;
                height: 56px;
            }
        }
        ul{
            height: 84px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-top: 20px;
            box-sizing: border-box;
            margin-left: 100px;
            li{
                width: 192px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                cursor: pointer;
                font-size: 20px;
            }
            .active{
                font-weight: bold;
                color: #1677ff;
                background: #fff;
                position: relative;
                &:before{
                    content: '';
                    width: 80px;
                    height: 3px;
                    background: #1677ff;
                    position: absolute;
                    bottom: -2px;
                }
            }
        }
    }

    .content{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        ul{
            width: 206px;
            background: #edf2f8;
            height: 74vh;
            border-right: 1px solid #edf2f8;
            li{
                width: 100%;
                height: 84px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: #666;
                font-size: 22px;
            }
            .active{
                font-weight: bold;
                color: #1677ff;
                background: #fff;
                position: relative;
                &:before{
                    content: '';
                    width: 12px;
                    height: 84px;
                    background: #1677ff;
                    position: absolute;
                    left: 0;
                }
            }
        }

    }
</style>
