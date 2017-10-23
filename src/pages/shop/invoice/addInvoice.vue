<template>
    <div id="invoiceInfo">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">企业名称：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.enterpriseName"
                    placeholder="请输入企业名称"
                    ref="input0"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">税号：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.taxNo"
                    placeholder="请输入税号"
                    ref="input1"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">单位地址：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.address"
                    placeholder="请输入单位地址"
                    ref="input2"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">电话号码：</span>
                <yd-input
                    slot="right"
                    type="number"
                    required
                    v-model="info.tel"
                    placeholder="请输入电话号码"
                    ref="input3"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">开户银行：</span>
                <yd-input
                    slot="right"
                    required
                    v-model="info.bankName"
                    placeholder="请输入开户银行"
                    ref="input4"
                ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">银行账号：</span>
                <yd-input
                    slot="right"
                    type="number"
                    required
                    v-model="info.account"
                    placeholder="请输入银行账号"
                    ref="input5"
                ></yd-input>
            </yd-cell-item>
        </yd-cell-group>

        <!--保存-->
        <div class="posts-btn-con">
            <yd-button @click.native="saveInvoice" class="posts-btn" type="primary" bgcolor="#00A7A3" color="#fff" style="width: 100%">保存
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { addInvoiceInfo } from '../../../api/shopApi'

    export default {
        created() {
            document.title = this.$route.meta.title
        },
        data() {
            return {
                info: {
                    enterpriseName: '',
                    taxNo: '',
                    address: '',
                    tel: '',
                    bankName: '',
                    account: '',
                    isDefault: false
                }
            }
        },
        components: {},
        methods: {
            saveInvoice() {
                for (let i = 0; i < 6; i++) {
                    var validFlag = this.$refs['input' + i].valid
                    if (!validFlag) {
                        this.$dialog.toast({
                            mes: this.$refs['input' + i].errorMsg,
                            timeout: 500
                        });
                        return;
                    }
                }

                addInvoiceInfo(this.info).then(response => {
                    if (response.body.code == 200) {
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    span
        font-size .26rem
    .posts-btn-con
        display flex
        justify-content space-around
        align-items center
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
            width 3.45rem
            height .8rem
            margin 0
            font-size .28rem
            padding 0
            box-sizing border-box
</style>
