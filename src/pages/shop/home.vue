<template>
    <div style="padding-bottom: 1.2rem">
        <yd-slider autoplay="3000" class="banner-con">
            <yd-slider-item>
                <router-link to="#">
                    <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
                </router-link>
            </yd-slider-item>
            <yd-slider-item>
                <router-link to="#">
                    <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
                </router-link>
            </yd-slider-item>
            <yd-slider-item>
                <router-link to="#">
                    <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
                </router-link>
            </yd-slider-item>
        </yd-slider>

        <div class="type-con">
            <router-link to="/shop/serviceList" class="type-item">
                <img src="../../common/images/ic_money@3x.png" />
                <span>资金服务</span>
            </router-link>
            <router-link to="/shop/serviceList" class="type-item">
                <img src="../../common/images/ic_tax@3x.png" />
                <span>工商财税</span>
            </router-link>
            <router-link to="/shop/serviceList" class="type-item">
                <img src="../../common/images/ic_human_resource@3x.png" />
                <span>人力资源</span>
            </router-link>
            <router-link to="/shop/serviceList" class="type-item">
                <img src="../../common/images/ic_market@3x.png" />
                <span>市场营销</span>
            </router-link>
            <router-link to="/shop/serviceList" class="type-item">
                <img src="../../common/images/ic_welfare@3x.png" />
                <span>企业福利</span>
            </router-link>
            <router-link to="/shop/serviceList" class="type-item">
                <img src="../../common/images/ic_money@3x.png" />
                <span>资金服务</span>
            </router-link>
        </div>

        <div class="service-item">
            <div class="img-con">
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3340904242,373088440&fm=200&gp=0.jpg" />
            </div>
            <div class="sub-con">
                <router-link to="#" v-for="n in 8" :key="n" class="sub-item">
                    <div class="thumb-con">
                        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                    </div>
                    <div class="text">
                        <span class="title">Penelopeport</span>
                        <span class="desc">法律服务的内容包括诉讼业务服务和非诉讼业务服务</span>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="service-item">
            <div class="img-con">
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3340904242,373088440&fm=200&gp=0.jpg" />
            </div>
            <div class="sub-con">
                <router-link to="#" v-for="n in 4" :key="n" class="sub-item">
                    <div class="thumb-con">
                        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                    </div>
                    <div class="text">
                        <span class="title">Penelopeport</span>
                        <span class="desc">法律服务的内容包括诉讼业务服务和非诉讼业务服务</span>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="service-item">
            <div class="img-con">
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3340904242,373088440&fm=200&gp=0.jpg" />
            </div>
            <div class="sub-con">
                <router-link to="#" v-for="n in 4" :key="n" class="sub-item">
                    <div class="thumb-con">
                        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                    </div>
                    <div class="text">
                        <span class="title">Penelopeport</span>
                        <span class="desc">法律服务的内容包括诉讼业务服务和非诉讼业务服务</span>
                    </div>
                </router-link>
            </div>
        </div>

        <yd-tabbar
            :fixed="true"
            color="#a7a7a7"
            activeColor="#5abbc7"
            fontsize="0.22rem"
        >
            <yd-tabbar-item title="企业服务" link="/shop/home" active>
                <img slot="icon" src="../../common/images/ic_home_clicked@3x.png" />
            </yd-tabbar-item>
            <yd-tabbar-item title="分类" link="/shop/type">
                <img slot="icon" src="../../common/images/ic_classification@3x.png" />
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/shop/mine">
                <img slot="icon" src="../../common/images/ic_mine@3x.png" />
            </yd-tabbar-item>
        </yd-tabbar>
    </div>
</template>
<script>
    import { TabBar, TabBarItem } from 'vue-ydui/dist/lib.rem/tabbar'
    import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider'

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {}
        },
        components: {
            [TabBar.name]: TabBar,
            [TabBarItem.name]: TabBarItem,
            [Slider.name]: Slider,
            [SliderItem.name]: SliderItem
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .banner-con
        width 100%
        overflow hidden
        img
            width 100%
    .type-con
        overflow-x scroll
        padding .2rem .3rem
        display flex
        background-color #fff
        -webkit-overflow-scrolling touch
        .type-item
            white-space nowrap
            margin 0 .3rem
            display flex
            flex-direction column
            align-items center
            justify-content space-between
            width .96rem
            img
                width .8rem
                height .8rem
            span
                font-size .24rem
                color #333
                margin-top .12rem
    .service-item
        margin-top .2rem
        width 100%
        background-color #fff
        .img-con
            width 100%
            height 2.4rem
            overflow hidden
            img
                object-fit cover
                width 100%
                height 100%
        .sub-con
            padding 0 0 .2rem
            overflow hidden
            .sub-item
                float left
                overflow hidden
                margin-top .2rem
                &:nth-child(odd)
                    .thumb-con
                        margin-left .2rem
                .thumb-con
                    width 1.2rem
                    height 1.2rem
                    overflow hidden
                    display inline-block
                    float left
                    img
                        width 100%
                        height 100%
                        object-fit cover
                .text
                    display flex
                    flex-direction column
                    justify-content space-between
                    padding 0 .2rem
                    width 2.4rem
                    height 1.2rem
                    .title
                        font-size .26rem
                        color #333
                        width 1.8rem
                        text-overflow ellipsis
                        overflow hidden
                        white-space nowrap
                        line-height 1.2
                    .desc
                        font-size .2rem
                        color #999
                        line-height 1.2
                        display -webkit-box
                        -webkit-line-clamp 3
                        -webkit-box-orient vertical
                        overflow hidden
</style>
