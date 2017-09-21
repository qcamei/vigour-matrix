<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">处理状态</span>
                <input slot="right" :showClearIcon="false"  v-model="postInfo.taskStatus" style="color: #e65966;" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">申报概述</span>
                <input slot="right" :showClearIcon="false"  v-model="postInfo.title" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系人</span>
                <input slot="right" :showClearIcon="false"  v-model="postInfo.contacts" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系电话</span>
                <input slot="right" :showClearIcon="false" required readonly
                       v-model="postInfo.phone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">位置</span>
                <input slot="right" required :showClearIcon="false" readonly
                       v-model="postInfo.position">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">设备类型</span>
                <input slot="right" required :showClearIcon="false" readonly
                       v-model="postInfo.deviceType">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="详细描述">
            <yd-cell-item>
                <yd-textarea
                    style="text-align: left;font-size: 0.26rem; color: #24242c;"
                    slot="right"
                    maxlength="140"
                    :readonly="true"
                    v-html="postInfo.description">
                </yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <!-- 图片上传 -->
        <div v-if="postInfo && postInfo.taskImageUri && postInfo.taskImageUri.length">
            <div class="photo-tit">
                <span class="text1">现场图片</span>
            </div>
            <!--<ul class="upload-list">-->
                <!--<li v-for="(image, idx) in postInfo.taskImageUri" :key="idx"><img :src="image.path"/></li>-->
            <!--</ul>-->
            <yd-lightbox slot="right" :num="postInfo.taskImageUri.length" class="upload-list">
                <div class="room-item" v-for="(image, idx) in postInfo.taskImageUri" :key="idx">
                    <yd-lightbox-img class="room-image"  :src="image.path" ></yd-lightbox-img>
                </div>
            </yd-lightbox>
        </div>
    </div>
</template>
<script>
    import { getReportDetail } from '../../api/api'
    import { LightBox, LightBoxImg, LightBoxTxt } from 'vue-ydui/dist/lib.rem/lightbox'

    export default {
        created() {
            document.title = '维修申报详情'
            getReportDetail(this.$route.params.id)
                .then(res => this.postInfo = res.body.data)
                .then(data => {
                    switch (this.postInfo.taskStatus) {
                        case 'UNKNOWN':
                            this.postInfo.taskStatus = '未知'
                            break;
                        case 'WAITALLOT':
                            this.postInfo.taskStatus = '待分配'
                            break;
                        case 'WAITEXECUTOR':
                            this.postInfo.taskStatus = '待处理'
                            break;
                        case 'WAITCOMMENT':
                            this.postInfo.taskStatus = '待评价'
                            break;
                        case 'FINISH':
                            this.postInfo.taskStatus = '已完成'
                            break;
                        case 'ISCLOSE':
                            this.postInfo.taskStatus = '已关闭'
                            break;
                    }
                })
        },
        data() {
            return {
                postInfo: {}
            }
        },
        components: {
            [LightBox.name]: LightBox,
            [LightBoxImg.name]: LightBoxImg,
            [LightBoxTxt.name]: LightBoxTxt
        },
        methods: {

        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #post-con
        padding-bottom 1.4rem
        #input-group
            input
                text-align right
                font-size .26rem
                color #24242c
                width 5.2rem
            span
                font-size .26rem
                color #999
        .photo-tit
            font-size .3rem
            padding 0 .2rem
            .text1
                color #333
            .text2
                color #3f3f3f
        .upload-list
            display flex
            justify-content flex-start
            margin-top .35rem
            .room-item
                display flex
                justify-content center
                position relative
                width 33vw
                border-radius 2px
                overflow hidden
            .room-image
                width 1.6rem
                height 1.6rem
                border none
                border-radius 2px
                object-fit cover
                background-color #f3f4f5

</style>
