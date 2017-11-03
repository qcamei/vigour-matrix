<template>
    <div>
        <div class="address-item" @click="changeAddress">
            <div class="icon-con">
                <div class="local-icon"></div>
            </div>
            <div class="info-con" v-if="defaultAddress">
                <span class="name">{{ defaultAddress.contacts }} &nbsp;&nbsp;&nbsp;&nbsp; {{ defaultAddress.phone
                    }}</span>
                <span
                    class="address">{{ defaultAddress.proviceName + defaultAddress.cityName + defaultAddress.countyName + defaultAddress.addr
                    }}</span>
            </div>
        </div>

        <div class="service-con" v-if="servicePro">
            <div class="thumb">
                <img v-lazy="servicePro.mainImage[0].path"/>
            </div>
            <div class="content">
                <span class="title">{{ servicePro.mainTitle }}</span>
                <span class="text-red">¥ {{ $route.query.tempPrice }}</span>
            </div>
        </div>

        <div class="total-price">
            <span class="label">订单总金额</span>
            <span class="value">¥ {{ $route.query.tempPrice }}</span>
        </div>

        <yd-cell-group style="margin-bottom: .2rem">
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="订单备注说明" maxlength="140" ref="textarea"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group style="margin-bottom: .2rem" v-if="!invoiceInfo">
            <yd-cell-item arrow @click.native="billSetting" style="padding-left: .2rem">
                <span slot="left">发票</span>
                <span slot="right">{{ descText }}</span>
            </yd-cell-item>
        </yd-cell-group>

        <div class="invoice-con" style="margin-bottom: .2rem" v-if="invoiceInfo">
            <div class="title">发票</div>
            <yd-cell-group>
                <yd-cell-item arrow @click.native="billSetting">
                    <span slot="left">{{ invoiceInfo.enterpriseName }}</span>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">发票内容</span>
                    <span slot="right" class="detail"
                          @click="$router.push('/shop/editInvoice/' + invoiceInfo.id)">明细</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

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
    import {
        getMyAddress,
        getServiceDetail,
        getInvoiceInfo,
        postOrder,
        prePayOrder
    } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title

            getMyAddress().then(response => {
                if (response.body.code == 200) {
                    this.defaultAddress = response.body.data.items.find(item => item.isDefault)
                }
            })

            getServiceDetail(this.$route.query.serviceProId).then(response => {
                if (response.body.code == 200) {
                    this.servicePro = response.body.data
                }
            })

            let invoiceId = sessionStorage.getItem('invoice_' + this.$route.query.serviceProId)
            let invoiceType = sessionStorage.getItem('invoiceType')

            if (invoiceId) {
                this.invoiceType = 'ENTERPRISE'
                getInvoiceInfo().then(response => {
                    if (response.body.code == 200) {
                        this.invoiceInfo = response.body.data.items.find(item => item.isDefault)
                        setInterval(() => {
                            sessionStorage.setItem('invoice_' + this.$route.query.serviceProId, '')
                        }, 100)
                    }
                })
            }

            if (invoiceType === '个人' && !invoiceId) {
                this.descText = '个人'
                this.invoiceType = 'INDIVIDUAL'
            }
        },
        data() {
            return {
                defaultAddress: null,
                servicePro: null,
                invoiceInfo: null,
                invoiceType: null,
                descText: '不开票'
            }
        },
        components: {},
        methods: {
            changeAddress() {
                this.$router.push('/shop/myAddress')
            },
            billSetting() {
                this.$router.push({
                    path: '/shop/billSettings/' + this.$route.query.serviceProId,
                    query: {
                        invoiceType: this.descText
                    }
                })
            },
            cancel() {
                this.$router.go(-1)
            },
            commit() {
                let postInfo = {
                    serviceProId: Number(this.$route.query.serviceProId),
                    orderMemo: this.$refs.textarea.$el.firstChild.value,
                    specificationId: Number(this.$route.query.specificationId),
                    tempPrice: this.$route.query.tempPrice,
                    addressId: this.defaultAddress.id,
                    invoiceType: this.invoiceType,
                }

                this.invoiceType === 'ENTERPRISE' ? postInfo.invoiceId = this.invoiceInfo.id : void 0

                postOrder(postInfo).then(response => {
                    if (response.body.code == 200) {
                        prePayOrder({
                            order_no: response.body.data.applyOrderNo
                        })
                            .then(res => {
                                if (res.body.code == 200) {
                                    if (res.body.data.credential.wx.return_code === 'SUCCESS') {
                                        let wx_data = JSON.stringify(res.body.data.credential.wx)
                                        let orderInfo = JSON.stringify({
                                            tempPrice: postInfo.tempPrice,
                                            imageUrl: this.servicePro.mainImage[0].path,
                                            prodName: this.servicePro.mainTitle
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
                    }
                    else {
                        this.$dialog.toast({mes: response.body.message, timeout: 800})
                    }
                }).catch(e => this.$dialog.toast({mes: e.statusText, timeout: 800}))

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

    .invoice-con
        background-color #ffffff
        .title
            height .8rem
            padding 0 .2rem
            border-bottom 1px solid #e7e7e7
            font-size .26rem
            line-height .8rem
            color #333
        .detail
            width 100%
            height 100%
            display flex
            align-items center
            justify-content flex-end

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
