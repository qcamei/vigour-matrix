<template>
    <div style="padding-bottom: 1rem; height: 100%">
        <!--<div class="search-con">-->
            <!--<div class="search-bar">-->
                <!--<div class="icon-con">-->
                    <!--<yd-icon name="search" size=".32rem" color="#999"></yd-icon>-->
                <!--</div>-->
                <!--<input type="search" placeholder="请输入搜索条件">-->
            <!--</div>-->
        <!--</div>-->

        <div class="out-con">
            <div class="select-con" @click="changeActive">
                <div class="choose-item" @click="$router.push({path: `/shop/serviceList/001`, query: {mode: 'special'}})">精选服务</div>
                <div class="select-item active" @click="tabIndex = 1">服务类型</div>
                <div class="select-item" @click="tabIndex = 2">服务场景</div>
                <div class="choose-item" @click="$router.push({path: `/shop/serviceList/002`, query: {mode: 'self'}})">园区自营</div>
            </div>

            <div class="type-con" v-show="tabIndex === 1" >
                <router-link v-for="(type, idx) in types" :to="{path: `/shop/serviceList/${type.id}`, query: {mode: 'type'}}" class="type-item" :key="idx">
                    <img v-lazy="type.typeLogo" />
                    <span>{{ type.name }}</span>
                </router-link>
            </div>

            <div class="type-con" v-show="tabIndex === 2">
                <router-link v-for="(stage, idx) in stages" :to="{path: `/shop/serviceList/${stage.id}`, query: {mode: 'stage'}}" class="type-item" :key="idx">
                    <img v-lazy="stage.scaneLogo" />
                    <span>{{ stage.name }}</span>
                </router-link>
            </div>
        </div>

        <yd-tabbar
            :fixed="true"
            color="#a7a7a7"
            activeColor="#5abbc7"
            fontsize="0.22rem"
        >
            <yd-tabbar-item title="企业服务" link="/shop/home">
                <img slot="icon" src="../../common/images/ic_home@3x.png" />
            </yd-tabbar-item>
            <yd-tabbar-item title="分类" link="/shop/type" active>
                <img slot="icon" src="../../common/images/ic_classification_clicked@3x.png" />
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/shop/mine">
                <img slot="icon" src="../../common/images/ic_mine@3x.png" />
            </yd-tabbar-item>
        </yd-tabbar>
    </div>
</template>
<script>
    import { TabBar, TabBarItem } from 'vue-ydui/dist/lib.rem/tabbar'
    import { getServiceType, getStagesIcon } from '../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title

            getServiceType().then(response => {
                if (response.body.code == 200) {
                    this.types = response.body.data.items
                }
            })

            getStagesIcon().then(response => {
                if (response.body.code == 200) {
                    this.stages = response.body.data
                }
            })
        },
        data() {
            return {
                tabIndex: 1,
                types: null,
                stages: null
            }
        },
        components: {
            [TabBar.name]: TabBar,
            [TabBarItem.name]: TabBarItem
        },
        methods: {
            changeActive(e) {
                if (e.target.className === 'choose-item') {

                    return
                }

                let tabList = e.target.parentNode.getElementsByClassName('select-item')
                for (let i = 0; i < tabList.length; i++) {
                    tabList[i].classList.remove('active')
                }
                e.target.classList.add('active')
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .search-con
        background-color #fff
        padding .2rem
        .search-bar
            width 100%
            height .64rem
            background-color #f8f8f8
            border-radius .12rem
            display flex
            .icon-con
                width .8rem
                display flex
                align-items center
                justify-content center
            input
                border none
                outline none
                font-size .3rem
                color #000
                width 6rem
    .out-con
        width 100%
        height 100%
        overflow hidden
        .select-con
            width 2rem
            height 100%
            background-color #fff
            float left
            border-top 1px solid #f3f4f5
            .select-item
                height .8rem
                line-height .8rem
                text-align center
                font-size .26rem
                &.active
                    color #00a7a3
                    background-color #f5f4f9
            .choose-item
                height .8rem
                line-height .8rem
                text-align center
                font-size .26rem
                &.active
                    color #00a7a3
                    background-color #f5f4f9
        .type-con
            float right
            width 5.4rem
            height 100%
            background-color #f5f4f9
            padding .5rem
            overflow-y auto
            .type-item
                display flex
                flex-direction column
                align-items center
                justify-content space-between
                float left
                width 33.333%
                margin-bottom .25rem
                img
                    width 1rem
                    height 1rem
                    object-fit cover
                span
                    font-size .2rem
                    color #999
                    width 100%
                    margin-top .2rem
                    text-overflow ellipsis
                    white-space nowrap
                    overflow hidden
                    text-align center
</style>
