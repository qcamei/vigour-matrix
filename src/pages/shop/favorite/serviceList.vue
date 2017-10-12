<template>
    <div style="font-size: 0">
        <router-link class="order-item" to="/shop/serviceDetail">
            <div class="sub-con">
                <div class="thumb">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                </div>
                <div class="content">
                    <span class="title">华谊星程大厦注册公司</span>
                    <span class="price">￥ 12000.00</span>
                    <span class="desc">上海实业大厦位于上海市黄金地段徐家汇上海实业大厦位于上海市黄金地段徐家汇上实业</span>
                </div>
            </div>
        </router-link>

        <router-link class="order-item" to="/shop/serviceDetail">
            <div class="sub-con">
                <div class="thumb">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                </div>
                <div class="content">
                    <span class="title">华谊星程大厦注册公司</span>
                    <span class="price">￥ 12000.00</span>
                    <span class="desc">上海实业大厦位于上海市黄金地段徐家汇上海实业大厦位于上海市黄金地段徐家汇上实业</span>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {}
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .order-item
        background-color #fff
        margin-bottom .2rem
        display inline-block
        .sub-con
            border-top 1px solid #f3f4f5
            padding .2rem .4rem
            overflow hidden
            .thumb
                width 1.6rem
                height 1.6rem
                float left
                img
                    width 100%
                    height 100%
                    object-fit cover
                    background-color #cccccc
            .content
                float left
                display flex
                flex-direction column
                justify-content space-between
                width 4.9rem
                height 1.6rem
                margin-left .2rem
                .title
                    font-size .3rem
                    color #333
                .price
                    font-size .26rem
                    color #e96a76
                .desc
                    font-size .24rem
                    color #999
                    line-height 1.2
                    display -webkit-box
                    -webkit-line-clamp 3
                    -webkit-box-orient vertical
                    overflow hidden
</style>
