<template>
    <div id="myOrderDetail" v-if="applyInfo">
        <!--订单状态-->
        <yd-cell-group style="margin-bottom: .2rem;">
            <yd-cell-item>
                <span slot="left">订单号：{{ applyInfo.applyOrderNo }}</span>
                <span slot="right">
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYWAITALLOT'">待分配</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYWAITASSESS'">待评估</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'ALREADREPULS'">已拒绝</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYWAITVERIFY'">待确认下单</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYWAITEXECUTOR'">待执行</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYWAITSERVICEVERIFY'">待服务确认</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYWAITCOMMENT'">待评价</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYFINISH'">已完成</span>
                    <span class="text-red" v-if="applyInfo.applyOrderStatus === 'APPLYCANCEL'">已取消</span>
                </span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">订单日期：{{ applyInfo.createTime }}</span>
                <span slot="right" v-if="applyInfo.price"><span class="text-red">¥ {{ applyInfo.price }}</span></span>
            </yd-cell-item>
        </yd-cell-group>

        <!--服务项目-->
        <div class="service-con">
            <div class="thumb">
                <img v-lazy="applyInfo.mainImage" />
            </div>
            <div class="content">
                <span class="title">{{ applyInfo.mainTitle }}</span>
                <span class="desc">{{ applyInfo.synopsis }}</span>
            </div>
        </div>

        <!--评论回复-->
        <div class="comment-info">
            <span class="title">评论回复</span>
            <span class="content">
                <span>可以接受，会按时发货</span>
                <div class="thumb">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                </div>
            </span>
        </div>

        <!--申请详情-->
        <div class="apply-detail">
            <div class="title">
                <span class="txt">申请详情</span>
            </div>
            <div class="content">
                <template v-for="(item, idx) in applyInfo.applyContent">
                    <span class="row" v-if="item.labelType !== 'FILE'">
                        <span class="label">{{ item.name }}</span>
                        <span class="value">{{ item.value }}</span>
                    </span>

                    <yd-cell-group v-if="item.labelType === 'FILE'">
                        <yd-cell-item style="height: 1.6rem">
                            <span slot="left" class="label-text">{{ item.name }}</span>
                            <yd-lightbox slot="right" :num="1" class="upload-list">
                                <div class="room-item">
                                    <yd-lightbox-img class="room-image" v-lazy="item.value"></yd-lightbox-img>
                                </div>
                            </yd-lightbox>
                        </yd-cell-item>
                    </yd-cell-group>
                </template>
            </div>
        </div>

        <!--流程跟踪-->
        <div class="step-info">
            <span class="title">流程跟踪</span>
            <span class="content">
                <span class="row">
                    <span class="text">
                        <img src="../../../common/images/ic_progress1@3x.png" />
                        <span class="info">已支付-待处理</span>
                    </span>
                    <span class="date">2017-09-17 16:02</span>
                </span>
                <span class="row">
                    <span class="text">
                        <img src="../../../common/images/ic_progress2@3x.png" />
                        <span class="info">已支付-待处理</span>
                    </span>
                    <span class="date">2017-09-17 16:02</span>
                </span>
                <span class="row">
                    <span class="text">
                        <img src="../../../common/images/ic_progress2@3x.png" />
                        <span class="info">已支付-待处理</span>
                    </span>
                    <span class="date">2017-09-17 16:02</span>
                </span>
            </span>
        </div>

        <!--服务评价-->
        <div class="service-rattings" v-if="applyInfo.applyOrderStatus === 'APPLYWAITCOMMENT' || applyInfo.applyOrderStatus === 'APPLYFINISH'">
            <div class="title">
                <span class="txt">服务评价</span>
                <yd-rate
                    size="22px"
                    activeColor="#ee8f2b"
                    padding=".2rem"
                    v-model="applyInfo.gradeNum ? applyInfo.gradeNum : ratting"
                    :readonly="applyInfo.applyOrderStatus === 'APPLYFINISH'"
                ></yd-rate>
            </div>
            <div class="content">
                <textarea rows="4" placeholder="请输入评价" ref="textarea"></textarea>
            </div>
        </div>

        <!--底部按钮区-->
        <!--待确认申请-->
        <div class="posts-btn-con" v-if="false">
            <yd-button @click.native="cancelApplyPut" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3"
                       style="border: 1px solid #e7e7e7">取消申请
            </yd-button>
            <yd-button @click.native="" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">申请确认
            </yd-button>
        </div>

        <!--待服务确认-->
        <div class="posts-btn-con" v-if="applyInfo.applyOrderStatus === 'APPLYWAITSERVICEVERIFY'">
            <yd-button @click.native="" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3"
                       style="border: 1px solid #e7e7e7">联系客服
            </yd-button>
            <yd-button @click.native="serviceConfirm" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">服务确认
            </yd-button>
        </div>

        <!--已完成 进行评价-->
        <div class="posts-btn-con" v-if="applyInfo.applyOrderStatus === 'APPLYWAITCOMMENT'">
            <yd-button @click.native="commitCommentPost" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff" style="width: 100%">提交评价
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { Rate } from 'vue-ydui/dist/lib.rem/rate'
    import { getApplyDetail, applyServiceConfirm, commitComment, cancelApply } from '../../../api/shopApi'
    import { LightBox, LightBoxImg, LightBoxTxt } from 'vue-ydui/dist/lib.rem/lightbox';

    export default {
        created() {
            document.title = this.$route.meta.title
            getApplyDetail(this.$route.params.id).then(response => {
                if (response.body.code == 200) {
                    this.applyInfo = response.body.data
                }
            })
        },
        data() {
            return {
                applyInfo: null,
                ratting: 0
            }
        },
        components: {
            [Rate.name]: Rate,
            [LightBox.name]: LightBox,
            [LightBoxImg.name]: LightBoxImg,
            [LightBoxTxt.name]: LightBoxTxt
        },
        methods: {
            cancelApplyPut() {
                cancelApply(this.$route.params.id).then(response => {
                    if (response.body.code == 200) {
                        this.$dialog.toast({
                            mes: '取消成功',
                            timeout: 500,
                            icon: 'success',
                            callback: this.$router.go(-1)
                        })
                    }
                })
            },
            serviceConfirm() {
                applyServiceConfirm(this.$route.params.id).then(response => {
                    if (response.body.code == 200) {
                        this.$dialog.toast({
                            mes: '确认成功',
                            timeout: 500,
                            icon: 'success',
                            callback: this.$router.go(-1)
                        })
                    }
                })
            },
            commitCommentPost() {
                let postInfo = {
                    applyOrderId: this.applyInfo.applyOrderId,
                    commentText: this.$refs.textarea.value,
                    gradeNum: this.ratting
                }
                commitComment(postInfo).then(response => {
                    if (response.body.code == 200) {
                        this.$dialog.toast({
                            mes: '评价成功',
                            timeout: 500,
                            icon: 'success',
                            callback: this.$router.go(-1)
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #myOrderDetail
        height 100%
        padding-bottom 1.4rem
        span:not(.yd-rate)
            font-size .26rem !important
        input
            font-size .26rem !important
    .service-con
        background-color #fff
        padding .2rem
        margin-bottom .2rem
        display flex
        .thumb
            width 1.2rem
            height 1.2rem
            overflow hidden
            img
                width 100%
                height 100%
                object-fit cover
        .content
            display flex
            flex-direction column
            justify-content space-between
            height 1.2rem
            margin-left .2rem
            width calc(100% - 1.4rem)
            .title
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                width 5.48rem
                color #333
            .desc
                font-size .24rem
                color #999
                line-height 1.4
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                overflow hidden
    .comment-info
        position relative
        background-color #fff
        margin-bottom .2rem
        border-bottom .5px solid #ececec
        .title
            display flex
            height .76rem
            line-height .76rem
            padding 0 .26rem
            font-size .26rem
            color #333
        .content
            display flex
            flex-direction column
            padding 0 .4rem .2rem
            span
                line-height 1.3
            .thumb
                width 1.2rem
                height 1.2rem
                overflow hidden
                margin-top .2rem
                img
                    width 100%
                    height 100%
                    object-fit cover
    .bill-info
        position relative
        margin-bottom .2rem
        .yd-cell-right
            padding-right .8rem
            span
                color #999
                margin-left .2rem
        .edit-icon
            position absolute
            width .36rem
            height .36rem
            right .2rem
            top 50%
            transform translateY(-50%)
    .step-info
        background-color #fff
        margin-bottom .2rem
        .title
            display flex
            height .76rem
            line-height .76rem
            padding 0 .26rem
            font-size .26rem
            color #333
        .content
            display flex
            flex-direction column
            padding 0 .2rem .2rem .4rem
            .row
                display flex
                justify-content space-between
                margin-bottom .12rem
                &:first-child
                    .info
                        color #00a7a3
                .text
                    display flex
                    align-items center
                    img
                        width .3rem
                        height .3rem
                        margin-right .2rem
                .date
                    font-size .24rem
    .apply-detail
        background-color #fff
        margin-bottom .2rem
        .title
            display flex
            height 1rem
            align-items center
            padding 0 .26rem
            .txt
                color #333
                font-size .26rem
                margin-right .4rem
        .content
            .row
                display flex
                justify-content space-between
                align-items center
                width 100%
                height 1rem
                font-size .26rem
                padding 0 .2rem 0 .2rem
                border-top 1px solid #e7e7e7
                .label
                    font-size .24rem
                    color #333
                .value
                    font-size .24rem
                    color #666
            .image-con
                width 6rem
            .upload-list
                display flex
                justify-content flex-start
                .room-item
                    display flex
                    justify-content flex-end
                    position relative
                    border-radius 2px
                    overflow hidden
                    width 33vw
                .room-image
                    width 1.2rem
                    height 1.2rem
                    border none
                    border-radius 2px
                    object-fit cover
                    background-color #f3f4f5
    .posts-btn-con
        display flex
        justify-content space-around
        align-items center
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        z-index 10
    .service-rattings
        background-color #fff
        margin-bottom 1.2rem
        .title
            display flex
            height 1rem
            align-items center
            padding 0 .26rem
            .txt
                color #333
                font-size .26rem
                margin-right .4rem
        .content
            border-top 1px solid #e7e7e7
            textarea
                width 100%
                border none
                outline none
                font-size .26rem
                padding .2rem
    .posts-btn-con
        display flex
        justify-content space-around
        align-items center
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
            width 3.45rem
            height .8rem
            margin 0
            font-size .28rem
            padding 0
            box-sizing border-box
</style>
