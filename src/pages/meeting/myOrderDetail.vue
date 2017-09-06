<template>
    <div id="post-con">
        <yd-cell-group id="input-group" style="margin-bottom: .24rem">
            <yd-cell-item>
                <span slot="left">预定人姓名</span>
                <span slot="right" style="color: #24242c">{{info.name}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">预定人手机</span>
                <span slot="right" style="color: #24242c">{{info.phone}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">选择会议室</span>
                <span class="a123" slot="right" style="color: #24242c">{{info.resourceName}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">开始时间</span>
                <span slot="right" style="color: #24242c">{{moment(info.reserveDate).format('YYYY-MM-DD')}} {{moment(info.startDate).format('HH:mm')}}</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">结束时间</span>
                <span slot="right" style="color: #24242c">{{moment(info.reserveDate).format('YYYY-MM-DD')}} {{moment(info.endDate).format('HH:mm')}}</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="详细描述">
            <yd-cell-item>
                <yd-textarea slot="right" :readonly="true" maxlength="140" ref="textarea" v-html="info.memo"
                             style="text-align: left"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

        <div class="posts-btn-con">
            <yd-button @click.native="cancel" class="posts-btn" size="large" type="primary" bgcolor="#00A7A3"
                       color="#fff">取消预定
            </yd-button>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import { orderHistoryList, cancelMeetingOrder } from '../../api/api'

    export default {
        created() {
            orderHistoryList({
                limit: 500
            })
                .then(res => res.body.data.items.find(item => item.id == this.$route.params.orderId))
                .then(data => this.info = data)
        },
        data() {
            return {
                info: {},
            }
        },
        components: {},
        methods: {
            cancel() {
                this.$dialog.loading.open('取消中')

                cancelMeetingOrder(this.$route.params.orderId)
                    .then(res => {
                        if (res.body.code == 200) {
                            this.$dialog.loading.close()
                            this.$dialog.toast({
                                mes: '取消成功',
                                timeout: 800,
                                callback: () => {
                                    this.$router.replace('/meeting/list')
                                }
                            })
                        } else {
                            this.$dialog.loading.close()
                            this.$dialog.toast({
                                mes: res.body.message,
                                timeout: 800
                            })
                        }
                    })
                    .catch(e => console.log(e))
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #post-con
        padding-bottom 1.4rem
        #input-group
            input
                text-align right
                font-size .26rem
                color #24242c
                width 5.2rem
            span
                font-size .26rem
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
