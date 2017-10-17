<template>
    <div>
        <div class="service-con">
            <div class="thumb">
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
            </div>
            <div class="content">
                <span class="title">张江世纪花园排水修复工作张江世纪花园排水</span>
                <span class="text-red">¥ 12,000.00</span>
            </div>
        </div>

        <div class="total-price">
            <span class="label">订单总金额</span>
            <span class="value">¥ 12,000.00</span>
        </div>

        <div class="pay-con">
            <div class="title">支付方式</div>
            <div class="pay">
                <img class="radio" src="../../../common/images/ic_radio_clicked@3x.png" />
                <img class="wechat" src="../../../common/images/ic_wechat2@3x.png" />
                <span>微信支付</span>
            </div>
        </div>

        <div class="posts-btn-con">
            <yd-button @click.native="pay" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">支付
            </yd-button>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {}
        },
        components: {},
        methods: {
            pay() {

            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    span
        color #262626
        font-size .26rem
    .service-con
        background-color #fff
        padding .2rem
        display flex
        border 1px solid #e7e7e7
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
            .title
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                width 5.48rem
                color #333
            .text-red
                color #E65966
    .total-price
        background-color #ffffff
        border-bottom 1px solid #e7e7e7
        padding .2rem
        display flex
        align-items center
        justify-content space-between
        height .8rem
        margin-bottom .2rem
        .label
            color #333333
        .value
            color #E65966
    .pay-con
        background-color #ffffff
        .title
            height .8rem
            padding 0 .2rem
            border-bottom 1px solid #e7e7e7
            font-size .26rem
            line-height .8rem
            color #333
        .pay
            height 1.2rem
            display flex
            align-items center
            padding 0 .4rem
            .radio
                width .44rem
                height .44rem
                margin-right .4rem
            .wechat
                width .44rem
                height .44rem
                margin-right .15rem
                margin-top .05rem
            span
                font-size .26rem
                color #999
    .posts-btn-con
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        .posts-btn
            height .8rem
            margin 0
            font-size .28rem
</style>
