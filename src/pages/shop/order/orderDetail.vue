<template>
    <div id="myOrderDetail">
        <!--订单状态-->
        <yd-cell-group style="margin-bottom: .2rem;">
            <yd-cell-item>
                <span slot="left">订单号：1728374572</span>
                <span slot="right"><span class="text-red">待支付</span></span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">订单日期：2016-10-24</span>
                <span slot="right"><span class="text-red">¥ 12,000.00</span></span>
            </yd-cell-item>
        </yd-cell-group>

        <!--服务项目-->
        <div class="service-con">
            <div class="thumb">
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
            </div>
            <div class="content">
                <span class="title">张江世纪花园排水修复工作张江世纪花园排水</span>
                <span class="size-con">
                    <span>规格一</span>
                    <span>规格二</span>
                </span>
                <span class="text-red">¥ 12,000.00</span>
            </div>
        </div>

        <!--订单备注-->
        <yd-cell-group style="margin-bottom: .2rem">
            <yd-cell-item>
                <span slot="left">订单备注</span>
                <span slot="right"><input type="text" value="暂无信息" style="text-align: right"></span>
            </yd-cell-item>
        </yd-cell-group>

        <!--收货信息-->
        <div class="save-info">
            <span class="title">收货信息</span>
            <span class="content">
                <span>张三 13678789990</span>
                <br>
                <span>上海市虹口区曲阳路800号曲阳商务中心2701</span>
            </span>
        </div>

        <!--发票信息-->
        <div class="bill-info yd-cell">
            <div class="yd-cell-item">
                <div class="yd-cell-left"><span>发票信息</span></div>
                <div class="yd-cell-right">
                    <span>企业</span>
                    <span>电子发票</span>
                    <span>服务类</span>
                    <span>13878789990</span>
                </div>
            </div>
            <img class="edit-icon" src="../../../common/images/ic_edit@3x.png" />
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
        <div class="service-rattings">
            <div class="title">
                <span class="txt">服务评价</span>
                <yd-rate size="22px" activeColor="#ee8f2b" padding=".2rem" v-model="ratting"></yd-rate>
            </div>
            <div class="content">
                <textarea rows="4" placeholder="请输入评价"></textarea>
            </div>
        </div>

        <!--底部按钮区-->
        <!--待支付-->
        <div class="posts-btn-con" v-if="false">
            <yd-button @click.native="" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3"
                       style="border: 1px solid #e7e7e7">取消订单
            </yd-button>
            <yd-button @click.native="" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">去支付
            </yd-button>
        </div>

        <!--待确认-->
        <div class="posts-btn-con" v-if="false">
            <yd-button @click.native="" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3"
                       style="border: 1px solid #e7e7e7">联系客服
            </yd-button>
            <yd-button @click.native="" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">订单确认
            </yd-button>
        </div>

        <!--已完成 进行评价-->
        <div class="posts-btn-con">
            <yd-button @click.native="" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff" style="width: 100%">提交评价
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { Rate } from 'vue-ydui/dist/lib.rem/rate'

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {
                ratting: 0
            }
        },
        components: {
            [Rate.name]: Rate
        },
        methods: {}
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
            justify-content space-around
            height 1.2rem
            margin-left .2rem
            .title
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                width 5.48rem
                color #333
            .size-con
                color #333
                span
                    margin-right 0 .2rem
    .save-info
        position relative
        height 1.68rem
        background-color #fff
        margin-bottom .2rem
        border-bottom .5px solid #ececec
        &:after
            position absolute
            right .2rem
            top 50%
            transform translateY(-50%)
            display block
            font-family YDUI-INLAY
            font-size .34rem
            color #c9c9c9
            content "\E608"
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
            padding 0 .8rem .2rem .4rem
            span
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
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
