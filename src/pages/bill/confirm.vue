<template>
    <div style="padding-bottom: 1.4rem">
        <div class="posts-btn-con">
            <yd-button @click.native="commit" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">确认
            </yd-button>
        </div>
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
    .posts-btn-con
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        z-index 10
        .posts-btn
            height .8rem
            margin 0
            font-size .28rem
</style>
