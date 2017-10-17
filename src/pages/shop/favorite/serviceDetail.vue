<template>
    <div style="height: 100%; padding-bottom: 1.2rem">
        <yd-slider autoplay="3000">
            <yd-slider-item>
                <a href="http://www.ydcss.com">
                    <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
                </a>
            </yd-slider-item>
            <yd-slider-item>
                <a href="http://www.ydcss.com">
                    <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
                </a>
            </yd-slider-item>
            <yd-slider-item>
                <a href="http://www.ydcss.com">
                    <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
                </a>
            </yd-slider-item>
        </yd-slider>

        <!--服务描述-->
        <div class="description">
            <span class="title">华谊星程大厦公司注册</span>
            <span class="detail">上海实业大厦位于上海市黄金地段徐家汇CBD商圈中心交通便捷，四通八达。</span>
        </div>

        <!--参数选择-->
        <div class="settings">
            <div class="rows">
                <div class="label">服务单价</div>
                <div class="params-con">
                    <span class="item">100元/1次</span>
                    <span class="item">100元/1次</span>
                    <span class="item">100元/1次</span>
                </div>
            </div>
            <div class="rows">
                <div class="label">参数2</div>
                <div class="params-con">
                    <span class="item">100元/1次</span>
                    <span class="item">100元/1次</span>
                    <span class="item">100元/1次</span>
                    <span class="item">100元/1次</span>
                </div>
            </div>
        </div>

        <!--销量收藏评分-->
        <div class="salenum">
            <span>销量：23</span>
            <span>收藏：211</span>
            <span>评分：4.5分</span>
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
            <div class="favorite-con">
                <img src="../../../common/images/ic_collect@3x.png" />
                <span>收藏</span>
            </div>
            <div v-if="true" class="serv-btn apply" @click="confirmApply">申请服务</div>
            <div v-if="false" class="serv-btn buy" @click="confirmPay">立即购买</div>
        </div>
    </div>
</template>
<script>
    import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider'

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {}
        },
        components: {
            [Slider.name]: Slider,
            [SliderItem.name]: SliderItem
        },
        methods: {
            confirmApply() {
                this.$router.push('/shop/writeApply')
            },
            confirmPay() {
                this.$router.push('/shop/writeOrder')
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
