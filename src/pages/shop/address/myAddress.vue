<template>
    <div>
        <mx-slide-delete
            :itemId="item.id"
            @deleteItem="deleteItem(item.id)"
            ref="deleteCon"
            v-for="(item, idx) in infos"
            :key="idx"
            deleteStyles="z-index: -1; height: 100%"
        >
            <div class="address-item" @click="changeAddress(item)">
                <div class="icon-con">
                    <div :class="['check-icon', item.isDefault ? 'checked' : '']"></div>
                </div>
                <div class="info-con">
                <span class="top">
                    <span class="name">{{ item.contacts }}</span>
                    <span v-if="false" class="phone">{{ item.phone }}</span>
                </span>
                    <span class="address">{{ item.proviceName }}{{ item.cityName }}{{ item.countyName }}{{ item.addr }}</span>
                </div>
                <div class="edit-arrow" @click.stop="$router.push(`/shop/editAddress/${item.id}`)"></div>
            </div>
        </mx-slide-delete>

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
    import { getMyAddress, setDefaultAddress, removeAddress } from '../../../api/shopApi'
    import MxSlideDelete from '../../../components/slideDelete/MxSlideDelete.vue'

    export default {
        created() {
            document.title = this.$route.meta.title
            getMyAddress().then(response => {
                if (response.body.code == 200) {
                    this.infos = response.body.data.items
                }
            })
        },
        data() {
            return {
                infos: null
            }
        },
        components: {
            MxSlideDelete
        },
        methods: {
            changeAddress(item) {
                this.infos.forEach(item => item.isDefault = false)
                item.isDefault = true
                setDefaultAddress(item.id).then(response => {
                    if (response.body.code == 200) {
                        this.$router.go(-1)
                    }
                })
            },
            addAddress() {
                this.$router.push('/shop/addAddress')
            },
            deleteItem(id) {
                removeAddress(id).then(response => {
                    if (response.body.code == 200) {
                        this.infos = this.infos.filter(item => item.id != id)
                        this.$refs.deleteCon.forEach(item => item.txtStyle = '')
                    }
                })
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
        padding .3rem .8rem .3rem 0
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
            width 100%
            .top
                display flex
                justify-content space-between
                .name
                    font-size .26rem
                .phone
                    font-size .26rem
            .address
                font-size .24rem
                margin-top .14rem
                line-height 1.2
            .name
                font-size .26rem
        .edit-arrow
            width .8rem
            height 100%
            position absolute
            right 0
            top 0
            z-index 10
</style>
