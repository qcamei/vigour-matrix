<template>
    <div style="height: 100%">
        <div class="select-con">
            <router-link to="/shop/order/myorder" class="select-item" replace>我的订单</router-link>
            <router-link to="/shop/order/myapply" class="select-item" replace>我的申请</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
</style>
