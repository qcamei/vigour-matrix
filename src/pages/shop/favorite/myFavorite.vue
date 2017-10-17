<template>
    <div>
        <router-link to="/shop/serviceDetail/1/imageText">
            <div class="favorite-item">
                <div class="img-con">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                </div>
                <div class="disc-con">
                    <div class="top">
                        <div class="title">华谊星程大厦公司注册</div>
                        <div class="status"></div>
                    </div>
                    <div class="bottom">
                        <div class="price">¥ 12000.00</div>
                        <div class="datetime">2016-09-20 10:00</div>
                    </div>
                </div>
            </div>
        </router-link>

        <router-link to="/shop/serviceDetail/2/imageText">
            <div class="favorite-item">
                <div class="img-con">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
                </div>
                <div class="disc-con">
                    <div class="top">
                        <div class="title">华谊星程大厦公司注册</div>
                        <div class="status">已下架</div>
                    </div>
                    <div class="mid">删除</div>
                    <div class="bottom">
                        <div class="price">¥ 12000.00</div>
                        <div class="datetime">2016-09-20 10:00</div>
                    </div>
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
    .favorite-item
        position relative
        display flex
        width 100%
        height 1.6rem
        padding .2rem
        background-color #fff
        margin-bottom .2rem
        .img-con
            width 1.2rem
            height 1.2rem
            img
                width 100%
                height 100%
                border none
                object-fit cover
        .disc-con
            display flex
            flex-direction column
            justify-content space-between
            width calc(100% - 1.2rem)
            margin-left .2rem
            .top
                display flex
                align-items center
                justify-content space-between
                .title
                    text-align left
                    font-size .26rem
                    color #333
                    line-height .42rem
                    width 3.7rem
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
                .status
                    position absolute
                    right .2rem
                    top .2rem
                    font-size .26rem
                    color #ff3f56
            .mid
                text-align right
                font-size .26rem
                color red
            .bottom
                display flex
                justify-content space-between
                .price
                    font-size .26rem
                    color #e65966
                .datetime
                    font-size .26rem
                    color #999
</style>
