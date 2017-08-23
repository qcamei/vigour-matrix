<template>
    <div>
        <yd-navbar
            :title="this.$route.meta.title"
            color="#fff"
            fontsize=".36rem"
        ></yd-navbar>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">所属园区</span>
                <span slot="right">Park1</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">用户名</span>
                <span slot="right">李四</span>
            </yd-cell-item>
            <div class="cell-item choose-btn-con">
                <yd-button type="primary">选择登录</yd-button>
            </div>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">所属园区</span>
                <span slot="right">Park2</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">用户名</span>
                <span slot="right">马五</span>
            </yd-cell-item>
            <div class="cell-item choose-btn-con">
                <yd-button type="primary">选择登录</yd-button>
            </div>
        </yd-cell-group>
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
    .choose-btn-con
        height 1.12rem
        display flex
        align-items center
        justify-content center
        .btn
            width 2rem
            height .72rem
            background-color transparent
            color #00a7a3
            border: 1px solid #00a7a3
            font-size .30rem
</style>
