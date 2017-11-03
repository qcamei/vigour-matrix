<template>
    <div style="height: 100%; padding-bottom: 1.2rem">
        <yd-cell-group style="margin-bottom: .2rem">
            <yd-cell-item arrow>
                <span slot="left">发票抬头</span>
                <span class="a123" slot="right" v-if="this.items && this.items.length" @click="flag = true">{{ selectValue }}</span>
                <span slot="right" v-if="!this.items">个人</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group v-show="!isPerson">
            <yd-cell-item style="position: relative;" v-for="(item, idx) in items" :key="idx" @click.native="changeChecked(item)">
                <span slot="icon" :class="['check-icon', item.isDefault ? 'checked' : '']"></span>
                <span slot="left">{{ item.enterpriseName }}</span>
                <span slot="right">
                    <img @click.stop="editInvoice(item.id)" class="edit-icon" src="../../../common/images/ic_edit@3x.png"/>
                </span>
            </yd-cell-item>
            <yd-cell-item @click.native="addInvoice">
                <img slot="icon" src="../../../common/images/ic_plus@3x.png"/>
                <span slot="left" style="margin-left: .1rem;">添加企业开票信息</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-actionsheet :items="computedList" v-model="flag"></yd-actionsheet>

        <div class="posts-btn-con">
            <yd-button @click.native="makeSure" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">确定
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { getInvoiceInfo, setDefaultInvoice } from '../../../api/shopApi'
    import { ActionSheet } from 'vue-ydui/dist/lib.rem/actionsheet'

    export default {
        created() {
            document.title = this.$route.meta.title
            getInvoiceInfo().then(response => {
                if (response.body.code == 200 && response.body.data.items.length) {
                    this.items = response.body.data.items
                }
            })
            if (this.$route.query.invoiceType === '个人') {
                this.isPerson = true
                this.selectValue = '个人'
            }
        },
        data() {
            return {
                items: null,
                chooseList: [{label: '企业', invoiceType: '企业'}, {label: '个人', invoiceType: '个人'}],
                flag: false,
                selectValue: '企业',
                isPerson: false
            }
        },
        computed: {
            computedList() {
                return this.chooseList.map(item => (
                        {
                            label: item.label,
                            method: select => {
                                this.selectValue = select.label
                                if (this.selectValue === '企业') {
                                    sessionStorage.setItem('invoiceType', '企业')
                                    this.isPerson = false
                                }
                                if (this.selectValue === '个人') {
                                    sessionStorage.setItem('invoiceType', '个人')
                                    this.isPerson = true
                                }
                            }
                        }
                    )
                )
            }
        },
        components: {
            [ActionSheet.name]: ActionSheet
        },
        methods: {
            makeSure() {
                var billItem = this.items.find(item => item.isDefault)
                if (!billItem || this.isPerson) {
                    sessionStorage.setItem('invoiceType', '个人')
                    return this.$router.go(-1)
                }

                sessionStorage.setItem('invoice_' + this.$route.params.id, billItem.id)
                this.$router.go(-1)
            },
            changeChecked(item) {
                this.items.forEach(item => item.isDefault = false)
                item.isDefault = true
                setDefaultInvoice(item.id)
            },
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
    .a123
        display inline-block
        height 1rem
        line-height 1rem
        width 30%
    span
        color #262626
        font-size .26rem
    .check-icon
        width .4rem
        height .4rem
        background-image url("../../../common/images/ic_radio@3x.png")
        background-size .4rem .4rem
        display inline-block
        &.checked
            background-image url("../../../common/images/ic_radio_clicked@3x.png") !important
    .edit-icon
        position absolute
        width .36rem
        height .36rem
        right .2rem
        top 50%
        transform translateY(-50%)

    .posts-btn-con
        position fixed
        bottom 0
        left 0
        right 0
        width 100%
        height 1.2rem
        padding .2rem
        background-color #f5f4f9
        .posts-btn
            height .8rem
            margin 0
            font-size .28rem
</style>
