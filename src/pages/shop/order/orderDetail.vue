<template>
    <div id="myOrderDetail" v-if="orderInfo">
        <!--订单状态-->
        <yd-cell-group style="margin-bottom: .2rem;" >
            <yd-cell-item>
                <span slot="left">订单号：{{ orderInfo.applyOrderNo }}</span>
                <span slot="right">
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'WAITPAY'">待支付</span>
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'ORDERWAITALLOT'">待分配</span>
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'ORDERWAITEXECUTOR'">待处理</span>
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'ORDERCANCEL'">已取消</span>
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'ORDERWAITVERIFY'">待确认</span>
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'ORDERWAITCOMMENT'">待评价</span>
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'ORDERFINISH'">已完成</span>
                    <span class="text-red" v-if="orderInfo.applyOrderStatus === 'ORDERTERMINATION'">已关闭</span>
                </span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">订单日期：{{ orderInfo.createTime }}</span>
                <span slot="right"><span class="text-red">¥ {{ orderInfo.price }}</span></span>
            </yd-cell-item>
        </yd-cell-group>

        <!--服务项目-->
        <div class="service-con" >
            <div class="thumb">
                <img v-lazy="orderInfo.mainImage" />
            </div>
            <div class="content">
                <span class="title">{{ orderInfo.mainTitle }}</span>
                <span class="size-con" v-if="orderInfo.specification && orderInfo.specification.configs">
                    <span
                        v-for="(item, idx) in orderInfo.specification.configs"
                        :key="idx"
                        style="margin-right: .2rem"
                    >{{ item.itemValue }}</span>
                </span>
                <span class="text-red">¥ {{ orderInfo.price }}</span>
            </div>
        </div>

        <!--订单备注-->
        <yd-cell-group style="margin-bottom: .2rem" >
            <yd-cell-item>
                <span slot="left">订单备注</span>
                <span slot="right" style="width: 100%">
                    <input
                        type="text"
                        value="暂无信息"
                        style="text-align: right; width: 100%; padding-left: .2rem"
                        v-model="orderInfo.orderMemo" />
                </span>
            </yd-cell-item>
        </yd-cell-group>

        <!--收货信息-->
        <div class="save-info" >
            <span class="title">收货信息</span>
            <span class="content" v-if="orderInfo.address">
                <span>{{ orderInfo.address.contacts }} {{ orderInfo.address.phone }}</span>
                <br>
                <span>
                    {{ orderInfo.address.proviceName }}
                    {{ orderInfo.address.cityName }}
                    {{ orderInfo.address.countyName }}
                    {{ orderInfo.address.addr }}
                </span>
            </span>
        </div>

        <!--发票信息-->
        <div class="bill-info yd-cell" v-if="orderInfo && orderInfo.invoice">
            <div class="yd-cell-item">
                <div class="yd-cell-left"><span>发票信息</span></div>
                <div class="yd-cell-right">
                    <span>{{ orderInfo.invoice.enterpriseName }}</span>
                </div>
            </div>
            <img class="edit-icon" src="../../../common/images/ic_edit@3x.png" />
        </div>

        <!--流程跟踪-->
        <div class="step-info">
            <span class="title">流程跟踪</span>
            <span class="content">
                <span class="row" v-for="(item, idx) in orderInfo.record" :key="idx">
                    <span class="text">
                        <img v-if="idx === 0" src="../../../common/images/ic_progress1@3x.png" />
                        <img v-if="idx !== 0" src="../../../common/images/ic_progress2@3x.png" />
                        <span class="info">{{ item.beforeOperation }}-{{ item.afterOperation }}</span>
                    </span>
                    <span class="date">{{ moment(item.createTime).format('YYYY-MM-DD HH:mm') }}</span>
                </span>
            </span>
        </div>

        <!--服务评价-->
        <div
            class="service-rattings"
            v-if="orderInfo.applyOrderStatus === 'ORDERWAITCOMMENT' || orderInfo.applyOrderStatus === 'ORDERFINISH'">
            <div class="title">
                <span class="txt">服务评价</span>
                <yd-rate
                    size="22px"
                    activeColor="#ee8f2b"
                    padding=".2rem"
                    v-model="orderInfo.gradeNum ? orderInfo.gradeNum : ratting"
                    :readonly="orderInfo.applyOrderStatus === 'ORDERFINISH'"
                ></yd-rate>
            </div>
            <div class="content">
                <textarea rows="4" placeholder="请输入评价" ref="textarea"></textarea>
            </div>
        </div>

        <!--底部按钮区-->
        <!--待支付-->
        <div class="posts-btn-con" v-if="orderInfo.applyOrderStatus === 'WAITPAY'">
            <yd-button @click.native="cancelOrderPut" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3" style="border: 1px solid #e7e7e7">取消订单
            </yd-button>
            <yd-button @click.native="goToPay" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">去支付
            </yd-button>
        </div>

        <!--待确认-->
        <div class="posts-btn-con" v-if="orderInfo.applyOrderStatus === 'ORDERWAITVERIFY'">
            <yd-button @click.native="" class="posts-btn" type="hollow" bgcolor="#fff" color="#00A7A3" style="border: 1px solid #e7e7e7">联系客服
            </yd-button>
            <yd-button @click.native="confirmOrderPut" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff">订单确认
            </yd-button>
        </div>

        <!--待评价-->
        <div class="posts-btn-con" v-if="orderInfo.applyOrderStatus === 'ORDERWAITCOMMENT'">
            <yd-button @click.native="commitCommentPost" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff" style="width: 100%">提交评价
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { Rate } from 'vue-ydui/dist/lib.rem/rate'
    import {
        getOrderdetail,
        cancelOrder,
        confirmOrder,
        commitComment,
        prePayOrder
    } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
            getOrderdetail(this.$route.params.id).then(response => {
                if (response.body.code == 200) {
                    this.orderInfo = response.body.data
                }
            })
        },
        data() {
            return {
                orderInfo: null,
                ratting: 0
            }
        },
        components: {
            [Rate.name]: Rate
        },
        methods: {
            // 去支付
            goToPay() {
                prePayOrder({
                    order_no: this.orderInfo.applyOrderNo
                }).then(res => {
                    if (res.body.code == 200) {
                        if (res.body.data.credential.wx.return_code === 'SUCCESS') {
                            let wx_data = JSON.stringify(res.body.data.credential.wx)
                            let orderInfo = JSON.stringify({
                                tempPrice: orderInfo.price,
                                imageUrl: orderInfo.mainImage,
                                prodName: orderInfo.mainTitle
                            })
                            this.$router.push({
                                path: '/shop/pay',
                                query: {
                                    wx_data: encodeURIComponent(wx_data),
                                    orderInfo: encodeURIComponent(orderInfo)
                                }
                            })
                        }
                        else {
                            this.$dialog.toast({mes: res.body.data.credential.wx.return_message, timeout: 800})
                        }
                    }
                    else {
                        this.$dialog.toast({
                            mes: res.body.message,
                            timeout: 800
                        })
                    }
                }).catch(e => this.$dialog.toast({mes: e.statusText, timeout: 800}))
            },
            // 取消订单
            cancelOrderPut() {
                cancelOrder(this.orderInfo.applyOrderId).then(response => {
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
            // 确认订单
            confirmOrderPut() {
                confirmOrder(this.orderInfo.applyOrderId).then(response => {
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
            // 提交评价
            commitCommentPost() {
                let postInfo = {
                    applyOrderId: this.orderInfo.applyOrderId,
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
        margin-bottom 1.4rem
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
