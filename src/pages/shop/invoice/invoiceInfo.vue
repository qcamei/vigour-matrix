<template>
    <div id="invoiceInfo">
        <yd-cell-group>
            <yd-cell-item style="position: relative;">
                <span slot="left">上海速道科技有限公司</span>
                <span slot="right">
                    <img @click="editInvoice" class="edit-icon" src="../../../common/images/ic_edit@3x.png" />
                </span>
            </yd-cell-item>
            <yd-cell-item @click.native="addInvoice">
                <img slot="icon" src="../../../common/images/ic_plus@3x.png" />
                <span slot="left" style="margin-left: .1rem;">添加企业开票信息</span>
            </yd-cell-item>
        </yd-cell-group>
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
        methods: {
            editInvoice() {
                this.$router.push('/shop/editInvoice')
            },
            addInvoice() {
                this.$router.push('/shop/addInvoice')
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .edit-icon
        position absolute
        width .36rem
        height .36rem
        right .2rem
        top 50%
        transform translateY(-50%)
    #invoiceInfo
        span
            font-size .26rem
</style>
