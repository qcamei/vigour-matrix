<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">处理状态</span>
                <input slot="right" :showClearIcon="false" v-model="postInfo.status" style="color: #e65966;" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系人</span>
                <input slot="right" :showClearIcon="false" placeholder="请输入联系人姓名" v-model="postInfo.contacts" readonly>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">联系电话</span>
                <input slot="right" :showClearIcon="false" readonly placeholder="请输入联系电话"
                       v-model="postInfo.phone">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">位置</span>
                <input slot="right" required :showClearIcon="false" readonly placeholder="请输入位置"
                       v-model="postInfo.position">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">设备类型</span>
                <input slot="right" required :showClearIcon="false" readonly placeholder="请输入设备类型"
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
                    v-html="postInfo.detail">
                </yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <!-- 图片上传 -->
        <div class="photo-tit">
            <span class="text1">添加现场图片</span>
            <span class="text2">（最多支持上传三张图片）</span>
        </div>
        <ul class="upload-list">
            <li><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></li>
            <li><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></li>
            <li><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></li>
        </ul>

        <div class="smile-con">
            <span class="tit">服务评价</span>
            <div class="icon-group">
                <div class="item" @click="ratting = 'good'">
                    <i v-show="ratting !== 'good'" class="max max-good"></i>
                    <i v-show="ratting === 'good'" class="max max-good-selected"></i>
                    <span :style="ratting == 'good' ? 'color: #00a7a3' : void 0">好评</span>
                </div>
                <div class="item" @click="ratting = 'normal'">
                    <i v-show="ratting !== 'normal'" class="max max-normal"></i>
                    <i v-show="ratting === 'normal'" class="max max-normal-selected"></i>
                    <span :style="ratting == 'normal' ? 'color: #00a7a3' : void 0">中评</span>
                </div>
                <div class="item" @click="ratting = 'bad'">
                    <i v-show="ratting !== 'bad'" class="max max-bad"></i>
                    <i v-show="ratting === 'bad'" class="max max-bad-selected"></i>
                    <span :style="ratting == 'bad' ? 'color: #00a7a3' : void 0">差评</span>
                </div>
            </div>
        </div>

        <yd-cell-group>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入您的评价" maxlength="140"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <div class="posts-btn-con">
            <yd-button @click.native="commit" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3" color="#fff">提交</yd-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ratting: '',
                postInfo: {
                    status: '待评价',
                    contacts: '李四',
                    phone: '186-2938-4099',
                    position: '上海市曲阳路888号',
                    deviceType: '门禁',
                    detail: '门禁坏了，进不去！',
                    imgUrls: []
                },
            }
        },
        components: {},
        methods: {
            commit() {

            }
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
            li
                display flex
                justify-content center
                position relative
                width 33vw
                border-radius 2px
                overflow hidden
                img
                    width 1.6rem
                    height 1.6rem
                    border none
                    border-radius 2px
                    object-fit cover
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
