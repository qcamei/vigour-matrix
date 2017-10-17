<template>
    <div>
        <div class="address-item" @click="changeAddress">
            <div class="icon-con">
                <div class="local-icon"></div>
            </div>
            <div class="info-con">
                <span class="name">张三 &nbsp;&nbsp;&nbsp;&nbsp; 18019291929</span>
                <span class="address">上海市浦东新区西藏南路387号</span>
            </div>
        </div>

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

        <yd-cell-group style="margin-bottom: .2rem">
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="订单备注说明" maxlength="140" ref="textarea"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group style="margin-bottom: .2rem">
            <yd-cell-item arrow @click.native="billSetting">
                <span slot="left">发票</span>
                <span slot="right">不开票</span>
            </yd-cell-item>
        </yd-cell-group>

        <div class="posts-btn-con">
            <yd-button @click.native="cancel" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3"
                       style="border: 1px solid #e7e7e7">取消订单
            </yd-button>
            <yd-button @click.native="commit" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">订单确认
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
            return {
            }
        },
        components: {
        },
        methods: {
            changeAddress() {

            },
            billSetting() {
                this.$router.replace('/shop/billSettings')
            },
            cancel() {},
            commit() {
                this.$router.push('/shop/pay')
            },
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    span
        color #262626
        font-size .26rem
    .address-item
        position relative
        display flex
        border-bottom 1px solid #e7e7e7
        background-color #fff
        padding .3rem .6rem .3rem 0
        margin-bottom .2rem
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
        .icon-con
            position absolute
            width .8rem
            height 100%
            display flex
            align-items center
            justify-content center
            left 0
            top 50%
            transform translateY(-50%)
            .local-icon
                width .4rem
                height .4rem
                background-image url("../../../common/images/ic_location2@3x.png")
                background-size .4rem .4rem
        .info-con
            display flex
            flex-direction column
            justify-content center
            padding-left .8rem
            .name
                font-size .32rem
            .address
                font-size .24rem
                margin-top .14rem
                line-height 1.2
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
        .label
            color #333333
        .value
            color #E65966
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
