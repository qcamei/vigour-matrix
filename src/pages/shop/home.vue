<template>
    <div style="padding-bottom: 1.2rem">
        <yd-slider autoplay="3000" class="banner-con">
            <yd-slider-item v-for="(banner, idx) in banners" :key="idx">
                <router-link to="#">
                    <img :src="banner.imageUrl" />
                </router-link>
            </yd-slider-item>
        </yd-slider>

        <div class="type-con">
            <!--`/shop/serviceList/${type.id}`-->
            <router-link v-for="(type, idx) in types" :key="idx" :to="{path: '/shop/serviceList/' + type.id, query: {mode: 'type'}}" class="type-item">
                <img v-lazy="type.typeLogo" />
                <span>{{ type.name }}</span>
            </router-link>
        </div>

        <!--商城活动-->
        <div class="service-item" v-if="shopActivities" data-type="activities">
            <div class="img-con">
                <img v-lazy="shopActivities.imageUrl" />
            </div>
            <div class="sub-con">
                <router-link :to="`/shop/serviceDetail/${activity.serviceProId}/imageText`" v-for="(activity, idx) in shopActivities.activityItems" :key="idx" class="sub-item">
                    <div class="thumb-con">
                        <img v-lazy="activity.serviceProjectMap.mainImage" />
                    </div>
                    <div class="text">
                        <span class="title">{{ activity.serviceProjectMap.mainTitle }}</span>
                        <span class="desc">{{ activity.serviceProjectMap.synopsis }}</span>
                    </div>
                </router-link>
            </div>
        </div>

        <!--精选服务-->
        <div class="service-item" v-if="specials" data-type="special">
            <div class="img-con">
                <img v-lazy="specials.imageUrl" />
            </div>
            <div class="sub-con">
                <router-link :to="`/shop/serviceDetail/${special.serviceProId}/imageText`" v-for="(special, idx) in specials.siftItems" :key="idx" class="sub-item">
                    <div class="thumb-con">
                        <img v-lazy="special.serviceProjectMap.mainImage" />
                    </div>
                    <div class="text">
                        <span class="title">{{ special.serviceProjectMap.mainTitle }}</span>
                        <span class="desc">{{ special.serviceProjectMap.synopsis }}</span>
                    </div>
                </router-link>
            </div>
        </div>

        <!--服务类型-->
        <div class="service-item" v-if="serviceTypes" v-for="(type, idx) in serviceTypes" :key="idx" data-type="types">
            <div class="img-con">
                <img v-lazy="type.recoLogo" />
            </div>
            <div class="sub-con">
                <router-link
                    :to="`/shop/serviceDetail/${serviceType.serviceProId}/imageText`"
                    v-for="(serviceType, index) in type.serviceProList"
                    :key="index"
                    class="sub-item"
                >
                    <div class="thumb-con">
                        <img v-lazy="serviceType.mainImage" />
                    </div>
                    <div class="text">
                        <span class="title">{{ serviceType.mainTitle }}</span>
                        <span class="desc">{{ serviceType.synopsis }}</span>
                    </div>
                </router-link>
            </div>
        </div>

        <!--服务场景-->
        <div class="service-item" v-if="stages" v-for="(preStage, index) in stages" :key="index" data-type="stages">
            <div class="img-con">
                <img v-lazy="preStage.recoLogo" />
            </div>
            <div class="sub-con">
                <router-link
                    :to="`/shop/serviceDetail/${stage.serviceProId}/imageText`"
                    v-for="(stage, idx) in preStage.serviceProList"
                    :key="idx"
                    class="sub-item"
                >
                    <div class="thumb-con">
                        <img v-lazy="stage.mainImage" />
                    </div>
                    <div class="text">
                        <span class="title">{{ stage.mainTitle }}</span>
                        <span class="desc">{{ stage.synopsis }}</span>
                    </div>
                </router-link>
            </div>
        </div>

        <!--园区自营-->
        <div class="service-item" v-if="parkSelf" data-type="parkSelf">
            <div class="img-con">
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3340904242,373088440&fm=200&gp=0.jpg" />
            </div>
            <div class="sub-con">
                <router-link :to="{path: `/shop/serviceDetail/${parkSelf[idx].serviceProId}/imageText`}" v-for="(self, idx) in parkSelf" :key="idx" class="sub-item">
                    <div class="thumb-con">
                        <img v-lazy="self.mainImage" />
                    </div>
                    <div class="text">
                        <span class="title">{{ self.mainTitle }}</span>
                        <span class="desc">{{ self.synopsis }}</span>
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
    import {
        MockLogin,
        getHomeBanner,
        getHomeType,
        getShopActivity,
        getSpecialService,
        getServiceType,
        getServiceStage,
        getParkSelfSale
    } from '../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
            MockLogin().then(response => {
                if (response.body.code == 200) {
                    // 首页banner
                    getHomeBanner().then(response => {
                        if (response.body.code == 200) {
                            this.banners = response.body.data.bannerItems
                        }
                    })

                    // 首页服务类型
                    getHomeType().then(response => {
                        if (response.body.code == 200) {
                            this.types = response.body.data
                        }
                    })

                    // 商城活动
                    getShopActivity().then(response => {
                        if (response.body.code == 200) {
                            this.shopActivities = response.body.data[0]
                        }
                    })

                    // 精选服务
                    getSpecialService().then(response => {
                        if (response.body.code == 200) {
                            this.specials = response.body.data[0]
                        }
                    })

                    // 服务类型
                    getServiceType().then(response => {
                        if (response.body.code == 200) {
                            this.serviceTypes = response.body.data.items
                        }
                    })

                    // 服务场景
                    getServiceStage().then(response => {
                        if (response.body.code == 200) {
                            this.stages = response.body.data.items
                        }
                    })

                    // 园区自营
                    getParkSelfSale().then(response => {
                        if (response.body.code == 200) {
                            this.parkSelf = response.body.data
                        }
                    })
                }
            })
        },
        data() {
            return {
                banners: null,
                types: null,
                shopActivities: null,
                specials: null,
                serviceTypes: null,
                stages: null,
                parkSelf: null
            }
        },
        components: {
            [TabBar.name]: TabBar,
            [TabBarItem.name]: TabBarItem,
            [Slider.name]: Slider,
            [SliderItem.name]: SliderItem
        },
        methods: {
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .banner-con
        width 100%
        height 3.6rem
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
                    width 2.43rem
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
