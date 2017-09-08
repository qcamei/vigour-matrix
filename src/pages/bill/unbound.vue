<template>
    <div>
        <div v-show="historyFlag" class="no-history"><span>暂未绑定企业</span></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                historyFlag: true
            }
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .no-history
        width 6rem
        height 4.4rem
        background-image url('../../common/images/ic_no history@3x.png')
        background-size 6rem 4.4rem
        background-repeat no-repeat
        position absolute
        left 50%
        top 45%
        margin-top -2.2rem
        margin-left -3rem
        span
            font-size .3rem
            color #333
            position absolute
            bottom -.6rem
            left 50%
            transform translateX(-50%)
</style>
