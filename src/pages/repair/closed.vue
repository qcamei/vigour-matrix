<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">处理状态</span>
                <input slot="right" :showClearIcon="false" v-model="postInfo.taskStatus" style="color: #e65966;" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">申报概述</span>
                <input slot="right" :showClearIcon="false"  v-model="postInfo.title" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系人</span>
                <input slot="right" :showClearIcon="false" v-model="postInfo.contacts" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系电话</span>
                <input slot="right" :showClearIcon="false" readonly
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
            <yd-lightbox slot="right" :num="postInfo.taskImageUri.length" class="upload-list">
                <div class="room-item" v-for="(image, idx) in postInfo.taskImageUri" :key="idx">
                    <yd-lightbox-img class="room-image"  :src="image.path" ></yd-lightbox-img>
                </div>
            </yd-lightbox>
        </div>

        <div class="smile-con">
            <span class="tit">服务评价</span>
            <div class="icon-group">
                <div class="item" >
                    <i v-show="postInfo.commentGrade !== 'GOOD'" class="max max-good"></i>
                    <i v-show="postInfo.commentGrade === 'GOOD'" class="max max-good-selected"></i>
                    <span :style="postInfo.commentGrade == 'GOOD' ? 'color: #00a7a3' : void 0">好评</span>
                </div>
                <div class="item" >
                    <i v-show="postInfo.commentGrade !== 'MEDIUM'" class="max max-normal"></i>
                    <i v-show="postInfo.commentGrade === 'MEDIUM'" class="max max-normal-selected"></i>
                    <span :style="postInfo.commentGrade == 'MEDIUM' ? 'color: #00a7a3' : void 0">中评</span>
                </div>
                <div class="item" >
                    <i v-show="postInfo.commentGrade !== 'NEGATIVE'" class="max max-bad"></i>
                    <i v-show="postInfo.commentGrade === 'NEGATIVE'" class="max max-bad-selected"></i>
                    <span :style="postInfo.commentGrade == 'NEGATIVE' ? 'color: #00a7a3' : void 0">差评</span>
                </div>
            </div>
        </div>

        <yd-cell-group>
            <yd-cell-item>
                <yd-textarea slot="right" maxlength="140" v-html="postInfo.commentContent" :readonly="true" style="text-align: left"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script>
    import { getReportDetail } from '../../api/api'
    import { LightBox, LightBoxImg, LightBoxTxt } from 'vue-ydui/dist/lib.rem/lightbox'

    export default {
        created() {
            document.title = '维修申报查看'
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
                ratting: 'GOOD',
                postInfo: {},
            }
        },
        components: {
            [LightBox.name]: LightBox,
            [LightBoxImg.name]: LightBoxImg,
            [LightBoxTxt.name]: LightBoxTxt
        },
        methods: {}
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
        .posts-btn-con
            position fixed
            bottom 0
            left 0
            right 0
            width 100%
            height 1.2rem
            padding .2rem
            background-color #f5f4f9
            z-index 10
            .posts-btn
                height .8rem
                margin 0
                font-size .28rem
        .smile-con
            display flex
            align-items center
            padding 0 .2rem
            height 1.36rem
            .tit
                font-size .26rem
                color #999
                width 2.04rem
            .icon-group
                display flex
                justify-content space-between
                width 3.04rem
                .item
                    display flex
                    align-items center
                    justify-content center
                    flex-direction column
                    span
                        margin-top .06rem
                        font-size .2rem
                        color #999
        i
            display inline-block
        .max
            width .48rem
            height .48rem
            background-repeat no-repeat
            background-size .48rem .48rem
        .max-good
            background-image url("../../common/images/ic_good.png")
        .max-normal
            background-image url("../../common/images/ic_normal.png")
        .max-bad
            background-image url("../../common/images/ic_bad.png")
        .max-good-selected
            background-image url("../../common/images/ic_good_clicked.png")
        .max-normal-selected
            background-image url("../../common/images/ic_normal_clicked.png")
        .max-bad-selected
            background-image url("../../common/images/ic_bad_clicked.png")
</style>
