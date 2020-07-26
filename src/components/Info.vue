<template>
    <div class="infoContent">
        <div class="infoImg">
            <img :src="imgUrl" alt="">
        </div>
    </div>
</template>

<script>
    import {baseImages} from "~/Data/baseInfo";

    export default {
		name: "Info",
        props: ['infoType'],
        data () {
			return {
				imgUrl: ''
            }
        },
        watch: {
	        infoType (val) {
		        this.getImage(val)
            }
        },
        methods :{
            getImage (type) {
            	this.imgUrl = baseImages[type]
            }
        },
        mounted() {
	        this.getImage(this.infoType)
        }
	}
</script>

<style scoped lang="less">
    .infoContent{
        width: 67vw;
        height: 74vh;
        box-sizing: border-box;
        overflow: hidden;
        padding-top: 64px;
        padding-bottom: 100px;
        .infoImg{
            height: 100%;
            overflow: auto;
            img{
                width: 100%;
                height: auto;
            }
        }

    }
</style>
