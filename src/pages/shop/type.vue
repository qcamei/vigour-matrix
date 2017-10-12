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
                <div class="select-item" @click="">精选推荐</div>
                <div class="select-item active" @click="tabIndex = 1">服务分类</div>
                <div class="select-item" @click="tabIndex = 2">精选推荐</div>
                <div class="select-item" @click="">园区自营</div>
            </div>

            <div class="type-con" v-show="tabIndex === 1">
                <router-link to="/shop/serviceList" class="type-item" v-for="n in 27" key="n">
                    <img src="../../common/images/ic_money@3x.png" />
                    <span>商标注册</span>
                </router-link>
            </div>

            <div class="type-con" v-show="tabIndex === 2">
                <router-link to="/shop/serviceList" class="type-item" v-for="n in 9" key="n">
                    <img src="../../common/images/ic_law@3x.png" />
                    <span>商标注册</span>
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

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {
                tabIndex: 1
            }
        },
        components: {
            [TabBar.name]: TabBar,
            [TabBarItem.name]: TabBarItem
        },
        methods: {
            changeActive(e) {
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
                height 1.48rem
                margin-bottom .32rem
                img
                    width 1rem
                    height 1rem
                span
                    font-size .26rem
                    color #999
</style>
