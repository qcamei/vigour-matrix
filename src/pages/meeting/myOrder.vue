<template>
    <div id="my-order">
        <yd-infinitescroll :on-infinite="loadList" :distance="100" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/meeting/myorder/detail/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="title">{{item.resourceName}}</div>
                        <div class="info-con">
                            <div class="date-time">{{ moment(item.reserveDate).format('MM-DD') }} {{ item.startDateStr }}-{{ item.endDateStr }}</div>
                            <div class="status">
                                <span>预定状态：</span>
                                <span :style="{color: item.enableStatus != 'ENABLE' ? '#e65966' : void 0}"
                                      v-text="item.enableStatus == 'ENABLE' ? '已预订' : '已取消'"></span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">--------- 没有更多数据 ---------</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>

        <div v-show="historyFlag" class="no-history"><span>暂无历史纪录</span></div>

    </div>
</template>
<script>
    import moment from 'moment'
    import { orderHistoryList } from '../../api/api'

    export default {
        created() {
            document.title = '我的预定'
            this.loadList()
        },
        data() {
            return {
                page: 1,
                limit: 10,
                list: [],
                historyFlag: false
            }
        },
        components: {},
        methods: {
            loadList() {
                orderHistoryList({
                    page: this.page,
                    limit: this.limit
                })
                    .then(res => {
                        if (res.body.code == 200) {
                            const _list = res.body.data.items

                            this.list = [...this.list, ..._list]

                            if (this.list.length === 0) {
                                this.historyFlag = true
                                return
                            }

                            if (_list.length < this.limit) {
                                /* 所有数据加载完毕 */
                                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                                return;
                            }

                            /* 单次请求数据完毕 */
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')

                            this.page++
                        }
                        else {
                            this.$dialog.loading.close()
                            this.$dialog.toast({
                                mes: res.body.message,
                                timeout: 500
                            })
                        }
                    })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #my-order
        .no-history
            width 6rem
            height 4.4rem
            background-image url('../../common/images/ic_no history@3x.png')
            background-size 6rem 4.4rem
            background-repeat no-repeat
            position absolute
            left 50%
            top 45%
            margin-top -2.2rem
            margin-left -3rem
            span
                font-size .3rem
                color #333
                position absolute
                bottom -.6rem
                left 50%
                transform translateX(-50%)
        .history-con
            position relative
            display flex
            justify-content space-between
            align-items center
            width 100%
            height 1.52rem
            padding .3rem
            box-sizing border-box
            background-color #fff
            margin-bottom .2rem
            color #24242c
            .title
                font-size .3rem
            .info-con
                display flex
                flex-direction column
                justify-content space-between
                align-items flex-end
                font-size .26rem
                height 100%
</style>
