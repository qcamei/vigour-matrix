<template>
    <div id="mine">
        <div class="profile-con">
            <div class="avatar">
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3601388998,136244981&fm=27&gp=0.jpg" />
            </div>
            <span class="username">萨瓦迪卡</span>
            <span class="parkname">张江高科技园区</span>
        </div>

        <yd-cell-group style="margin-top: .2rem">
            <yd-cell-item arrow type="link" href="/shop/order/myorder">
                <img slot="icon" src="../../common/images/ic_order@3x.png">
                <span slot="left">我的订单</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/shop/myFavorite">
                <img slot="icon" src="../../common/images/ic_collection@3x.png">
                <span slot="left">我的收藏</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/shop/invoice">
                <img slot="icon" src="../../common/images/ic_invoice@3x.png">
                <span slot="left">开票信息</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/shop/myAddress">
                <img slot="icon" src="../../common/images/ic_location@3x.png">
                <span slot="left">收货地址</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="#">
                <img slot="icon" src="../../common/images/ic_customer_service@3x.png">
                <span slot="left">联系客服</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-tabbar
            :fixed="true"
            color="#a7a7a7"
            activeColor="#5abbc7"
            fontsize="0.22rem"
        >
            <yd-tabbar-item title="企业服务" link="/shop/home">
                <img slot="icon" src="../../common/images/ic_home@3x.png" />
            </yd-tabbar-item>
            <yd-tabbar-item title="分类" link="/shop/type">
                <img slot="icon" src="../../common/images/ic_classification@3x.png" />
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/shop/mine" active>
                <img slot="icon" src="../../common/images/ic_mine_clicked@3x.png" />
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
            return {}
        },
        components: {
            [TabBar.name]: TabBar,
            [TabBarItem.name]: TabBarItem
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .profile-con
        height 1.6rem
        background-color #fff
        padding .2rem .4rem
        display flex
        align-items center
        justify-content flex-start
        .avatar
            width 1.2rem
            height 1.2rem
            border-radius 2px
            overflow hidden
            img
                width 100%
                height 100%
                object-fit cover
        .username
            font-size .32rem
            color #333
            margin-left .24rem
        .parkname
            font-size .26rem
            color #00a7a3
            margin-left .2rem
</style>
