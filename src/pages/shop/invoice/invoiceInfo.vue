<template>
    <div id="invoiceInfo">
        <yd-cell-group>
            <yd-cell-item style="position: relative;" v-if="info.length" v-for="(item, idx) in info" :key="idx">
                <span slot="left">{{ item.enterpriseName }}</span>
                <span slot="right">
                    <img @click="editInvoice(item.id)" class="edit-icon" src="../../../common/images/ic_edit@3x.png" />
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
    import { getInvoiceInfo } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
            getInvoiceInfo().then(response => {
                if (response.body.code == 200) {
                    this.info = response.body.data.items
                }
            })
        },
        data() {
            return {
                info: []
            }
        },
        components: {},
        methods: {
            editInvoice(id) {
                this.$router.push('/shop/editInvoice/' + id)
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
