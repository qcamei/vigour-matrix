<template>
    <div style="height: 100%; padding-bottom: 1.2rem" v-if="info">
        <yd-slider autoplay="3000" style="height: 3.8rem" v-if="info && info.listImage.length">
            <yd-slider-item v-for="(item, idx) in info.listImage" :key="idx">
                <a href="#">
                    <img :src="item.path">
                </a>
            </yd-slider-item>
        </yd-slider>

        <!--服务描述-->
        <div class="description">
            <span class="title" v-if="info && info.mainTitle">{{ info.mainTitle }}</span>
            <span class="detail" v-if="info && info.subTitle">{{ info.subTitle }}</span>
        </div>

        <!--参数选择 orderLabels[idx].items[index].selected = true-->
        <div class="settings" v-if="info && info.supportOrder">
            <div class="rows" v-for="(row, idx) in orderLabels" :key="idx">
                <div class="label">{{ row.label }}</div>
                <div class="params-con">
                    <span
                        v-for="(item, index) in row.items"
                        :key="index"
                        :class="{'item': true, 'selected': item.selected, 'disabled': !item.enabled}"
                        @click="selectEnd(item, row.items, idx)"
                    >{{ item.item }}</span>
                </div>
            </div>
            <div class="rows">
                <div class="label">价格</div>
                <div class="params-con price"><span v-if="totalPrice">￥ {{ totalPrice }}</span></div>
            </div>
        </div>

        <!--销量收藏评分-->
        <div class="salenum">
            <span v-if="info">销量：{{ info.orderNum }}</span>
            <span v-if="info">收藏：{{ info.collectNum }}</span>
            <span v-if="info">评分：{{ info.commentNum }}分</span>
        </div>

        <!--图文详情 & 评价-->
        <div class="select-con">
            <router-link :to="`/shop/serviceDetail/${this.$route.params.id}/imageText`" class="select-item" replace>图文详情</router-link>
            <router-link :to="`/shop/serviceDetail/${this.$route.params.id}/comment`" class="select-item" replace>评论</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

        <div class="btn-con">
            <div class="favorite-con like" @click="addFavorite">
                <img v-if="!isFavorite" src="../../../common/images/ic_collect@3x.png" />
                <img v-if="isFavorite" src="../../../common/images/ic_collect_clicked@3x.png" />
                <span v-if="!isFavorite">收藏</span>
                <span v-if="isFavorite" style="color: #ff4f55;">收藏</span>
            </div>
            <div v-if="info && !info.supportOrder" class="serv-btn apply" @click="confirmApply">申请服务</div>
            <div v-if="info && info.supportOrder" class="serv-btn buy" @click="confirmPay">立即购买</div>
        </div>
    </div>
</template>
<script>
    import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider'
    import { getServiceDetail, setFavorite, removeFavorite } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
            getServiceDetail(this.$route.params.id).then(response => {
                if (response.body.code == 200) {
                    var res = response.body.data
                    res.supportOrder && res.orderTemplate.labels.forEach(item => {
                        item.items.forEach(cur => {
                            cur.selected = false
                            cur.enabled = false
                        })
                    })

                    this.info = res
                    if (res.supportOrder) {
                        this.orderLabels = res.orderTemplate.labels
                        this.validMap = res.validMap
                        this.validIds = res.validIds

                        this.orderLabels[0].items.forEach(item => {
                            this.validIds.forEach(cur => {
                                cur == item.id ? item.enabled = true : false
                            })
                        })
                    }
                    this.isFavorite = res.isCollect
                }
            })
        },
        data() {
            return {
                info: null,
                validMap: null,
                orderLabels: null,
                validIds: null,
                isFavorite: false,
                totalPrice: '',
                specificationNo: ''
            }
        },
        components: {
            [Slider.name]: Slider,
            [SliderItem.name]: SliderItem
        },
        watch: {
            orderLabels: {
                handler(cur, old) {
                },
                deep: true
            }
        },
        methods: {
            addFavorite() {
                this.isFavorite ? removeFavorite(this.info.id) : setFavorite(this.info.id)
                this.isFavorite = !this.isFavorite
            },
            confirmApply() {
                this.$router.push('/shop/writeApply/' + this.info.applyViewId + '?serviceProId=' + this.info.id)
            },
            confirmPay() {
                if (!this.specificationNo) {
                    return this.$dialog.toast({
                        mes: '请选择',
                        timeout: 500
                    })
                }
                this.$router.push({
                    path: '/shop/writeOrder',
                    query: {
                        specificationId: this.specificationNo,
                        serviceProId: this.$route.params.id,
                        tempPrice: this.totalPrice
                    }
                })
            },
            selectEnd(item, row, rowIndex) {
                if (!item.enabled) return

                row.forEach(cur => cur.selected = false)
                item.selected = true

                if (rowIndex < this.orderLabels.length - 1) {
                    this.totalPrice = this.specificationNo = ''
                    this.orderLabels[rowIndex + 1].items.forEach(cur => {
                        let flag = this.validMap[item.id].find(val => val == cur.id)
                        cur.enabled = flag ? true : false
                    })
                }

                var canOrder = this.orderLabels[this.orderLabels.length - 1].items.find(item => item.selected)
                if (rowIndex === this.orderLabels.length - 1 || canOrder) {
                    let totalId_ = ''
                    this.orderLabels.forEach(item => {
                        item.items.forEach(cur => {
                            if (cur.selected) {
                                totalId_ += cur.id + '_'
                            }
                        })
                    })
                    let totalId = totalId_.slice(0, totalId_.length - 1)
                    this.totalPrice = this.info.priceMap[totalId]
                    this.specificationNo = this.info.specificationMap[totalId]
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .description
        display flex
        flex-direction column
        background-color #fff
        padding .2rem
        margin-bottom .2rem
        .title
            font-size .3rem
            color #333333
        .detail
            font-size .26rem
            color #999
            margin-top .2rem
            line-height 1.3
    .settings
        background-color #fff
        padding .2rem
        display flex
        flex-direction column
        .rows
            display flex
            margin-bottom .1rem
            &:last-child
                margin-bottom 0
            .label
                width 1.5rem
                font-size .28rem
                color #333
                padding-top .1rem
            .params-con
                display flex
                flex-wrap wrap
                width 100%
                margin-left .08rem
                &.price
                    font-size .26rem
                    color #e65966
                    display flex
                    align-items center
                    height .5rem
                .item
                    font-size .26rem
                    color #999
                    height .52rem
                    display flex
                    align-items center
                    justify-content center
                    border 1px solid #999
                    border-radius .04rem
                    margin-left .12rem
                    margin-bottom .12rem
                    padding 0 .25rem
                    &.selected
                        color #e65966
                        border-color #e65966
                    &.disabled
                        color #e4e5e6
                        border-color #e4e5e6
    .salenum
        display flex
        justify-content space-between
        align-items center
        background-color #fff
        padding 0 .2rem
        border-top 1px solid #e7e7e7
        margin-bottom .2rem
        font-size .26rem
        color #999
        height .8rem
    .select-con
        height .8rem
        background-color #fff
        display flex
        align-items center
        justify-content space-around
        .select-item
            display flex
            align-items center
            justify-content center
            width 1.6rem
            height .76rem
            font-size .3rem
            color #999
            &.router-link-active
                color #00a7a3
                border-bottom .04rem solid #00a7a3
    .btn-con
        display flex
        position fixed
        left 0
        right 0
        bottom 0
        width 100%
        height 1rem
        background-color #fff
        .favorite-con
            display flex
            flex-direction column
            align-items center
            justify-content center
            width 1.9rem
            background-color #fff
            color #999
            font-size .26rem
            img
                width .4rem
                height .4rem
                margin-bottom .06rem
            span
                font-weight 500
        .serv-btn
            display flex
            justify-content center
            align-items center
            width 100%
            font-size .3rem
            color #fff
            font-weight 500
            &.buy
                background-color #e65966
                transition all .3s
                &:active
                    background-color red
            &.apply
                background-color #00a7a3
</style>
