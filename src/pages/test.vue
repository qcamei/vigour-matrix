<template>
    <div style="height: calc(100% - .9rem)">
        <yd-navbar
            :title="this.$route.meta.title"
            color="#fff"
            bgcolor="#24242c"
            fontsize=".36rem">
        </yd-navbar>

        <div class="con">
            <router-link to="/report/history">维修申报</router-link>
            <br>
            <router-link to="/community/list">社群活动</router-link>
            <br>
            <router-link to="/meeting/list">会议室预定</router-link>
            <br>
            <router-link to="/bill/list">企业账单</router-link>
            <br>
            <router-link to="/shop/home">服务商城</router-link>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {}
        },
        components: {
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .con
        display flex
        flex-direction column
        justify-content center
        align-items center
        height 100%
        font-size .6rem
</style>
