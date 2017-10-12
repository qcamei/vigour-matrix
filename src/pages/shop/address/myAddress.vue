<template>
    <div>
        <div class="address-item" v-for="item in infos" @click="changeAddress(item)">
            <div class="icon-con">
                <div :class="['check-icon', item.checked ? 'checked' : '']"></div>
            </div>
            <div class="info-con">
                <span class="name">萨瓦迪卡</span>
                <span class="address">上海市浦东新区西藏南路387号</span>
            </div>
        </div>

        <div class="address-item" style="height: 1.3rem" @click="addAddress">
            <div class="icon-con">
                <div class="add-icon"></div>
            </div>
            <div class="info-con">
                <span class="name">新增地址</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                infos: [
                    {
                        name: '萨瓦迪卡',
                        address: '上海市浦东新区西藏南路387号',
                        checked: true
                    },
                    {
                        name: '萨瓦迪卡',
                        address: '上海市浦东新区西藏南路387号',
                        checked: false
                    },
                    {
                        name: '萨瓦迪卡',
                        address: '上海市浦东新区西藏南路387号',
                        checked: false
                    }
                ]
            }
        },
        components: {
        },
        methods: {
            changeAddress(item) {
                this.infos.forEach(item => item.checked = false)
                item.checked = true
            },
            addAddress() {
                this.$router.push('/shop/addAddress')
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    span
        color #262626
    .address-item
        position relative
        display flex
        border-bottom 1px solid #e7e7e7
        background-color #fff
        padding .3rem .6rem .3rem 0
        &:after
            position absolute
            right .2rem
            top 50%
            transform translateY(-50%)
            display block
            font-family YDUI-INLAY
            font-size .34rem
            color #c9c9c9
            content "\E608"
        .icon-con
            position absolute
            width .8rem
            height 100%
            display flex
            align-items center
            justify-content center
            left 0
            top 50%
            transform translateY(-50%)
            .check-icon
                width .4rem
                height .4rem
                background-image url("../../../common/images/ic_radio@3x.png")
                background-size .4rem .4rem
                &.checked
                    background-image url("../../../common/images/ic_radio_clicked@3x.png") !important
            .add-icon
                width .4rem
                height .4rem
                background-image url("../../../common/images/ic_plus@3x.png")
                background-size .4rem .4rem
        .info-con
            display flex
            flex-direction column
            justify-content center
            padding-left .8rem
            .name
                font-size .26rem
            .address
                font-size .24rem
                margin-top .14rem
                line-height 1.2
</style>
