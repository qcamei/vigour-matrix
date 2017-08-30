<template>
    <div id="my-order">
        <yd-infinitescroll :on-infinite="loadList" :distance="100" ref="infinitescrollDemo">

            <yd-list slot="list">
                <router-link :to="`/meeting/myorder/detail/${item.id}`" v-for="(item, idx) in list" :key="idx">
                    <div class="history-con">
                        <div class="title">{{item.resourceName}}</div>
                        <div class="info-con">
                            <div class="date-time">{{ moment(item.reserveDate).format('MM-DD') }} {{ moment(item.startDate).format('HH:mm') }}-{{ moment(item.endDate).format('HH:mm') }}</div>
                            <div class="status">
                                <span>预定状态：</span>
                                <span :style="{color: item.status != 'NORMAL' ? '#e65966' : void 0}"
                                      v-text="item.status == 'NORMAL' ? '已预订' : '已取消'"></span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading7.svg"/>

        </yd-infinitescroll>
    </div>
</template>
<script>
    import moment from 'moment'
    import { orderHistoryList } from '../../api/api'

    export default {
        created() {
            this.loadList()
        },
        data() {
            return {
                page: 1,
                limit: 10,
                list: []
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
                        const _list = res.body.data.items

                        this.list = [...this.list, ..._list]

                        if (_list.length < this.limit) {
                            /* 所有数据加载完毕 */
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                            return;
                        }

                        /* 单次请求数据完毕 */
                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')

                        this.page++
                    })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    #my-order
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
