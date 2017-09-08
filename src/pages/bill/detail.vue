<template>
    <div style="padding-bottom: 1.4rem">
        <yd-cell-item style="margin-bottom: .2rem; background-color: #fff">
            <span slot="left">合同号</span>
            <input
                slot="right"
                v-model="info.billNo"
                style="color: #999; text-align: right"
                readonly />
        </yd-cell-item>

        <yd-cell-item style="margin-bottom: .2rem; background-color: #fff">
            <span slot="left">账单期间</span>
            <input
                slot="right"
                v-model="info.billMonth"
                style="color: #999; text-align: right"
                readonly />
        </yd-cell-item>

        <div class="cell-item mx-cell-item">
            <div style="display: flex">
                <div class="cell-left">
                    <span>费用明细</span>
                </div>
                <div class="cell-right"></div>
            </div>
            <div class="mx-cell-subcon">
                <div class="fee-detail">
                    <div class="title">费用明细</div>
                    <div class="fee-row" v-for="(item, idx) in info.bcds" :key="idx">
                        <div class="left">{{ item.proName }}</div>
                        <div class="center">{{ item.percentDec }}</div>
                        <div class="right">{{ item.totalMoney }}</div>
                    </div>
                </div>

                <div class="fee-detail">
                    <div class="fee-row">
                        <div class="left">合计</div>
                        <div class="right">{{ info.totalAmount }}</div>
                    </div>
                </div>

                <div class="fee-detail">
                    <div class="fee-row">
                        <div class="left">减免费用</div>
                        <div class="right">{{ info.reliefMoney ? info.reliefMoney : 0 }}</div>
                    </div>
                </div>

                <div class="fee-detail">
                    <div class="fee-row">
                        <div class="left">总计</div>
                        <div class="right">{{ info.totalCost }}</div>
                    </div>
                </div>
            </div>
        </div>

        <yd-cell-item style="margin-bottom: .2rem; background-color: #fff">
            <span slot="left">物业资源</span>
            <div slot="right" style="height: 1rem; line-height: 1rem">
                <ul class="device-list">
                    <li>商用出租</li>
                    <li>广告出租</li>
                </ul>
            </div>
        </yd-cell-item>

        <div class="posts-btn-con" v-show="info.confirmStatus === 'WAIT_CONFIRM'">
            <yd-button @click.native="commit" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">支付凭证上传
            </yd-button>
        </div>
    </div>
</template>
<script>
    import { getBillDetail } from '../../api/api'

    export default {
        created() {
            document.title = '账单详情'
            getBillDetail(this.$route.params.billId)
                .then(res => {
                    console.log(res.body)
                    if (res.body.code == 200) {
                        this.info = res.body.data
                    }
                })
        },
        data() {
            return {
                info: {}
            }
        },
        components: {},
        methods: {
            commit() {
                this.$router.push(`/bill/detail/${this.$route.params.billId}/confirm`)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .mx-cell-item
        margin-bottom .2rem
        background-color #fff
        flex-direction column
        .mx-cell-subcon
            padding .2rem .2rem .2rem 0
            .fee-detail
                width 100%
                height 100%
                margin-bottom .2rem
                padding .2rem
                background-color #f5f4f9
                &:last-child
                    margin-bottom 0
                .title
                    height .68rem
                    line-height .68rem
                    font-size .26rem
                    color #333
                .fee-row
                    height .72rem
                    display flex
                    justify-content space-between
                    align-items center
                    font-size .26rem
                    color #333
    .device-list
        overflow hidden
        li
            float left
            margin 0 .06rem
            color #999
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
